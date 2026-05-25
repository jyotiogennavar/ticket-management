import { useEffect, useRef } from "react";

import { ActionState } from "../utils/to-action-state";

type onArgs = {
  actionState: ActionState;
};

type useActionFeedbackOptions = {
  onSuccess?: (args: onArgs) => void;
  onError?: (args: onArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: useActionFeedbackOptions,
) => {
  const prevTimestamp = useRef<number>(actionState.timestamp);

  useEffect(() => {
    if (prevTimestamp.current === actionState.timestamp) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }
    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
    prevTimestamp.current = actionState.timestamp;
  }, [actionState, options]);
};

export { useActionFeedback };
