import { useEffect, useState } from "react";

export default function Input({
  value: initialValue,
  onChange,
  debounce = 0,
  className = "rounded-sm border-1 border-gray-200 shadow-xs py-1 pl-1 text-base text-gray-500 placeholder:text-gray-400 focus:outline-none sm:text-sm/6",
  ...props
}: {
  value: string | number;
  onChange: (e: string | number | React.ChangeEvent<HTMLInputElement>) => void;
  debounce?: number;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      {...props}
      className={className}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}