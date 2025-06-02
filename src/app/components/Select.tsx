interface OptionProps {
  label: string;
  value: string | number;
}

interface SelectProps {
  id?: string;
  name?: string;
  options?: OptionProps[];
  defaultValue?: {
    label: string;
    value: string | number;
  };
  value?: string | number;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  defaultValue,
  onChange,
  value,
  className = "col-start-1 row-start-1 rounded-sm border-1 border-gray-200 shadow-xs grow py-[5.5] pr-7 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 appearance-none custom-scroll",
  ...props
}) => {
  return (
    <div className="grid">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue=""
        className={className}
        {...props}
      >
        {defaultValue && (
          <option value={defaultValue.value}>{defaultValue.label}</option>
        )}
        {options?.map((op, index) => (
          <option key={`${op}-${index}`} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        className="pointer-events-none fill-gray-500/50 col-start-1 row-start-1 justify-self-end self-center mr-2"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
        />
      </svg>
    </div>
  );
};
