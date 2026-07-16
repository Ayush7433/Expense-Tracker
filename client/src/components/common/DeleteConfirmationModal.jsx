import React from "react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

const DeleteConfirmationModal = ({ open, onCancel, onConfirm, loading }) => {
  return (
    <Modal open={open} onClose={onCancel} title="Delete Expense">
      <div className="space-y-6 text-center sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-10 sm:w-10">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this expense? This action cannot be
              undone.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
          >
            Delete Expense
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
