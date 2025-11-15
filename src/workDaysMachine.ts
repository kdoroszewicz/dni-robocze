import { assign, createMachine } from "xstate";

interface InitialState {
  workDays: number | undefined;
  dateStart: Date | undefined;
  dateEnd: Date | undefined;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: InitialState = {
  workDays: undefined,
  dateStart: new Date(),
  dateEnd: undefined,
  isLoading: false,
  error: undefined,
};

export const workDaysMachine = createMachine({
  types: {
    context: {} as InitialState,
    events: {} as
      | { type: "DATE_START"; value: Date | undefined }
      | { type: "DATE_END"; value: Date | undefined }
      | { type: "WORK_DAYS"; value: number | undefined }
      | { type: "CLEAR" }
      | { type: "CALCULATE" }
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
          })),
        },
        CALCULATE: {
          target: "calculating",
        },
      },
    },
    calculating: {
      entry: assign(({ context }) => ({
        ...context,
        isLoading: true,
        error: undefined,
      })),
      on: {
        CALCULATE_SUCCESS: {
          target: "active",
          actions: assign(({ context, event }) => ({
            ...context,
            dateStart: event.value.dateStart ?? context.dateStart,
            dateEnd: event.value.dateEnd ?? context.dateEnd,
            workDays: event.value.workDays ?? context.workDays,
            isLoading: false,
            error: undefined,
          })),
        },
        CALCULATE_ERROR: {
          target: "active",
          actions: assign(({ context, event }) => ({
            ...context,
            isLoading: false,
            error: event.value,
          })),
        },
      },
    },
  },
});
