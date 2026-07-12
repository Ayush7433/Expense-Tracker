import { useSelector } from "react-redux";
import ProfileCard from "../components/profile/ProfileCard";
import AccountInfo from "../components/profile/AccountInfo";
import SecuritySettings from "../components/profile/SecuritySettings";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { expenses } = useSelector((state) => state.expense);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <p className="mt-2 text-sm text-slate-500">
          View your account details and session status.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard user={user} />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <AccountInfo user={user} totalExpenses={expenses?.length || 0} />
          <SecuritySettings />
        </div>
      </div>
    </div>
  );
};

export default Profile;