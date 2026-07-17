import React from "react";

const Loader = ({message = "Loading expenses..." }) => {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-500" />
        <p className="text-sm text-gray-500 dark:text-slate-400">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
