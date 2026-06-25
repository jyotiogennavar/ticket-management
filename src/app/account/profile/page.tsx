import { Heading } from "@/components/Heading";
import { AccountTab } from "@/features/accounts/components/account-tab";

const AccountProfilePage = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="Your profile information"
        tabs={<AccountTab />}
      />
    </div>
  );
};

export default AccountProfilePage;
