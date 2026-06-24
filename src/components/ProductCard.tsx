import React, { useState } from "react";
import { getActiveQuantity, getTotalQuantity } from "../utils/productHelpers";

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
  variantQuantities?: Record<string, number>;
}

interface ProductCardProps {
  data: ProductCardData;
  onQuantityChange?: (id: string, quantity: number, color?: string | null) => void;
  onColorChange?: (id: string, color: string) => void;
  className?: string;
}

export default function ProductCard({
  data,
  onQuantityChange,
  onColorChange,
  className = "",
}: ProductCardProps) {
  const getCurrentImageUrl = () => {
    if (data.selectedColor) {
      const match = data.colorOptions.find(
        (opt) => opt.label === data.selectedColor,
      );
      if (match) return match.image;
    }
    return data.image;
  };

  const [quantity, setQuantity] = useState(() => getActiveQuantity(data));
  const [selected, setSelected] = useState(() => getTotalQuantity(data) > 0);
  const isSelected = selected || getTotalQuantity(data) > 0;
  const [selectedColor, setSelectedColor] = useState(data.selectedColor);
  const [currentImage, setCurrentImage] = useState(getCurrentImageUrl);
  const [prevQuantity, setPrevQuantity] = useState(() => getActiveQuantity(data));
  const [prevTotalQuantity, setPrevTotalQuantity] = useState(() =>
    getTotalQuantity(data),
  );
  const [prevSelectedColor, setPrevSelectedColor] = useState(
    data.selectedColor,
  );
  const [prevImage, setPrevImage] = useState(data.image);

  const activeQuantity = getActiveQuantity(data);
  const totalQuantity = getTotalQuantity(data);

  if (prevQuantity !== activeQuantity) {
    setPrevQuantity(activeQuantity);
    setQuantity(activeQuantity);
  }
  if (prevTotalQuantity !== totalQuantity) {
    setPrevTotalQuantity(totalQuantity);
    setSelected(totalQuantity > 0);
  }
  if (prevSelectedColor !== data.selectedColor) {
    setPrevSelectedColor(data.selectedColor);
    setSelectedColor(data.selectedColor);
    setQuantity(activeQuantity);
    const match = data.colorOptions.find(
      (opt) => opt.label === data.selectedColor,
    );
    setCurrentImage(match ? match.image : data.image);
  }
  if (prevImage !== data.image) {
    setPrevImage(data.image);
    // Only reset if no custom color is matching
    const match = data.colorOptions.find(
      (opt) => opt.label === data.selectedColor,
    );
    setCurrentImage(match ? match.image : data.image);
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = Math.max(0, quantity - 1);
    if (next === 0 && totalQuantity - quantity === 0) setSelected(false);
    setQuantity(next);
    onQuantityChange?.(data.id, next, selectedColor);
  };
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = quantity + 1;
    if (!selected) setSelected(true);
    setQuantity(next);
    onQuantityChange?.(data.id, next, selectedColor);
  };
  const handleCardClick = () => {
    if (totalQuantity === 0 && quantity === 0) {
      setSelected(true);
      setQuantity(1);
      onQuantityChange?.(data.id, 1, selectedColor);
    }
  };
  const handleColorSelect = (option: ColorOption, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColor(option.label);
    setCurrentImage(option.image);
    setQuantity(data.variantQuantities?.[option.label] ?? 0);
    onColorChange?.(data.id, option.label);
  };
  const hasColors = data.colorOptions.length > 0;
  const hasDiscount = data.discount !== null && data.originalPrice !== null;

  return (
    <div
      className={`relative flex items-center gap-[19px] rounded-[10px] bg-white p-3 w-full cursor-pointer transition-all duration-200 ${className}`}
      style={{
        borderWidth: "2px",
        borderColor: isSelected
          ? "var(--color-primary-semi)"
          : "transparent",
      }}
      onClick={handleCardClick}
    >
      {hasDiscount && (
        <div className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white bg-primary">
          Save {data.discount}%
        </div>
      )}

      <div className="shrink-0 flex items-center justify-center w-[101px] h-[101px]">
        <img
          src={currentImage}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-[10px] flex-1 min-w-0 pt-1">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-(--color-text-secondary) leading-tight">
            {data.name}
          </h3>
          <p className="text-xs text-text-tertiary font-medium mt-2 leading-snug">
            {data.description}
          </p>
          <a
            href={data.learnMoreUrl}
            className="text-xs font-medium text-link-blue underline w-fit hover:opacity-80 transition-opacity"
          >
            Learn More
          </a>
        </div>

        {hasColors && (
          <div className="flex gap-2 flex-wrap">
            {data.colorOptions.map((option) => {
              const isColorSelected = selectedColor === option.label;
              return (
                <button
                  key={option.label}
                  onClick={(e) => handleColorSelect(option, e)}
                  className={`flex items-center gap-0.5 rounded-[2px] border-[0.5px] px-[5px] py-px text-xs font-medium transition-colors duration-300 ${
                    isColorSelected
                      ? "border-accent-teal bg-accent-teal-light text-(--color-text-secondary)"
                      : "border-border-light bg-white text-(--color-text-secondary) hover:border-accent-teal"
                  }`}
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-6 h-6 object-contain"
                  />
                  {option.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={quantity === 0}
              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors duration-200 text-base leading-none ${
                quantity === 0
                  ? "border-2 border-(--color-gray-400) bg-transparent text-(--color-gray-400) cursor-not-allowed"
                  : "border-none bg-bg-input text-gray-500 cursor-pointer"
              }`}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-5 text-center text-[14px] font-semibold text-text-primary">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors duration-200 text-base leading-none border-none bg-bg-input text-gray-500 cursor-pointer"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="flex flex-col items-end">
            {hasDiscount && data.originalPrice !== null && (
              <span className="text-base text-accent-red font-normal line-through leading-tight">
                ${data.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-normal text-text-muted leading-tight">
              ${data.salePrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}