import { Separator } from "@/components/ui/separator";

interface HeadingProps {
  title: string;
  description ?: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
 <>
     <div className="px-2 md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <Separator />
 </>
  )
}

export { Heading };