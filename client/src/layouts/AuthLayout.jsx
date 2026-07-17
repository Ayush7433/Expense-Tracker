const AuthLayout = ({ image, title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
      <div className="grid h-[95vh] max-h-[900px] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2">
        <div className="relative hidden h-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 lg:flex">
          <img
            src={image}
            alt="Auth visual"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          />
        </div>

        <div className="overflow-y-auto p-8 sm:p-10 lg:p-12 hide-scrollbar">
          <div className="mx-auto max-w-md">
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
