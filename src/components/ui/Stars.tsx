import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  reviews,
  className,
}: {
  rating: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              i < Math.round(rating)
                ? "fill-accent text-accent"
                : "fill-line text-line",
            )}
          />
        ))}
      </span>
      <span className="text-xs text-muted">
        {rating.toFixed(1)}
        {reviews != null ? ` (${reviews.toLocaleString("en-IN")})` : ""}
      </span>
    </span>
  );
}
