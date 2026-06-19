import { cn } from "@/lib/utils";
import { formatPrice, discountPercent } from "@/lib/utils";

export function Price({
  price,
  compareAt,
  className,
  size = "md",
}: {
  price: number;
  compareAt?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const off = discountPercent(price, compareAt);
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };
  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-medium tracking-tight", sizes[size])}>
        {formatPrice(price)}
      </span>
      {compareAt && off ? (
        <>
          <span className="text-muted line-through decoration-from-font text-[0.85em]">
            {formatPrice(compareAt)}
          </span>
          <span className="text-accent-deep text-[0.78em] font-medium">−{off}%</span>
        </>
      ) : null}
    </span>
  );
}
