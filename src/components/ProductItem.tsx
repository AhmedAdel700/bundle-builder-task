import { Minus, Plus } from "lucide-react";

interface ProductItemProps {
  image?: string;
  name: string;
  quantity: number;
  originalPrice?: string;
  discountedPrice: string;
  isFree?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export default function ProductItem({
  image,
  name,
  quantity,
  originalPrice,
  discountedPrice,
  isFree = false,
  onIncrement,
  onDecrement,
}: ProductItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      {/* Product image */}
      <div className="w-10 h-10 flex-shrink-0 bg-white rounded-md flex items-center justify-center border border-[#CED6DE]">
        {image ? (
          <img src={image} alt={name} className="w-8 h-8 object-contain" />
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded" />
        )}
      </div>

      {/* Name */}
      <span className="flex-1 text-sm text-[#1F1F1F] leading-[130%]">
        {name}
      </span>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrement}
          className="w-5 h-5 bg-white rounded-sm flex items-center justify-center"
        >
          <Minus size={12} stroke-width={3} color="#575757"/>
        </button>
        <span className="text-sm text-[#1F1F1F] w-3 text-center">
          {quantity}
        </span>
        <button
          onClick={onIncrement}
          className="w-5 h-5 bg-white rounded-sm flex items-center justify-center"
        >
          <Plus size={12} stroke-width={3} color="#575757"/>
        </button>
      </div>

      {/* Price */}
      <div className="text-right ml-2 min-w-[56px]">
        {originalPrice && (
          <p className="text-xs text-[#1F1F1FBF] line-through leading-none mb-0.5">
            {originalPrice}
          </p>
        )}
        <p
          className={`text-sm font-semibold leading-none ${
            isFree ? "text-[#1F1F1F]" : "text-[#3B6AE8]"
          }`}
        >
          {isFree ? "FREE" : discountedPrice}
        </p>
      </div>
    </div>
  );
}
