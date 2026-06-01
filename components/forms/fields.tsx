import { cn } from "@/lib/utils";

const FIELD_BASE =
  "w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-ink/40 outline-none transition focus:ring-2";
const FIELD_OK = "border-black/10 focus:border-brand focus:ring-brand/25";
const FIELD_ERR = "border-red-400 focus:border-red-400 focus:ring-red-200";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink/80">
      {children}
      {required && (
        <>
          <span aria-hidden className="text-brand-dark"> *</span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {error}
    </p>
  );
}

export function TextField({
  label,
  name,
  type = "text",
  required,
  error,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(FIELD_BASE, error ? FIELD_ERR : FIELD_OK)}
      />
      <FieldError id={`${name}-error`} error={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  required,
  error,
  placeholder = "Select…",
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        required={required}
        aria-required={required || undefined}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(FIELD_BASE, "appearance-none bg-[length:1.1rem] pr-10", error ? FIELD_ERR : FIELD_OK)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230a0a0a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.9rem center",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FieldError id={`${name}-error`} error={error} />
    </div>
  );
}
