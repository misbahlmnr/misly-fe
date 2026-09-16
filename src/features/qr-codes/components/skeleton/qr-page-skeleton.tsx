const QrPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-80 animate-pulse rounded-xl bg-surface-container ink-border"
        />
      ))}
    </div>
  );
};

export default QrPageSkeleton;
