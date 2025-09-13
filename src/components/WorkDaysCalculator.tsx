"use client";

import { useMachine } from "@xstate/react";
import { workDaysMachine } from "../workDaysMachine";
import { Button } from "./Button";
import { DatePicker } from "./DatePicker";
import { Label } from "./Label";
import { Input } from "./Input";

const WorkDaysCalculator = () => {
  const [current, send] = useMachine(workDaysMachine);

  const { dateStart, dateEnd, workDays } = current.context;
  return (
    <div className="calculator flex flex-col space-y-4 rounded-2xl bg-white p-4 shadow-[20px_19px_50px_0px_#0057BC26] md:flex-row md:space-y-0">
      <div className="grid w-full flex-1 items-center gap-2">
        <Label htmlFor="date-from">Od kiedy</Label>
        <DatePicker
          id="date-from"
          placeholder="Data początkowa"
          className="md:rounded-r-none"
          value={dateStart}
          onChange={(newDate) => send({ type: "DATE_START", value: newDate })}
        />
      </div>
      <div className="grid w-full flex-1 items-center gap-2">
        <Label htmlFor="work-days">Dni robocze</Label>
        <Input
          className="h-[50px] border-[#D1D5DB] focus:border-2 focus:border-[#0F365C] focus-visible:ring-0 md:rounded-l-none md:rounded-r-none md:border-l-0"
          type="work-days"
          id="work-days"
          placeholder="Wybierz ilość"
          value={workDays}
          onChange={(e) =>
            send({
              type: "WORK_DAYS",
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
          className="md:rounded-l-none md:border-l-0"
          value={dateEnd}
          onChange={(newDate) => send({ type: "DATE_END", value: newDate })}
        />
      </div>
      <Button
        onClick={() => send({ type: "CLEAR" })}
        className="ml-2 w-full self-end bg-[linear-gradient(323.48deg,#0F365C_23.99%,#5989B7_111.59%)] p-4 text-sm leading-[21px] font-bold md:w-[93px]"
      >
        Wyczyść
      </Button>
    </div>
  );
};

export default WorkDaysCalculator;
