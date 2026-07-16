import AvatarUploader from "./AvatarUploader";

const ProfileCard = ({ user }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <AvatarUploader user={user} />

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h3 className="text-lg font-semibold text-slate-900">Profile Details</h3>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="font-medium text-slate-900">
              {user?.name || "Not available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium text-slate-900">
              {user?.email || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;