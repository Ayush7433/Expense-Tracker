import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon, color = "blue" }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    green:
      "bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
    orange:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
    red: "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-medium text-gray-500 dark:text-slate-400"
              title={title}
            >
              {title}
            </p>
            <h3
              className="mt-2 truncate max-w-50 text-2xl font-bold text-gray-900 dark:text-white"
              title={String(value)}
            >
              {value}
            </h3>
          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colorMap[color] || colorMap.blue}`}
          >
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
