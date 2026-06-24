import React, { useState } from "react";
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

  const [quantity, setQuantity] = useState(data.quantity);
  const [selected, setSelected] = useState(data.quantity > 0);
  const isSelected = selected || quantity > 0;
  const [selectedColor, setSelectedColor] = useState(data.selectedColor);
  const [currentImage, setCurrentImage] = useState(getCurrentImageUrl);
  const [prevQuantity, setPrevQuantity] = useState(data.quantity);
  const [prevSelectedColor, setPrevSelectedColor] = useState(
    data.selectedColor,
  );
  const [prevImage, setPrevImage] = useState(data.image);

  if (prevQuantity !== data.quantity) {
    setPrevQuantity(data.quantity);
    setQuantity(data.quantity);
    setSelected(data.quantity > 0);
  }
  if (prevSelectedColor !== data.selectedColor) {
    setPrevSelectedColor(data.selectedColor);
    setSelectedColor(data.selectedColor);
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
    if (next === 0) setSelected(false);
    setQuantity(next);
    onQuantityChange?.(data.id, next);
  };
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = quantity + 1;
    if (!selected) setSelected(true);
    setQuantity(next);
    onQuantityChange?.(data.id, next);
  };
  const handleCardClick = () => {
    if (!isSelected) {
      setSelected(true);
      setQuantity(1);
      onQuantityChange?.(data.id, 1);
    }
  };
  const handleColorSelect = (option: ColorOption) => {
    setSelectedColor(option.label);
    setCurrentImage(option.image);
    onColorChange?.(data.id, option.label);
  };
  const hasColors = data.colorOptions.length > 0;
  const hasDiscount = data.discount !== null && data.originalPrice !== null;
  return (
    <div
      className={`relative flex items-center gap-[19px] rounded-[10px] bg-white p-3 w-full cursor-pointer ${className}`}
      style={
        isSelected
          ? { border: "2px solid #4E2FD2B2" }
          : { border: "2px solid transparent" }
      }
      onClick={handleCardClick}
    >
      {hasDiscount && (
        <div
          className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: "#4E2FD2" }}
        >
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
          <h3 className="text-base font-semibold text-[#1F1F1F] leading-tight">
            {data.name}
          </h3>
          <p className="text-xs text-[#1F1F1FBF] font-medium mt-2 leading-snug">
            {data.description}
          </p>
          <a
            href={data.learnMoreUrl}
            className="text-xs font-medium text-[#0000EE] underline w-fit hover:text-[#0000EE]/80"
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
                  onClick={() => handleColorSelect(option)}
                  className={`flex items-center gap-0.5 rounded-[2px] border-[0.5px] px-[5px] py-px text-xs font-medium transition-colors duration-300 ${
                    isColorSelected
                      ? "border-[#0AA288] bg-[#1DF0BB0A] text-[#1F1F1F]"
                      : "border-[#CCCCCC] bg-white text-[#1F1F1F] hover:border-[#0AA288]"
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
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: quantity === 0 ? "2px solid #E6EBF0" : "none",
                background: quantity === 0 ? "transparent" : "#F0F4F7",
                color: quantity === 0 ? "#E6EBF0" : "#525963",
                cursor: quantity === 0 ? "not-allowed" : "pointer",
                fontSize: 16,
                lineHeight: 1,
                flexShrink: 0,
                padding: 0,
              }}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-5 text-center text-[14px] font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                background: "#F0F4F7",
                color: "#525963",
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
                flexShrink: 0,
                padding: 0,
              }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <div className="flex flex-col items-end">
            {hasDiscount && data.originalPrice !== null && (
              <span className="text-base text-[#D8392B] font-normal line-through leading-tight">
                ${data.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-normal text-[#575757] leading-tight">
              ${data.salePrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
