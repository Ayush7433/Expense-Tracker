import AvatarUploader from "./AvatarUploader";

const ProfileCard = ({ user }) => {
  return (
    <div className="space-y-4">
      <AvatarUploader user={user} />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Profile Details
        </h3>

        <div className="mt-4 space-y-4">
          <div className="min-w-0">
            <p className="text-sm text-slate-500 dark:text-slate-400">Name</p>
            <p
              className="mt-1 truncate font-medium text-slate-900 dark:text-white"
              title={user?.name}
            >
              {user?.name || "Not available"}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
            <p
              className="mt-1 truncate font-medium text-slate-900 dark:text-white"
              title={user?.email}
            >
              {user?.email || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
