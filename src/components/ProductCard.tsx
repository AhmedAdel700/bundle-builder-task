import { useState } from "react";
// ── Types ────────────────────────────────────────────────────────────────────
export interface ColorOption {
  label: string;
  image: string;
}
export interface ProductCardData {
  id: string;
  name: string;
  description: string;
  learnMoreUrl: string;
  image: string;
  discount: number | null;
  originalPrice: number | null;
  salePrice: number;
  quantity: number;
  colorOptions: ColorOption[];
  selectedColor: string | null;
}
interface ProductCardProps {
  data: ProductCardData;
  onQuantityChange?: (id: string, quantity: number) => void;
  onColorChange?: (id: string, color: string) => void;
}
// ── Component ────────────────────────────────────────────────────────────────
export default function ProductCard({
  data,
  onQuantityChange,
  onColorChange,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState(data.selectedColor);
  const [currentImage, setCurrentImage] = useState(data.image);
  const handleDecrement = () => {
    const next = Math.max(0, quantity - 1);
    setQuantity(next);
    onQuantityChange?.(data.id, next);
  };
  const handleIncrement = () => {
    const next = quantity + 1;
    setQuantity(next);
    onQuantityChange?.(data.id, next);
  };
  const handleColorSelect = (option: ColorOption) => {
    setSelectedColor(option.label);
    setCurrentImage(option.image);
    onColorChange?.(data.id, option.label);
  };
  const hasColors = data.colorOptions.length > 0;
  const hasDiscount = data.discount !== null && data.originalPrice !== null;
  return (
    <div className="relative flex items-start gap-[19px] rounded-[10px] bg-white p-3 w-full">
      {/* Discount badge */}
      {hasDiscount && (
        <div
          className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: "#4E2FD2" }}
        >
          Save {data.discount}%
        </div>
      )}
      {/* Product image */}
      <div className="shrink-0 flex items-center justify-center w-[101px] h-[101px] mt-5">
        <img
          src={currentImage}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right content */}
      <div className="flex flex-col gap-[10px] flex-1 min-w-0 pt-1">
        {/* Name + description + learn more */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
            {data.name}
          </h3>
          <p className="text-[13px] text-gray-500 leading-snug">
            {data.description}
          </p>
          <a
            href={data.learnMoreUrl}
            className="text-[13px] font-medium text-blue-600 hover:underline w-fit"
          >
            Learn More
          </a>
        </div>
        {/* Color options */}
        {hasColors && (
          <div className="flex gap-2 flex-wrap">
            {data.colorOptions.map((option) => {
              const isSelected = selectedColor === option.label;
              return (
                <button
                  key={option.label}
                  onClick={() => handleColorSelect(option)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                    isSelected
                      ? "border-gray-900 bg-gray-50 text-gray-900"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-4 h-4 object-contain"
                  />
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
        {/* Quantity + price row */}
        <div className="flex items-center justify-between gap-2">
          {/* Quantity stepper */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={quantity === 0}
              className="w-7 h-7 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 text-base font-medium flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-5 text-center text-[14px] font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-7 h-7 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 text-base font-medium flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          {/* Price */}
          <div className="flex flex-col items-end">
            {hasDiscount && data.originalPrice !== null && (
              <span className="text-[13px] text-red-400 line-through leading-tight">
                ${data.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[15px] font-bold text-gray-900 leading-tight">
              ${data.salePrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}