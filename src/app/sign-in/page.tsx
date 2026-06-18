import Link from "next/link";

import { CardCompact } from "@/components/CardCompact";
import { SignInForm } from "@/features/ticket/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/paths";

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center animate-fade-from-top duration-300">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        className="w-full max-w-[420px] self-center"
        content={<SignInForm />}
        footer={
          <>
            <Link
              href={signUpPath()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Don&apos;t have an account? Sign up
            </Link>
            <Link
              href={passwordForgotPath()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Forgot your password?
            </Link>
          </>
        }
      />
    </div>
  );
};

export default SignInPage;
