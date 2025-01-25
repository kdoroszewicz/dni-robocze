import { format, isValid, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { cn } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./Input";

interface DatePickerProps {
  id: string;
  placeholder: string;
  className: string;
  value: Date | undefined;
  onChange: (newDate: Date | undefined) => void;
}

export function DatePicker({
  id,
  className,
  placeholder,
  value,
  onChange,
}: DatePickerProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value) {
      setInputValue(format(value, "dd.MM.yyyy"));
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    let dateValue;
    try {
      dateValue = parse(e.target.value, "dd.MM.yyyy", new Date());
    } catch (error) {
      console.error(error);
    }
    if (isValid(dateValue)) {
      onChange(dateValue);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    onChange?.(date);

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
            "input-group relative flex h-[50px] min-w-0 items-center"
          )}
        >
          <div className="absolute left-0 z-20 py-4 pl-4">
            <CalendarIcon className="h-4 w-4" />
          </div>
          <Input
            className={cn(
              "h-[50px] min-w-0 rounded-lg border border-[#D1D5DB] bg-white pl-10 text-sm leading-[17.5px] focus-within:ring-offset-0 focus:border-2 focus:border-[#0F365C] focus-visible:ring-0",
              className
            )}
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
          key={value?.toString()}
          id={id}
          mode="single"
          selected={value}
          onSelect={handleDateSelect}
          initialFocus={false}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
}
