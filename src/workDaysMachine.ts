import { addBusinessDays as abd, format } from "date-fns";
import { assign, createMachine } from "xstate";
import { getWorkDays } from "./workDaysUtils";

const initialState = {
  workDays: 0,
  dateStart: format(new Date(), "yyyy-MM-dd"),
  dateEnd: "",
};

export const workDaysMachine = createMachine({
  schema: {
    context: {} as {
      workDays: number;
      dateStart: string;
      dateEnd: string;
    },
    events: {} as
      | { type: "DATE_START"; value: string }
      | { type: "DATE_END"; value: string }
      | { type: "WORK_DAYS"; value: number }
      | { type: "CLEAR" },
  },
  id: "workDaysMachine",
  predictableActionArguments: true,
  initial: "active",
  context: {
    ...initialState,
  },
  states: {
    active: {
      on: {
        DATE_START: {
          actions: assign((context, event) => ({
            ...context,
            dateStart: event.value,
            workDays: context.dateEnd
              ? getWorkDays(new Date(context.dateEnd), new Date(event.value))
              : context.workDays,
            dateEnd: context.workDays
              ? format(
                  abd(new Date(event.value), context.workDays),
                  "yyyy-MM-dd"
                )
              : context.dateEnd,
          })),
        },
        DATE_END: {
          actions: assign((context, event) => ({
            ...context,
            dateEnd: event.value,
            workDays: context.dateStart
              ? getWorkDays(new Date(event.value), new Date(context.dateStart))
              : context.workDays,
          })),
        },
        WORK_DAYS: {
          actions: assign((context, event) => ({
            ...context,
            workDays: event.value,
            dateEnd: context.dateStart
              ? format(
                  abd(new Date(context.dateStart), event.value),
                  "yyyy-MM-dd"
                )
              : context.dateEnd,
          })),
        },
        CLEAR: {
          actions: assign({ ...initialState }),
        },
      },
    },
  },
});
