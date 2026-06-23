export default function ReviewHeader() {
  return (
    <div className="flex flex-col gap-6.25">
      <h3 className="uppercase text-xs font-normal text-[#484848]">Review</h3>
      <div className="flex flex-col gap-1.25">
        <h2 className="text-[22px] font-normal text-[#1F1F1F]">
          Your security system
        </h2>
        <p className="text-sm font-normal text-[#1F1F1FBF] leading-[130%]">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>
    </div>
  );
}
