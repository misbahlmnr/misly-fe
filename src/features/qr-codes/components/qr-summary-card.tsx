const SummaryCard = ({
  label,
  value,
  valueClass = "text-3xl",
  icon,
  iconWrap,
  hint,
}: {
  label: string;
  value: string;
  valueClass?: string;
  icon: React.ReactNode;
  iconWrap: string;
  hint?: string;
}) => {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-sm font-bold text-on-surface-variant">
            {label}
          </p>
          <h3
            className={`font-headline font-bold text-on-surface ${valueClass}`}
          >
            {value}
          </h3>
          {hint ? (
            <p className="mt-1 text-sm font-bold text-on-surface-variant">
              {hint}
            </p>
          ) : null}
        </div>
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-full ink-border ${iconWrap}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
