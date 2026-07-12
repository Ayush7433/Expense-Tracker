const AvatarUploader = ({ name = "" }) => {
  const initial = name.charAt(0).toUpperCase() || "U";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Avatar</h3>
      <p className="mt-1 text-sm text-slate-500">
        Profile picture upload is not enabled yet.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-bold text-white shadow-lg shadow-blue-200">
          {initial}
        </div>

        <div>
          <p className="font-medium text-slate-900">{name || "User"}</p>
          <p className="mt-1 text-sm text-slate-500">
            Avatar generated from your name initial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvatarUploader;