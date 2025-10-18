import { format, isValid, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);
  const [shouldUseCustomPlaceholder, setShouldUseCustomPlaceholder] =
    useState(false);

  useEffect(() => {
    if (value) {
      setInputValue(format(value, "yyyy-MM-dd"));
    } else {
      setInputValue("");
    }
  }, [value]);

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isWebkit = /WebKit/.test(userAgent);
    const isUnsupportedBrowser = /CriOS|FxiOS|OPiOS/.test(userAgent);

    if (isIOS && isWebkit && !isUnsupportedBrowser) {
      setShouldUseCustomPlaceholder(true);
    }
  }, []);

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (!e.target.value) {
      onChange(undefined);
      return;
    }

    const dateValue = parse(e.target.value, "yyyy-MM-dd", new Date());

    if (isValid(dateValue)) {
      onChange(dateValue);
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    if (!event.target.value) {
      onChange(undefined);
    }
  };

  return (
    <div
      className={cn("input-group relative flex h-[50px] min-w-0 items-center")}
    >
      <div className="pointer-events-none absolute left-0 z-20 py-4 pl-4">
        <CalendarIcon className="h-4 w-4" />
      </div>
      {shouldUseCustomPlaceholder && !inputValue && !isFocused && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-10 right-4 top-1/2 -translate-y-1/2 text-base text-muted-foreground"
        >
          {placeholder}
        </span>
      )}
      <Input
        id={id}
        type="date"
        className={cn(
          "h-[50px] min-w-0 rounded-lg border border-[#D1D5DB] bg-white pl-10 text-base leading-[22px] focus-within:ring-offset-0 focus:border-2 focus:border-[#0F365C] focus-visible:ring-0",
          className
        )}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
