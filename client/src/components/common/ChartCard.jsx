import { motion } from "framer-motion";
import EmptyChart from "./EmptyChart";

/**
 * Reusable animated card wrapper for dashboard charts.
 * Extracts the shared motion.div + title + empty-state pattern
 * from ExpenseChart and MonthlyExpenseChart.
 *
 * @param {string}  title            - Chart heading text.
 * @param {boolean} isEmpty          - Whether to show the empty state.
 * @param {string}  emptyTitle       - Title for the empty state.
 * @param {string}  emptyDescription - Description for the empty state.
 * @param {number}  [delay=0]        - Animation delay in seconds.
 * @param {React.ReactNode} children - The actual chart content.
 */
const ChartCard = ({
  title,
  isEmpty = false,
  emptyTitle,
  emptyDescription,
  delay = 0,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay,
      }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      {isEmpty ? (
        <EmptyChart title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="mt-6 h-80">{children}</div>
      )}
    </motion.div>
  );
};

export default ChartCard;
