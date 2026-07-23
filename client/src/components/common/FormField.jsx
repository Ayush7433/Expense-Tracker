import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormField = forwardRef(
  (
    {
      label,
      error,
      type = "text",
      as: Component = "input",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = Component === "input" && type === "password";
    const effectiveType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    const componentProps =
      Component === "input" ? { type: effectiveType, ...props } : props;

    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
          {label}
        </label>

        <div className="relative">
          <Component
            ref={ref}
            {...componentProps}
            className={`w-full rounded-2xl border ${
              error
                ? "border-red-500 focus:ring-red-100 focus:border-red-500 dark:focus:ring-red-950"
                : "border-gray-200 dark:border-slate-700 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-blue-950"
            } bg-white text-gray-900 dark:bg-slate-800 dark:text-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
              isPassword ? "pr-12" : ""
            } ${type === "date" ? "dark:[color-scheme:dark] min-h-[46px]" : ""} ${className}`}
          >
            {children}
          </Component>

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              title={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
