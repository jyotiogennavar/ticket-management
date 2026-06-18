"use client";

import { useActionState } from "react";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";

import { signIn } from "../actions/sign-in";

const SignInForm = () => {
  const [actionState, action] = useActionState<ActionState, FormData>(
    signIn,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        className="mt-2"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
      />
      <FieldError actionState={actionState} name="email" />

      <Input
        className="mt-2"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
