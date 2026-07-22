import { useSelector } from "react-redux";
import logo from "../assets/Logo.png";
import logoDark from "../assets/Logo_Dark.png";

const AuthLayout = ({ image, title, subtitle, children }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const logoSrc = themeMode === "dark" ? logoDark : logo;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="grid my-8 md:my-0 w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 lg:h-[95vh] lg:max-h-[900px] lg:grid-cols-2">
        <div className="relative hidden h-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 lg:flex">
          <img
            src={image}
            alt="Auth visual"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          />
        </div>

        <div className="overflow-y-auto p-8 sm:p-10 lg:p-12 hide-scrollbar">
          <div className="mx-auto max-w-md">
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <img
                src={logoSrc}
                alt="Expense Tracker Logo"
                className="h-11 w-11 rounded-2xl object-cover shadow-md shadow-blue-200 dark:shadow-none"
              />
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Expense Tracker
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Track. Budget. Save.
                </p>
              </div>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-2 text-gray-500 dark:text-slate-400">
                {subtitle}
              </p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
