"use client";

import { useMachine } from "@xstate/react";
import { Eraser } from "lucide-react";
import { workDaysMachine } from "../workDaysMachine";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./DatePicker";
import { Label } from "./Label";
import { Input } from "./Input";

const WorkDaysCalculator = () => {
  const [current, send] = useMachine(workDaysMachine);

  const { dateStart, dateEnd, workDays, isLoading, error } = current.context;

  const handleCalculate = async () => {
    // Validate that at least 2 fields are provided
    const providedFields = [
      dateStart !== undefined,
      dateEnd !== undefined,
      workDays !== undefined,
    ].filter(Boolean).length;

    if (providedFields < 2) {
      send({
        type: "CALCULATE_ERROR",
        value: "Wypełnij co najmniej dwa pola",
      });
      return;
    }

    // If all 3 fields are provided, prioritize dateStart + workDays to calculate dateEnd
    // This allows recalculation when user changes workDays after a previous calculation
    let calculationPayload: {
      dateStart?: string;
      dateEnd?: string;
      workDays?: number;
    } = {};

    if (dateStart && workDays !== undefined) {
      // Prioritize: calculate dateEnd from dateStart + workDays
      calculationPayload = {
        dateStart: dateStart.toISOString(),
        workDays: workDays,
      };
    } else if (dateEnd && workDays !== undefined) {
      // Calculate dateStart from dateEnd + workDays
      calculationPayload = {
        dateEnd: dateEnd.toISOString(),
        workDays: workDays,
      };
    } else if (dateStart && dateEnd) {
      // Calculate workDays from dateStart + dateEnd
      calculationPayload = {
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
      };
    }

    send({ type: "CALCULATE" });

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calculationPayload),
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

      send({
        type: "CALCULATE_SUCCESS",
        value: {
          dateStart: result.dateStart ? new Date(result.dateStart) : undefined,
          dateEnd: result.dateEnd ? new Date(result.dateEnd) : undefined,
          workDays: result.workDays,
        },
      });
    } catch (err) {
      send({
        type: "CALCULATE_ERROR",
        value: err instanceof Error ? err.message : "Wystąpił błąd",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCalculate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="calculator flex flex-col space-y-4 rounded-2xl bg-white p-4 shadow-[20px_19px_50px_0px_#0057BC26] md:flex-row md:space-y-0">
        <div className="grid w-full flex-1 items-center gap-2">
          <Label htmlFor="date-from">Od kiedy</Label>
          <DatePicker
            id="date-from"
            placeholder="Data początkowa"
            className="md:rounded-r-none"
            value={dateStart}
            max={dateEnd}
            onChange={(newDate) => send({ type: "DATE_START", value: newDate })}
          />
        </div>
        <div className="grid w-full flex-1 items-center gap-2">
          <Label htmlFor="work-days">Dni robocze</Label>
          <Input
            className="h-[50px] border-[#D1D5DB] focus:border-2 focus:border-[#0F365C] focus-visible:ring-0 md:rounded-l-none md:rounded-r-none md:border-l-0"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            id="work-days"
            placeholder="Wybierz ilość"
            value={workDays ?? ""}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              const rawValue = e.target.value;
              const parsedValue =
                rawValue === "" ? undefined : Number.parseInt(rawValue, 10);

              send({
                type: "WORK_DAYS",
                value: Number.isNaN(parsedValue) ? undefined : parsedValue,
              });
            }}
          />
        </div>
        <div className="grid w-full flex-1 items-center gap-2">
          <Label htmlFor="date-to">Do kiedy</Label>
          <DatePicker
            id="date-to"
            placeholder="Data końcowa"
            className="md:rounded-l-none md:border-l-0"
            value={dateEnd}
            min={dateStart}
            onChange={(newDate) => send({ type: "DATE_END", value: newDate })}
          />
        </div>
        <div className="grid w-full flex-1 items-center gap-2 md:ml-2 md:w-auto md:flex-1">
          <Label className="invisible">Actions</Label>
          <div className="flex flex-col gap-2 md:w-full md:flex-row md:items-center">
            <Button
              type="button"
              onClick={() => send({ type: "CLEAR" })}
              variant="secondary"
              size="icon"
              className="h-[50px] w-[50px] shrink-0 text-[#6B7280] hover:text-[#0F365C] md:h-[50px] md:w-[50px]"
              aria-label="Wyczyść"
            >
              <Eraser className="h-5 w-5" />
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-[50px] w-full flex-1 bg-[linear-gradient(323.48deg,#0F365C_23.99%,#5989B7_111.59%)] p-4 text-sm leading-[21px] font-bold disabled:opacity-50"
            >
              {isLoading ? "..." : "Oblicz"}
            </Button>
          </div>
        </div>
        {error && (
          <div className="col-span-full text-sm text-red-600">{error}</div>
        )}
      </div>
    </form>
  );
};

export default WorkDaysCalculator;
