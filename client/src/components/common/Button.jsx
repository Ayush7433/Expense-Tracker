import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-blue-950",
  secondary:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
  outline:
    "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
  danger:
    "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-red-950",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800",
  dangerOutline:
    "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-300",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-3 font-medium",
  lg: "px-6 py-3.5 text-lg font-semibold",
  icon: "h-10 w-10 flex items-center justify-center p-0",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      loading = false,
      disabled = false,
      icon: Icon,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 rounded-2xl transition-all disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        {!loading && Icon && <Icon size={18} />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
