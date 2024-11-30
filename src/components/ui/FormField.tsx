import React from 'react';
import { cn } from '../../lib/utils';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormField({ label, error, className, ...props }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        className={cn(
          "mt-1 block w-full rounded-md shadow-sm",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}