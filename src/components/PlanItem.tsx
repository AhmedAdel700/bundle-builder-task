interface PlanItemProps {
  icon: React.ReactNode;
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
  priceColorClass = "text-[#3B6AE8]",
}: PlanItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      {/* Icon */}
      <div className="w-10 h-10 flex-shrink-0 rounded-md flex items-center justify-center border border-[#CED6DE] bg-white overflow-hidden">
        {icon}
      </div>

      {/* Name */}
      <span className={`flex-1 text-sm font-medium ${nameColorClass}`}>
        {name}
      </span>

      {/* Price */}
      <div className="text-right min-w-[64px]">
        <p className="text-xs text-[#1F1F1FBF] line-through leading-none mb-0.5">
          {originalPrice}
        </p>
        <p className={`text-sm font-semibold leading-none ${priceColorClass}`}>
          {discountedPrice}
        </p>
      </div>
    </div>
  );
}
