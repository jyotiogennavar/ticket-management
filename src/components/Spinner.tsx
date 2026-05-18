import { LoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center self-center h-full">
      <LoaderCircle className="h-10 w-10 animate-spin" />
    </div>
  );
};

export { Spinner };
