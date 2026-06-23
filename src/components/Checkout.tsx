import ReviewHeader from "./ReviewHeader";
import SectionLabel from "./SectionLabel";
import ProductItem from "./ProductItem";
import PlanItem from "./PlanItem";

const ShieldIcon = () => (
  <div className="w-10 h-10 bg-[#3B6AE8] rounded-md flex items-center justify-center">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L3 6v5c0 4 3.1 7.7 7 8.9C13.9 18.7 17 15 17 11V6L10 2z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  </div>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect
      x="1"
      y="7"
      width="12"
      height="8"
      rx="1"
      stroke="#3B6AE8"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M13 9h3l3 3v3h-6V9z"
      stroke="#3B6AE8"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="5" cy="16" r="1.5" fill="#3B6AE8" />
    <circle cx="15" cy="16" r="1.5" fill="#3B6AE8" />
  </svg>
);

export default function Checkout() {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-6 min-h-100 bg-[#EDF4FF] rounded-[10px] py-3.75 px-5 flex flex-col gap-2.5">
        <ReviewHeader />

        <div className="border-t border-[#CED6DE] flex flex-col">
          {/* CAMERAS */}
          <SectionLabel label="Cameras" />
          <div className="divide-y divide-[#CED6DE]">
            <ProductItem
              name="Wyze Cam v4"
              quantity={1}
              originalPrice="$35.98"
              discountedPrice="$27.98"
            />
            <ProductItem
              name="Wyze Cam Pan v3"
              quantity={2}
              originalPrice="$57.98"
              discountedPrice="$47.98"
            />
          </div>

          {/* SENSORS */}
          <div className="border-t border-[#CED6DE]">
            <SectionLabel label="Sensors" />
            <div className="divide-y divide-[#CED6DE]">
              <ProductItem
                name="Wyze Sense Motion Sensor"
                quantity={2}
                discountedPrice="$59.98"
              />
              <ProductItem
                name="Wyze Sense Hub (Required)"
                quantity={1}
                originalPrice="$29.92"
                discountedPrice="FREE"
                isFree
              />
            </div>
          </div>

          {/* ACCESSORIES */}
          <div className="border-t border-[#CED6DE]">
            <SectionLabel label="Accessories" />
            <div className="divide-y divide-[#CED6DE]">
              <ProductItem
                name="Wyze MicroSD Card (256GB)"
                quantity={2}
                discountedPrice="$41.96"
              />
            </div>
          </div>

          {/* PLAN */}
          <div className="border-t border-[#CED6DE]">
            <SectionLabel label="Plan" />
            <div className="divide-y divide-[#CED6DE]">
              <div className="flex items-center gap-3 py-3">
                <ShieldIcon />
                <span className="flex-1 text-sm font-medium text-[#3B6AE8]">
                  Cam Unlimited
                </span>
                <div className="text-right min-w-[64px]">
                  <p className="text-xs text-[#1F1F1FBF] line-through leading-none mb-0.5">
                    $12.99/mo
                  </p>
                  <p className="text-sm font-semibold leading-none text-[#3B6AE8]">
                    $9.99/mo
                  </p>
                </div>
              </div>

              <PlanItem
                icon={<TruckIcon />}
                name="Fast Shipping"
                originalPrice="$5.99"
                discountedPrice="FREE"
                priceColorClass="text-[#1F1F1F]"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
