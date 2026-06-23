import Checkout from "../components/Checkout";

export default function BundleBuilder() {
  return (
    <main className="mx-auto container max-w-6xl p-4 md:p-6 lg:p-0 lg:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Side */}
        <section className="min-h-screen rounded-xl bg-blue-100 p-6 lg:col-span-2">
          Builder Section
        </section>

        {/* Right Side */}
        <Checkout />
      </div>
    </main>
  );
}
