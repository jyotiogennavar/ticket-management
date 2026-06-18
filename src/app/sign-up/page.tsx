import Link from "next/link";

import { CardCompact } from "@/components/CardCompact";
import { SignUpForm } from "@/features/ticket/auth/components/sign-up-form";
import { signInPath } from "@/paths";

const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center animate-fade-from-top duration-300">
      <CardCompact
        title="Sign Up"
        description="Sign up to your account"
        className="w-full max-w-[420px] self-center"
        content={<SignUpForm />}
        footer={
          <Link
            href={signInPath()}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Already have an account? Sign in
          </Link>
        }
      />
    </div>
  );
};

export default SignUpPage;
