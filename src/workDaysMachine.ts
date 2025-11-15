import { assign, createMachine, fromPromise } from "xstate";

interface InitialState {
  workDays: number | undefined;
  dateStart: Date | undefined;
  dateEnd: Date | undefined;
  isLoading: boolean;
  error: string | undefined;
  calculationPayload: CalculationPayload | undefined;
  lastCalculatedPayload: CalculationPayload | undefined;
}

interface CalculationPayload {
  dateStart?: string;
  dateEnd?: string;
  workDays?: number;
}

const initialState: InitialState = {
  workDays: undefined,
  dateStart: new Date(),
  dateEnd: undefined,
  isLoading: false,
  error: undefined,
  calculationPayload: undefined,
  lastCalculatedPayload: undefined,
};

const payloadsAreEqual = (
  payload1: CalculationPayload | undefined,
  payload2: CalculationPayload | undefined,
): boolean => {
  if (!payload1 && !payload2) return true;
  if (!payload1 || !payload2) return false;
  return (
    payload1.dateStart === payload2.dateStart &&
    payload1.dateEnd === payload2.dateEnd &&
    payload1.workDays === payload2.workDays
  );
};

const calculateWorkDays = fromPromise<
  { dateStart?: Date; dateEnd?: Date; workDays?: number },
  { payload: CalculationPayload }
>(async ({ input }) => {
  const response = await fetch("/api/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input.payload),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { error?: string };
    throw new Error(errorData.error || "Błąd podczas obliczania");
  }

  const result = (await response.json()) as {
    dateStart?: string;
    dateEnd?: string;
    workDays?: number;
  };

  return {
    dateStart: result.dateStart ? new Date(result.dateStart) : undefined,
    dateEnd: result.dateEnd ? new Date(result.dateEnd) : undefined,
    workDays: result.workDays,
  };
});

export const workDaysMachine = createMachine({
  types: {
    context: {} as InitialState,
    events: {} as
      | { type: "DATE_START"; value: Date | undefined }
      | { type: "DATE_END"; value: Date | undefined }
      | { type: "WORK_DAYS"; value: number | undefined }
      | { type: "CLEAR" }
      | { type: "CALCULATE"; payload: CalculationPayload }
      | {
        type: "CALCULATE_SUCCESS";
        value: { dateStart?: Date; dateEnd?: Date; workDays?: number };
      }
      | { type: "CALCULATE_ERROR"; value: string },
  },
  id: "workDaysMachine",
  initial: "active",
  context: {
    ...initialState,
  },
  states: {
    active: {
      on: {
        DATE_START: {
          actions: assign(({ context, event }) => ({
            ...context,
            dateStart: event.value,
            error: undefined,
          })),
        },
        DATE_END: {
          actions: assign(({ context, event }) => {
            // If all 3 fields are filled and user changes end date, clear workDays
            const allFieldsFilled = context.dateStart &&
              context.dateEnd &&
              context.workDays !== undefined;
            const dateChanged = event.value &&
              context.dateEnd &&
              event.value.getTime() !== context.dateEnd.getTime();

            return {
              ...context,
              dateEnd: event.value,
              workDays: allFieldsFilled && dateChanged
                ? undefined
                : context.workDays,
              error: undefined,
            };
          }),
        },
        WORK_DAYS: {
          actions: assign(({ context, event }) => ({
            ...context,
            workDays: event.value,
            error: undefined,
          })),
        },
        CLEAR: {
          actions: assign(() => ({
            ...initialState,
            dateStart: new Date(),
            calculationPayload: undefined,
            lastCalculatedPayload: undefined,
          })),
        },
        CALCULATE: {
          target: "calculating",
          guard: ({ context, event }) => {
            // Only proceed if the payload is different from the last calculated one
            return !payloadsAreEqual(
              event.payload,
              context.lastCalculatedPayload,
            );
          },
          actions: assign(({ context, event }) => ({
            ...context,
            calculationPayload: event.payload,
          })),
        },
        CALCULATE_ERROR: {
          actions: assign(({ context, event }) => ({
            ...context,
            error: event.value,
          })),
        },
      },
    },
    calculating: {
      entry: assign(({ context }) => ({
        ...context,
        isLoading: true,
        error: undefined,
      })),
      invoke: {
        src: calculateWorkDays,
        input: ({ context }) => ({
          payload: context.calculationPayload!,
        }),
        onDone: {
          target: "active",
          actions: assign(({ context, event }) => ({
            ...context,
            dateStart: event.output.dateStart ?? context.dateStart,
            dateEnd: event.output.dateEnd ?? context.dateEnd,
            workDays: event.output.workDays ?? context.workDays,
            isLoading: false,
            error: undefined,
            calculationPayload: undefined,
            lastCalculatedPayload: context.calculationPayload,
          })),
        },
        onError: {
          target: "active",
          actions: assign(({ context, event }) => ({
            ...context,
            isLoading: false,
            error: event.error instanceof Error
              ? event.error.message
              : "Wystąpił błąd",
            calculationPayload: undefined,
          })),
        },
      },
    },
  },
});
