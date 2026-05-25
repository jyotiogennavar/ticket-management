import { ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: Record<string, string>;
};

const formDataToPayload = (formData: FormData): Record<string, string> =>
  Object.fromEntries(formData.entries()) as Record<string, string>;

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData,
): ActionState => {
  const payload = formData ? formDataToPayload(formData) : undefined;

  if (error instanceof ZodError) {
    return {
      message: error.issues[0]?.message ?? "Validation failed",
      payload,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      payload,
    };
  }

  return {
    message: "An unknown error occurred",
    payload,
  };
};