import { AccountTab } from "@/app/(authenticated)/account/_navigation/tabs";
import { Heading } from "@/components/Heading";

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
