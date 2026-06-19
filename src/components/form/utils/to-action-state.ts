import { ZodError } from "zod";

export type ActionState = {
  status: "SUCCESS" | "ERROR";
  message: string;
  fieldsErrors?: Record<string, string>;
  payload?: Record<string, string>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  status: "SUCCESS",
  message: "",
  fieldsErrors: {},
  timestamp: Date.now(),
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
      status: "ERROR",
      message: error.issues[0]?.message ?? "Validation failed",
      fieldsErrors: error.issues.reduce(
        (acc, issue) => {
          acc[issue.path[0] as string] = issue.message;
          return acc;
        },
        {} as Record<string, string>,
      ),
      payload,
      timestamp: Date.now(),
    };
  }

  if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldsErrors: {},
      payload,
      timestamp: Date.now(),
    };
  }

  return {
    status: "ERROR",
    message: "An unknown error occurred",
    fieldsErrors: {},
    payload,
    timestamp: Date.now(),
  };
};

export const toActionState = (
  status: "SUCCESS" | "ERROR",
  message: string,
  formData?: FormData,
): ActionState => {
  return {
    status,
    message,
    fieldsErrors: {},
    payload: formData ? formDataToPayload(formData) : {},
    timestamp: Date.now(),
  };
};
