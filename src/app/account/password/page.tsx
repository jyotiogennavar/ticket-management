import { Heading } from "@/components/Heading";
import { AccountTab } from "@/features/accounts/components/account-tab";

const AccountPasswordPage = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Heading
        title="Password"
        description="Your password information"
        tabs={<AccountTab />}
      />
    </div>
  );
};

export default AccountPasswordPage;
