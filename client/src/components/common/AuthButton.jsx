import React from "react";
import Button from "./Button";

const AuthButton = ({ children, loading, ...props }) => {
  return (
    <Button
      type="submit"
      variant="primary"
      className="mt-2 w-full text-sm font-semibold"
      loading={loading}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AuthButton;