import React from "react";

const UserAvatar = ({ avatarUrl, name = "User", className = "" }) => {
  const initial = name.charAt(0).toUpperCase() || "U";

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white shadow-md ${className}`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        initial
      )}
    </div>
  );
};

export default UserAvatar;
