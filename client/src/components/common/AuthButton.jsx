import React from "react";

const AuthButton = ({ loading, children, loadingText }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-2xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default AuthButton;