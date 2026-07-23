import { useState } from "react";
import { Sparkles } from "lucide-react";
import Button from "../common/Button";
import { parseExpenseTextApi } from "../../redux/services/aiApi";

const EXAMPLES = [
  "Spent 500 on pizza yesterday",
  "1200 for uber ride today",
  "Paid 3000 electricity bill last week",
];

const QuickAddExpenseModal = ({ onParsed, onManualEntry, onClose }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleParse = async () => {
    if (!text.trim()) {
      setError("Please describe the expense first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await parseExpenseTextApi(text.trim());
      onParsed(response.parsed);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Couldn't parse that — try rephrasing.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleParse();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 dark:border-blue-900 dark:bg-blue-950/30">
        <Sparkles
          size={18}
          className="mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400"
        />
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Describe your expense in plain words — I'll fill in the details for
          you to review.
        </p>
      </div>

      <div>
        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder={EXAMPLES[0]}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-950"
        />

        {error && (
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setText(example)}
              className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onManualEntry}
          className="text-sm font-medium text-gray-500 underline-offset-2 hover:underline dark:text-slate-400"
        >
          Enter manually instead
        </button>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            icon={Sparkles}
            onClick={handleParse}
            loading={loading}
          >
            Parse with AI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddExpenseModal;
