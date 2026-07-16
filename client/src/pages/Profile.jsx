import { useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import ProfileCard from "../components/profile/ProfileCard";
import AccountInfo from "../components/profile/AccountInfo";
import SecuritySettings from "../components/profile/SecuritySettings";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { expenses } = useSelector((state) => state.expense);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="View your account details and session status."
      />

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