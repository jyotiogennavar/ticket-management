import { AccountTab } from "@/app/(authenticated)/account/_navigation/tabs";
import { Heading } from "@/components/Heading";

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
