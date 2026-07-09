import { X } from "lucide-react";

const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-gray-100" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
