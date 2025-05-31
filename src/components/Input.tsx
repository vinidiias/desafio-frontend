interface InputProps {
  type?: "text" | "password" | "email" | "tel" | "number" | "search";
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  className = "rounded-sm border-1 border-gray-500/50 shadow-sm min-w-0 grow py-1 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6",
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};
