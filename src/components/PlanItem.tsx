interface PlanItemProps {
  icon: string;
  name: string;
  originalPrice: string;
  discountedPrice: string;
  nameColorClass?: string;
  priceColorClass?: string;
}

export default function PlanItem({
  icon,
  name,
  originalPrice,
  discountedPrice,
  nameColorClass = "text-[#1F1F1F]",
  priceColorClass = "text-[#4E2FD2]",
}: PlanItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="w-[41px] h-[41px] shrink-0 rounded-[5px] flex items-center justify-center bg-white">
        <img src={icon} alt="icon" className="w-[29px] h-[29px]" />
      </div>

      <span className={`flex-1 text-sm font-semibold ${nameColorClass}`}>
        {name}
      </span>

      <div className="text-right min-w-[64px]">
        <p className="text-sm text-[#6F7882] line-through font-semibold leading-none mb-0.5">
          {originalPrice}
        </p>
        <p
          className={`text-sm font-semibold leading-none text-[#4E2FD2] ${priceColorClass}`}
        >
          {discountedPrice}
        </p>
      </div>
    </div>
  );
}
