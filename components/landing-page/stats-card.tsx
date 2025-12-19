import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

export default function StatsCard({
  icon: Icon,
  label,
  value,
  hasBorder,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hasBorder?: boolean;
}) {
  return (
    <div className={cn("text-center space-y-2", hasBorder && "border-x border-border/50")}>
      <div className="flex items-center justify-center gap-2">
        <Icon className="size-5 text-primary/70" />
        <p className="text-3xl sm:text-4xl font-bold">{value}</p>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
