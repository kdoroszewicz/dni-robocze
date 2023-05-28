"use client";

import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { Input } from "./Input";
import { ChangeEvent, useState } from "react";

interface DatePickerProps {
  id: string;
  placeholder: string;
  className: string;
}

export function DatePicker({ id, className, placeholder }: DatePickerProps) {
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState<Date>();

  // const handleChange = (dateValue: string) => {
  //   let parsedDate;
  //   try {
  //     parsedDate = parse(dateValue, "dd.MM.yyyy", new Date());
  //   } catch (error) {}

  //   if (parsedDate) {
  //     setDate(parsedDate);
  //   }
  // };

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    console.log(
      "🚀 ~ file: DatePicker.tsx:50 ~ handleInputValueChange ~ e.target.value:",
      e.target.value
    );
    let dateValue;
    try {
      dateValue = parse(e.target.value, "dd.MM.yyyy", new Date());
    } catch (error) {
      console.error(error);
    }

    console.log(
      "🚀 ~ file: DatePicker.tsx:49 ~ handleInputValueChange ~ dateValue:",
      dateValue
    );
    if (dateValue) {
      setDate(dateValue);
    } else {
      setDate(new Date());
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);

    if (date) {
      const formattedDate = format(date, "dd.MM.yyyy");
      setInputValue(formattedDate);
    } else {
      setInputValue("");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "input-group flex h-[50px] min-w-0 items-center rounded-lg border border-[#D1D5DB] p-4",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <input
            className="min-w-0"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputValueChange}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Calendar
          id={id}
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus={false}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}
