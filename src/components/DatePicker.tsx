import { format, isValid, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

interface DatePickerProps {
  id: string;
  placeholder: string;
  className: string;
  value: Date | undefined;
  min?: Date;
  max?: Date;
  onChange: (newDate: Date | undefined) => void;
}

const DATE_INPUT_FORMAT = "yyyy-MM-dd";

const formatDateValue = (date: Date | undefined) =>
  date && isValid(date) ? format(date, DATE_INPUT_FORMAT) : "";

const formatDateAttribute = (date: Date | undefined) =>
  date && isValid(date) ? format(date, DATE_INPUT_FORMAT) : undefined;

export function DatePicker({
  id,
  className,
  placeholder,
  value,
  min,
  max,
  onChange,
}: DatePickerProps) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [shouldUseCustomPlaceholder, setShouldUseCustomPlaceholder] =
    useState(false);

  useEffect(() => {
    setInputValue(formatDateValue(value));
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

    if (e.target.validity.valid && isValid(dateValue)) {
      onChange(dateValue);
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    if (!event.target.value) {
      onChange(undefined);
      return;
    }

    if (!event.target.validity.valid) {
      setInputValue(formatDateValue(value));
    }
  };

  const minValue = formatDateAttribute(min);
  const maxValue = formatDateAttribute(max);

  return (
    <div
      className={cn(
        "relative flex h-[50px] min-w-0 items-center rounded-lg border border-[#D1D5DB] bg-white px-4 text-base leading-[22px] focus-within:border-2 focus-within:border-[#0F365C]",
        className
      )}
    >
      {shouldUseCustomPlaceholder && !inputValue && !isFocused && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 right-4 top-1/2 -translate-y-1/2 text-base text-muted-foreground"
        >
          {placeholder}
        </span>
      )}
      <input
        id={id}
        type="date"
        className="h-full w-full border-none bg-transparent p-0 text-base leading-[22px] outline-none focus:outline-none focus-visible:outline-none"
        placeholder={placeholder}
        value={inputValue}
        min={minValue}
        max={maxValue}
        onChange={handleInputValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
