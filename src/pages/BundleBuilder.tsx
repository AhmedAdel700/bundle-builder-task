import { useState } from "react";
import Checkout from "../components/Checkout";
import ProductsArea from "../components/ProductsArea";
import type { ProductCardData } from "../components/ProductCard";
import products from "../data/data.json";

const STORAGE_KEY = "bundle-builder-saved";

function getInitialItems(): ProductCardData[] {
  if (typeof window === "undefined") return products as ProductCardData[];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ProductCardData[];
      return (products as ProductCardData[]).map((base) => {
        const match = parsed.find((s) => s.id === base.id);
        return match ? { ...base, quantity: match.quantity, selectedColor: match.selectedColor } : base;
      });
    }
  } catch {
    // ignore
  }
  return products as ProductCardData[];
}

export default function BundleBuilder() {
  const [items, setItems] = useState<ProductCardData[]>(() => getInitialItems());
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string; type: "success" | "info" }>({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleColorChange = (id: string, color: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selectedColor: color } : item
      )
    );
  };

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setModal({
        isOpen: true,
        title: "System Saved",
        message: "Your setup has been successfully saved to your browser local storage! You can safely refresh the page.",
        type: "success",
      });
    } catch {
      setModal({
        isOpen: true,
        title: "Error",
        message: "Could not save your configuration. Please try again.",
        type: "info",
      });
    }
  };

  const handleCheckout = () => {
    const selected = items.filter((i) => i.quantity > 0);
    if (selected.length === 0) {
      setModal({
        isOpen: true,
        title: "Empty Cart",
        message: "Please select at least one camera product from the list before checking out.",
        type: "info",
      });
      return;
    }

    const itemsSummary = selected
      .map((i) => `• ${i.name} (${i.selectedColor || "Default"}) × ${i.quantity} — $${(i.salePrice * i.quantity).toFixed(2)}`)
      .join("\n");

    const totalCost = selected.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);

    setModal({
      isOpen: true,
      title: "Checkout Confirmation",
      message: `You are about to purchase the following setup:\n\n${itemsSummary}\n\nTotal Due: $${totalCost.toFixed(2)}`,
      type: "success",
    });
  };

  const selectedItems = items.filter((i) => i.quantity > 0);

  return (
    <main className="mx-auto container max-w-[1400px] p-4 md:p-6 lg:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <section className="min-h-screen rounded-[10px] lg:col-span-2">
          <ProductsArea
            items={items}
            onQuantityChange={handleQuantityChange}
            onColorChange={handleColorChange}
          />
        </section>

        <Checkout
          selectedItems={selectedItems}
          onCheckout={handleCheckout}
          onSave={handleSave}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {modal.type === "success" ? (
                  <div className="w-10 h-10 rounded-full bg-[#1DF0BB1A] flex items-center justify-center text-[#0AA288] font-bold text-xl">
                    ✓
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    i
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#1F1F1F]">{modal.title}</h3>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-6">
                {modal.message}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
                  className="bg-[#4E2FD2] hover:bg-[#3614c0] text-white px-5 py-2 rounded-lg font-medium text-sm transition-all shadow-md active:scale-95"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
