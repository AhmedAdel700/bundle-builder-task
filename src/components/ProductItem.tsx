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
      <div className="w-[41px] h-[41px] shrink-0 bg-white rounded-[5px] flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <span className="flex-1 text-sm text-[#0B0D10] font-medium leading-[130%]">
        {name}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={onDecrement}
          className="w-5 h-5 bg-white rounded-sm flex items-center justify-center hover:bg-[#e6edf5] duration-300 tracking-colors"
        >
          <Minus size={12} stroke-width={3} color="#575757" />
        </button>
        <span className="text-sm text-[#1F1F1F] w-3 font-semibold text-center">
          {quantity}
        </span>
        <button
          onClick={onIncrement}
          className="w-5 h-5 bg-white rounded-sm flex items-center justify-center hover:bg-[#e6edf5] duration-300 tracking-colors"
        >
          <Plus size={12} stroke-width={3} color="#575757" />
        </button>
      </div>

      <div className="text-right ml-2 min-w-[56px]">
        {originalPrice && (
          <p className="text-sm text-[#6F7882] line-through font-medium leading-none mb-0.5">
            {originalPrice}
          </p>
        )}
        <p className={`text-sm font-semibold leading-none text-[#4E2FD2]`}>
          {isFree ? "FREE" : discountedPrice}
        </p>
      </div>
    </div>
  );
}
