import Checkout from "../components/Checkout";
import ProductsArea from "../components/ProductsArea";

export default function BundleBuilder() {
  return (
    <main className="mx-auto container max-w-[1350px] p-4 md:p-6 lg:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Side */}
        <section className="min-h-screen bg-[#EDF4FF] rounded-[10px] p-6 lg:col-span-2">
          <ProductsArea />
        </section>

        {/* Right Side */}
        <Checkout />
      </div>
    </main>
  );
}
