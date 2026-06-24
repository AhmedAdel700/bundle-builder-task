import { useState } from "react";
import Checkout from "../components/Checkout";
import ProductsArea from "../components/ProductsArea";
import type { ProductCardData } from "../components/ProductCard";
import products from "../data/data.json";
import {
  getReviewLines,
  initVariantQuantities,
  mergeSavedItem,
} from "../utils/productHelpers";

const STORAGE_KEY = "bundle-builder-saved";

function getInitialItems(): ProductCardData[] {
  const catalog = (products as ProductCardData[]).map((item) =>
    initVariantQuantities(item),
  );

  if (typeof window === "undefined") return catalog;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ProductCardData[];
      return catalog.map((base) => {
        const match = parsed.find((s) => s.id === base.id);
        return match ? mergeSavedItem(base, match) : base;
      });
    }
  } catch {
    // ignore
  }
  return catalog;
}

export default function BundleBuilder() {
  const [items, setItems] = useState<ProductCardData[]>(() => getInitialItems());
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string; type: "success" | "info" }>({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  const handleQuantityChange = (
    id: string,
    quantity: number,
    color?: string | null,
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (item.colorOptions.length > 0) {
          const activeColor =
            color ?? item.selectedColor ?? item.colorOptions[0]?.label;
          if (!activeColor) return item;

          const variantQuantities = {
            ...(item.variantQuantities ?? {}),
            [activeColor]: quantity,
          };

          return {
            ...item,
            variantQuantities,
            selectedColor: activeColor,
            quantity: variantQuantities[activeColor] ?? 0,
          };
        }

        return { ...item, quantity };
      }),
    );
  };

  const handleColorChange = (id: string, color: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          selectedColor: color,
          quantity: item.variantQuantities?.[color] ?? 0,
        };
      }),
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
    const reviewLines = getReviewLines(items);
    if (reviewLines.length === 0) {
      setModal({
        isOpen: true,
        title: "Empty Cart",
        message: "Please select at least one camera product from the list before checking out.",
        type: "info",
      });
      return;
    }

    const itemsSummary = reviewLines
      .map((line) => {
        const label = line.color ? `${line.name} (${line.color})` : line.name;
        return `• ${label} × ${line.quantity} — $${(line.salePrice * line.quantity).toFixed(2)}`;
      })
      .join("\n");

    const totalCost = reviewLines.reduce(
      (sum, line) => sum + line.salePrice * line.quantity,
      0,
    );

    setModal({
      isOpen: true,
      title: "Checkout Confirmation",
      message: `You are about to purchase the following setup:\n\n${itemsSummary}\n\nTotal Due: $${totalCost.toFixed(2)}`,
      type: "success",
    });
  };

  const reviewLines = getReviewLines(items);

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
          reviewLines={reviewLines}
          onCheckout={handleCheckout}
          onSave={handleSave}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-(--color-gray-400) overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {modal.type === "success" ? (
                  <div className="w-10 h-10 rounded-full bg-accent-teal-light flex items-center justify-center text-accent-teal font-bold text-xl">
                    ✓
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    i
                  </div>
                )}
                <h3 className="text-xl font-bold text-(--color-text-secondary)">{modal.title}</h3>
              </div>
              <div className="text-sm text-text-muted leading-relaxed whitespace-pre-line mb-6">
                {modal.message}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
                  className="bg-primary hover:brightness-90 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all shadow-md active:scale-95"
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