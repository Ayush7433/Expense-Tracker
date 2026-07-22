import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/common/Button";

const NotFound = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <Compass size={28} />
        </div>

        <h1 className="mt-6 text-5xl font-bold text-slate-900 dark:text-white">
          404
        </h1>

        <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Button
          variant="primary"
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
          className="mt-6"
        >
          {isAuthenticated ? "Go to Dashboard" : "Go to Login"}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
