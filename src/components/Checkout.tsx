import ReviewHeader from "./ReviewHeader";
import SectionLabel from "./SectionLabel";
import ProductItem from "./ProductItem";
import Badge from "../assets/Badge.svg";
import type { ProductCardData } from "./ProductCard";

interface CheckoutProps {
  selectedItems: ProductCardData[];
  onCheckout: () => void;
  onSave: () => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export default function Checkout({
  selectedItems,
  onCheckout,
  onSave,
  onQuantityChange,
}: CheckoutProps) {
  const originalTotal = selectedItems.reduce(
    (sum, item) => sum + (item.originalPrice ?? item.salePrice) * item.quantity,
    0
  );
  const saleTotal = selectedItems.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );
  const savings = originalTotal - saleTotal;

  const hasItems = selectedItems.length > 0;

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-6 h-fit bg-[#EDF4FF] rounded-[10px] py-3.75 px-5 flex flex-col gap-2.5">
        <ReviewHeader />

        <div className="border-t border-[#CED6DE] flex flex-col">
          {selectedItems.length > 0 && (
            <>
              <SectionLabel label="Cameras" />
              <div className="divide-y divide-[#CED6DE]">
                {selectedItems.map((item) => {
                  const matchedColorOption = item.colorOptions?.find(
                    (opt) => opt.label === item.selectedColor
                  );
                  const displayImage = matchedColorOption ? matchedColorOption.image : item.image;

                  return (
                    <ProductItem
                      key={item.id}
                      name={`${item.name}${item.selectedColor ? ` (${item.selectedColor})` : ""}`}
                      quantity={item.quantity}
                      image={displayImage}
                      originalPrice={
                        item.originalPrice !== null
                          ? `$${(item.originalPrice * item.quantity).toFixed(2)}`
                          : undefined
                      }
                      discountedPrice={`$${(item.salePrice * item.quantity).toFixed(2)}`}
                      onIncrement={() => onQuantityChange(item.id, item.quantity + 1)}
                      onDecrement={() => onQuantityChange(item.id, Math.max(0, item.quantity - 1))}
                    />
                  );
                })}
              </div>
            </>
          )}

          {/* TOTALS */}
          <div className="flex justify-between items-center mt-2">
            <div className="h-[78px] w-[78px]">
              <img
                src={Badge}
                alt="Badge"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              {hasItems && (
                <div className="bg-[#4E2FD2] py-[5px] px-2 rounded-[3px] font-medium text-xs mx-auto text-white">
                  as low as ${(saleTotal / 12).toFixed(2)}/mo
                </div>
              )}

              <div className="flex items-center gap-2">
                {hasItems && originalTotal > saleTotal && (
                  <h5 className="text-[#6F7882] text-lg font-medium line-through">
                    ${originalTotal.toFixed(2)}
                  </h5>
                )}
                <h5 className="font-semibold text-2xl text-[#4E2FD2]">
                  ${saleTotal.toFixed(2)}
                </h5>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2">
            {hasItems && savings > 0 && (
              <p className="text-[#0AA288] text-xs font-semibold text-center">
                Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
              </p>
            )}

            <button
              onClick={onCheckout}
              className="bg-[#4E2FD2] hover:bg-[#3614c0] duration-300 transition-colors font-semibold text-lg rounded-sm text-white h-[48px] w-full"
            >
              Checkout
            </button>

            <button
              onClick={onSave}
              className="underline text-[#484848] text-sm font-normal text-center italic hover:text-[#4E2FD2] transition-colors duration-300"
            >
              Save my system for later
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
