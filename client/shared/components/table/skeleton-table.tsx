import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";

const SkeletonTable = () => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-3">
            <Skeleton className="w-full h-14" />
            <Skeleton className="w-full h-10" />
            <div className="w-full border border-neutral-400 rounded-md">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className={cn("w-full rounded-none border-y border-y-neutral-400", i === 0 ? 'h-7' : 'h-14')}
                    />
                ))}
            </div>
        </div>
    );
}

export default SkeletonTable;
