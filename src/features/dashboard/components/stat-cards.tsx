import { BarChart3, Link2, QrCode } from "lucide-react";

import { overviewStatItems } from "@/features/dashboard/constants";
import type { Overview } from "@/features/dashboard/types";
import { formatNumber } from "@/lib/formatter";

const icons = {
  link: Link2,
  chart: BarChart3,
  qr: QrCode,
} as const;

type StatCardsProps = {
  stats?: Overview["stats"];
  isLoading?: boolean;
};

export function StatCards({ stats, isLoading = false }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {overviewStatItems.map((stat) => {
        const Icon = icons[stat.icon];
        const value = stats?.[stat.key] ?? 0;

        return (
          <div
            key={stat.id}
            className="relative overflow-hidden rounded-lg bg-surface-container-lowest p-6 ink-border shadow-hard"
          >
            <div className="mb-4 flex items-start justify-between">
              <div
                className={`flex size-12 items-center justify-center rounded-lg ink-border ${stat.iconWrap}`}
              >
                <Icon
                  className="size-6"
                  strokeWidth={2.25}
                  color="currentColor"
                />
              </div>
            </div>
            <p className="mb-1 font-label text-sm font-bold tracking-wider text-outline uppercase">
              {stat.label}
            </p>
            {isLoading ? (
              <div className="h-10 w-24 animate-pulse rounded-md bg-surface-container" />
            ) : (
              <p className="font-headline text-4xl font-extrabold">
                {formatNumber(value)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
