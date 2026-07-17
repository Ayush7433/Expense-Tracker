import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const EmptyChart = ({
  title = "No data available",
  description = "Add your first expense to see analytics.",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="flex h-80 flex-col items-center justify-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50">
        <BarChart3 className="text-blue-500 dark:text-blue-400" size={36} />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-xs text-center text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.div>
  );
};

export default EmptyChart;
