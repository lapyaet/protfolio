"use client";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";

type FormFieldProps<T> = {
  label: string;
  name: keyof T;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  placeholder?: string;
  textarea?: boolean;
  isrequired?: boolean;
};

export default function FormField<T>({
  label,
  name,
  type = "text",
  register,
  errors,
  placeholder,
  textarea = false,
  isrequired,
}: FormFieldProps<T>) {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="text-sm font-semibold mb-1.5 flex items-center gap-1">
        <span>{label}</span>
        {isrequired && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          data-lenis-prevent
          rows={5}
          {...register(name as any)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-violet-200 dark:border-white/15 bg-white/80 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-violet-500/20 transition-all duration-300"
        />
      ) : (
        <input
          type={type}
          {...register(name as any)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-violet-200 dark:border-white/15 bg-white/80 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-violet-500/20 transition-all duration-300"
        />
        // <Input
        //   type={type}
        //   {...register(name as any)}
        //   placeholder={placeholder}
        // />
      )}
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
