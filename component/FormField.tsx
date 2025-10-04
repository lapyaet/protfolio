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
      <label className="text-sm font-medium mb-1 flex items-center gap-2">
        <span>{label}</span>
        {isrequired && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          {...register(name as any)}
          placeholder={placeholder}
          className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#8B5CF6] transition-all duration-300 "
        />
      ) : (
        <input
          type={type}
          {...register(name as any)}
          placeholder={placeholder}
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#8B5CF6] transition-all duration-300 "
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
