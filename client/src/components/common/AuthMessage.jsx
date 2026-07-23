const AuthMessage = ({ type = "success", title, description, action }) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`rounded-2xl border p-5 text-center ${
        isSuccess
          ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/40"
          : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40"
      }`}
    >
      <p
        className={`text-sm font-medium ${
          isSuccess
            ? "text-green-700 dark:text-green-400"
            : "text-red-700 dark:text-red-400"
        }`}
      >
        {title}
      </p>
      {description && (
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default AuthMessage;
