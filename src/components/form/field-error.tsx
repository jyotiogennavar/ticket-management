import { ActionState } from "@/components/form/utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldsErrors?.[name];

  if (!message) return null;

  return <span className="text-destructive text-sm">{message}</span>;
};

export { FieldError };