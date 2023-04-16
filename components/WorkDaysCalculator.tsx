"use client";

import { useMachine } from "@xstate/react";
import Fieldset from "./Fieldset";
import Input from "./Input";
import { workDaysMachine } from "../src/workDaysMachine";

const WorkDaysCalculator = () => {
  const [current, send] = useMachine(workDaysMachine);

  const { dateStart, dateEnd, workDays } = current.context;

  return (
    <form className="space-y-4">
      <Fieldset>
        <label htmlFor="date-start">Data początkowa</label>
        <Input
          id="date-start"
          name="date-start"
          type="date"
          placeholder="Data początkowa"
          value={dateStart}
          onChange={(e) => send("DATE_START", { value: e.target.value })}
        />
      </Fieldset>
      <Fieldset>
        <label htmlFor="work-days" className="w-full">
          Dni robocze{" "}
          <span className="ml-4 text-sm text-gray-500">
            dni tygodnia bez sobót, niedziel i świąt państwowych
          </span>
        </label>
        <Input
          inputMode="decimal"
          id="work-days"
          name="work-days"
          placeholder="Dni robocze"
          value={workDays}
          onChange={(e) =>
            send("WORK_DAYS", {
              value: isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value),
            })
          }
        />
      </Fieldset>
      <Fieldset>
        <label htmlFor="date-end">Data końcowa</label>
        <Input
          id="date-end"
          name="date-end"
          type="date"
          placeholder="Data końcowa"
          value={dateEnd}
          onChange={(e) => send("DATE_END", { value: e.target.value })}
        />
      </Fieldset>
    </form>
  );
};

export default WorkDaysCalculator;
