import { addBusinessDays as abd } from "date-fns";
import { assign, createMachine } from "xstate";
import { getWorkDays } from "./workDaysUtils";

interface InitialState {
  workDays: number;
  dateStart: Date | undefined;
  dateEnd: Date | undefined;
}

const initialState: InitialState = {
  workDays: 0,
  dateStart: new Date(),
  dateEnd: undefined,
};

export const workDaysMachine = createMachine({
  types: {
    context: {} as InitialState,
    events: {} as
      | { type: "DATE_START"; value: string }
      | { type: "DATE_END"; value: string }
      | { type: "WORK_DAYS"; value: number }
      | { type: "CLEAR" },
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
            dateStart: new Date(event.value),
            workDays: context.dateEnd
              ? getWorkDays(context.dateEnd, new Date(event.value))
              : context.workDays,
            dateEnd: context.workDays
              ? abd(new Date(event.value), context.workDays)
              : context.dateEnd,
          })),
        },
        DATE_END: {
          actions: assign(({ context, event }) => ({
            ...context,
            dateEnd: new Date(event.value),
            workDays: context.dateStart
              ? getWorkDays(new Date(event.value), context.dateStart)
              : context.workDays,
          })),
        },
        WORK_DAYS: {
          actions: assign(({ context, event }) => ({
            ...context,
            workDays: event.value,
            dateEnd: context.dateStart
              ? abd(context.dateStart, event.value)
              : context.dateEnd,
          })),
        },
        CLEAR: {
          actions: assign(() => ({ ...initialState })),
        },
      },
    },
  },
});
