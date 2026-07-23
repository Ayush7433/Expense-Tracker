import { LogOut } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

const LogoutConfirmationModal = ({ open, onCancel, onConfirm, loading }) => {
  return (
    <Modal open={open} onClose={onCancel} title="Confirm Logout">
      <div className="space-y-6 text-center sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/50 sm:h-10 sm:w-10">
            <LogOut className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Are you sure you want to log out? You will need to sign in again to access your account.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>

          <Button variant="primary" onClick={onConfirm} loading={loading}>
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirmationModal;
