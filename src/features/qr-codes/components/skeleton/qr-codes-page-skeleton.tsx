function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse bg-surface-container ${className}`} />;
}

function SummaryCardSkeleton() {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard">
      <div className="flex items-start justify-between">
        <div className="min-w-0 space-y-2">
          <Pulse className="h-4 w-28 rounded-md" />
          <Pulse className="h-8 w-20 rounded-md" />
        </div>
        <Pulse className="size-12 shrink-0 rounded-full ink-border" />
      </div>
    </div>
  );
}

function QrCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl bg-surface-container-lowest ink-border shadow-hard">
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-t-xl border-b-2 border-on-surface bg-surface-bright p-8">
        <Pulse className="size-full max-w-44 rounded-md" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Pulse className="mb-1 h-6 w-3/4 rounded-md" />
        <Pulse className="mb-4 h-4 w-full rounded-md" />

        <div className="mt-auto mb-6 flex items-center justify-between">
          <Pulse className="h-4 w-14 rounded-md" />
          <Pulse className="h-4 w-20 rounded-md" />
        </div>

        <div className="mt-auto flex gap-2">
          <Pulse className="size-9 rounded-md" />
          <div className="flex-1" />
          <Pulse className="size-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function QrCodesPageSkeleton() {
  return (
    <div
      className="mx-auto max-w-5xl space-y-8"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <span className="sr-only">Loading QR codes</span>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Pulse className="mb-2 h-9 w-48 rounded-md md:h-10" />
          <Pulse className="h-6 w-full max-w-lg rounded-md" />
        </div>
        <Pulse className="h-12 w-44 shrink-0 rounded-lg" />
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl bg-surface-container-lowest p-4 ink-border shadow-hard md:flex-row">
        <Pulse className="h-12 w-full flex-1 rounded-lg" />
        <div className="flex w-full gap-4 md:w-auto">
          <Pulse className="h-12 w-full rounded-lg md:w-40" />
          <Pulse className="h-12 w-full rounded-lg md:w-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SummaryCardSkeleton key={`summary-skeleton-${index}`} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <QrCardSkeleton key={`qr-card-skeleton-${index}`} />
        ))}
      </div>
    </div>
  );
}
