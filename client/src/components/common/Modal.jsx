import { X } from "lucide-react";

const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl bg-white shadow-2xl border border-gray-100 dark:bg-slate-900 dark:border-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 dark:border-slate-800 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
