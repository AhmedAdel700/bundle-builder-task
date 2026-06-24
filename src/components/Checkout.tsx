import ReviewHeader from "./ReviewHeader";
import SectionLabel from "./SectionLabel";
import ProductItem from "./ProductItem";
import PlanItem from "./PlanItem";
import TruckIcon from "../assets/delivery.svg";
import Unlimited from "../assets/unlimited.svg";
import product1 from "../assets/WyzeCamv4-white.svg";
import Badge from "../assets/Badge.svg";

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
              image={product1}
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
              <div className="flex items-center gap-0.5 py-3">
                <img src={Unlimited} alt="Unlimited" className="w-9 h-9" />
                <span className="flex-1 text-base font-semibold text-[#4E2FD2]">
                  <span className="text-black">Cam</span> Unlimited
                </span>
                <div className="text-right min-w-[64px]">
                  <p className="text-sm text-[#6F7882] line-through font-semibold leading-none mb-0.5">
                    $12.99/mo
                  </p>
                  <p className="text-sm font-semibold leading-none text-[#4E2FD2]">
                    $9.99/mo
                  </p>
                </div>
              </div>

              <PlanItem
                icon={TruckIcon}
                name="Fast Shipping"
                originalPrice="$5.99"
                discountedPrice="FREE"
                priceColorClass="text-[#1F1F1F]"
              />
            </div>
          </div>

          {/* SAVE */}
          <div className="flex justify-between items-center">
            <div className="h-[78px] w-[78px]">
              <img
                src={Badge}
                alt="Badge"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="bg-[#4E2FD2] py-[5px] px-2 rounded-[3px] font-medium text-xs mx-auto text-white">
                as low as $19.19/mo
              </div>

              <div className="flex items-center gap-2">
                <h5 className="text-[#6F7882] text-lg font-medium">$238.81</h5>
                <h5 className="font-semibold text-2xl text-[#4E2FD2]">
                  $187.89
                </h5>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2">
            <p className="text-[#0AA288] text-xs font-semibold text-center">
              Congrats! You’re saving $50.92 on your security bundle!
            </p>

            <button className="bg-[#4E2FD2] hover:bg-[#3614c0] duration-300 transition-colors font-semibold text-lg rounded-sm text-white h-[48px] w-full">
              Checkout
            </button>

            <button className="underline text-[#484848] text-sm font-normal text-center italic hover:text-[#4E2FD2] transition-colors duration-300">
              Save my system for later
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
