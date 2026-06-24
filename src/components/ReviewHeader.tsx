export default function ReviewHeader() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="uppercase text-xs font-medium text-gray-600">Review</h3>
      <div className="flex flex-col gap-1.25">
        <h2 className="text-[22px] font-semibold text-text-secondary">
          Your security system
        </h2>
        <p className="text-sm font-medium text-text-tertiary leading-[130%]">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>
    </div>
  );
}