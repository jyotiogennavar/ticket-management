import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const shimmer = "animate-pulse rounded-md bg-muted";

const TicketSkeleton = () => (
  <div className="w-full flex gap-x-2 max-w-[420px]">
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          <div className={cn("size-5 shrink-0", shimmer)} aria-hidden />
          <div className={cn("h-5 w-[80%] flex-1", shimmer)} aria-hidden />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className={cn("h-4 w-full", shimmer)} aria-hidden />
        <div className={cn("h-4 w-[88%]", shimmer)} aria-hidden />
      </CardContent>
    </Card>
    <div className="flex flex-col gap-y-2" aria-hidden>
      <div className={cn("size-9 shrink-0", shimmer)} />
    </div>
  </div>
);

type TicketListSkeletonProps = {
  count?: number;
};

const TicketListSkeleton = ({ count = 5 }: TicketListSkeletonProps) => (
  <div className="flex-1 flex flex-col items-center gap-y-4">
    {Array.from({ length: count }, (_, index) => (
      <TicketSkeleton key={index} />
    ))}
  </div>
);

export { TicketListSkeleton, TicketSkeleton };
