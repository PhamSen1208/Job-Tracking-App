import type { ReactNode } from "react";

type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  icon?: ReactNode;
};

const TextField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  icon,
}: TextFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-200" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-400">{icon}</span>
          </div>
        )}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`input-base ${icon ? "pl-10" : "pl-3"} w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 text-sm text-slate-50 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-500`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default TextField;
