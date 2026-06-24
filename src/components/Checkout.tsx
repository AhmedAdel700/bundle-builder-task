import ReviewHeader from "./ReviewHeader";
import SectionLabel from "./SectionLabel";
import ProductItem from "./ProductItem";
import Badge from "../assets/Badge.svg";
import Truck from "../assets/delivery.svg";
import type { ReviewLineItem } from "../utils/productHelpers";

interface CheckoutProps {
  reviewLines: ReviewLineItem[];
  onCheckout: () => void;
  onSave: () => void;
  onQuantityChange: (
    id: string,
    quantity: number,
    color?: string | null,
  ) => void;
}

export default function Checkout({
  reviewLines,
  onCheckout,
  onSave,
  onQuantityChange,
}: CheckoutProps) {
  const originalTotal = reviewLines.reduce(
    (sum, line) =>
      sum + (line.originalPrice ?? line.salePrice) * line.quantity,
    0,
  );
  const saleTotal = reviewLines.reduce(
    (sum, line) => sum + line.salePrice * line.quantity,
    0,
  );
  const savings = originalTotal - saleTotal;

  const hasItems = reviewLines.length > 0;

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-6 h-fit bg-bg-light rounded-[10px] py-3.75 px-5 flex flex-col gap-2.5">
        <ReviewHeader />

        <div className="border-t border-border-subtle flex flex-col">
          {reviewLines.length > 0 && (
            <>
              <SectionLabel label="Cameras" />
              <div className="divide-y divide-(--color-border-subtle)">
                {reviewLines.map((line) => (
                  <ProductItem
                    key={line.lineId}
                    name={
                      line.color ? `${line.name} (${line.color})` : line.name
                    }
                    quantity={line.quantity}
                    image={line.image}
                    originalPrice={
                      line.originalPrice !== null
                        ? `$${(line.originalPrice * line.quantity).toFixed(2)}`
                        : undefined
                    }
                    discountedPrice={`$${(line.salePrice * line.quantity).toFixed(2)}`}
                    onIncrement={() =>
                      onQuantityChange(
                        line.productId,
                        line.quantity + 1,
                        line.color,
                      )
                    }
                    onDecrement={() =>
                      onQuantityChange(
                        line.productId,
                        Math.max(0, line.quantity - 1),
                        line.color,
                      )
                    }
                  />
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between items-center pt-3 border-t my-2 border-[#CED6DE]">
            <div className="flex items-center gap-3">
              <div className="w-[41px] h-[41px] rounded-[5px] bg-white flex flex-col justify-center items-center shrink-0">
                <img src={Truck} className="w-[29px] h-[29px] object-contain" />
              </div>
              <h5 className="text-text-secondary text-sm font-medium">Fast Shipping</h5>
            </div>

            <div className="flex flex-col">
              <span className="text-text-light text-sm font-medium line-through">$5.99</span>
              <span className="text-primary text-sm font-semibold">FREE</span>
            </div>
          </div>

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
                <div className="bg-primary py-[5px] px-2 rounded-[3px] font-medium text-xs mx-auto text-white">
                  as low as ${(saleTotal / 12).toFixed(2)}/mo
                </div>
              )}

              <div className="flex items-center gap-2">
                {hasItems && originalTotal > saleTotal && (
                  <h5 className="text-text-light text-lg font-medium line-through">
                    ${originalTotal.toFixed(2)}
                  </h5>
                )}
                <h5 className="font-semibold text-2xl text-primary">
                  ${saleTotal.toFixed(2)}
                </h5>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2">
            {hasItems && savings > 0 && (
              <p className="text-accent-teal text-xs font-semibold text-center">
                Congrats! You're saving ${savings.toFixed(2)} on your security
                bundle!
              </p>
            )}

            <button
              onClick={onCheckout}
              className="bg-primary hover:brightness-90 duration-300 transition-all font-semibold text-lg rounded-sm text-white h-[48px] w-full"
            >
              Checkout
            </button>

            <button
              onClick={onSave}
              className="underline text-gray-600 text-sm font-normal text-center italic hover:text-primary transition-colors duration-300"
            >
              Save my system for later
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
