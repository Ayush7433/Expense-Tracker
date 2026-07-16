import { forwardRef } from "react";

const FormField = forwardRef(
  ({ label, error, type = "text", as: Component = "input", className = "", children, ...props }, ref) => {
    const componentProps = Component === "input" ? { type, ...props } : props;
    
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
        <Component
          ref={ref}
          {...componentProps}
          className={`w-full rounded-2xl border ${
            error
              ? "border-red-500 focus:ring-red-100 focus:border-red-500"
              : "border-gray-200 focus:ring-blue-100 focus:border-blue-500"
          } px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${className}`}
        >
          {children}
        </Component>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
