import { OctagonAlert } from "lucide-react";
import { cloneElement } from "react";
interface PlaceholderProps {
  label: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>, "svg">;
  button?: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>, "button">;
}

const Placeholder = ({
  label,
  icon = <OctagonAlert />,
  button = <div className="h-10" />,
}: PlaceholderProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-y-4">
      {cloneElement(icon, { className: "size-10" })}
      <h2 className=" font-medium text-center">{label}</h2>
      {cloneElement(button, { className: "h-10" })}
    </div>
  );
};

export { Placeholder };
