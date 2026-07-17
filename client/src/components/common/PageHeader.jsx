/**
 * Reusable page header with title and optional subtitle.
 * Replaces the repeated h1 + p pattern in Dashboard, Expenses, and Profile pages.
 */
const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
};

export default PageHeader;
