"use client";

import { useMachine } from "@xstate/react";
import { workDaysMachine } from "../workDaysMachine";
import { Button } from "./Button";
import { DatePicker } from "./DatePicker";
import { Input } from "./Input";
import { Label } from "./Label";

const WorkDaysCalculator = () => {
  const [current, send] = useMachine(workDaysMachine);

  const { dateStart, dateEnd, workDays } = current.context;
  return (
    <div
      className="calculator flex flex-row rounded-2xl bg-white p-4
shadow-[20px_19px_50px_0px_#0057BC26]"
    >
      <div className="grid w-full flex-1 items-center gap-2">
        <Label htmlFor="date-from">Od kiedy</Label>
        <DatePicker
          id="date-from"
          placeholder="Data początkowa"
          className="rounded-r-none"
          value={dateStart}
          onChange={(newDate) => send("DATE_START", { value: newDate })}
        />
      </div>
      <div className="grid w-full flex-1 items-center gap-2">
        <Label htmlFor="work-days">Dni robocze</Label>
        <Input
          className="rounded-l-none rounded-r-none border-l-0"
          type="work-days"
          id="work-days"
          placeholder="Wybierz ilość"
          value={workDays}
          onChange={(e) =>
            send("WORK_DAYS", {
              value: isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value),
            })
          }
        />
      </div>
      <div className="grid w-full flex-1 items-center gap-2">
        <Label htmlFor="date-to">Do kiedy</Label>
        <DatePicker
          id="date-to"
          placeholder="Data końcowa"
          className="rounded-l-none border-l-0"
          value={dateEnd}
          onChange={(newDate) => send("DATE_END", { value: newDate })}
        />
      </div>
      <Button
        onClick={() => send("CLEAR")}
        className="ml-2 self-end bg-[linear-gradient(323.48deg,_#0F365C_23.99%,_#5989B7_111.59%)] p-4 text-sm font-bold leading-[21px]"
      >
        Wyczyść
      </Button>
    </div>
  );
};

export default WorkDaysCalculator;
