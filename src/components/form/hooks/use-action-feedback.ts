import { useEffect } from "react";

import { ActionState } from "../utils/to-action-state";

const useActionFeedback = (actionState: ActionState) => {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      console.log(actionState.message);
    }
    if (actionState.status === "ERROR") {
      console.log(actionState.message);
    }
  }, [actionState]);
};

export { useActionFeedback };
