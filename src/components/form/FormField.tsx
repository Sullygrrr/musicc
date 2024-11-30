interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}