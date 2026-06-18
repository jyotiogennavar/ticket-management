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

import { signUp } from "../actions/sign-up";

const SignUpForm = () => {
  const [actionState, action] = useActionState<ActionState, FormData>(
    signUp,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input className="mt-2" type="text" name="username" id="username" placeholder="Username" />
      <FieldError actionState={actionState} name="username" />

      <Input className="mt-2" type="email" name="email" id="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />

      <Input
        className="mt-2"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <FieldError actionState={actionState} name="password" />

      <Input
        className="mt-2"
        type="password"
        name="passwordConfirmation"
        id="passwordConfirmation"
        placeholder="Password Confirmation"
      />
      <FieldError actionState={actionState} name="passwordConfirmation" />
      
      <SubmitButton label="Create Account" />
    </Form>
  );
};

export { SignUpForm };
