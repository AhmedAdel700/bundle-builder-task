import type { ProductCardData } from "../components/ProductCard";

export interface ReviewLineItem {
  lineId: string;
  productId: string;
  name: string;
  color: string | null;
  quantity: number;
  image: string;
  originalPrice: number | null;
  salePrice: number;
}

export function initVariantQuantities(item: ProductCardData): ProductCardData {
  if (item.colorOptions.length === 0) return item;

  const variantQuantities = { ...(item.variantQuantities ?? {}) };
  for (const option of item.colorOptions) {
    if (variantQuantities[option.label] === undefined) {
      variantQuantities[option.label] = 0;
    }
  }

  const activeColor = item.selectedColor ?? item.colorOptions[0]?.label ?? null;
  const quantity =
    activeColor !== null ? (variantQuantities[activeColor] ?? 0) : item.quantity;

  return { ...item, variantQuantities, selectedColor: activeColor, quantity };
}

export function getActiveQuantity(item: ProductCardData): number {
  if (item.colorOptions.length > 0 && item.selectedColor) {
    return item.variantQuantities?.[item.selectedColor] ?? 0;
  }
  return item.quantity;
}

export function getTotalQuantity(item: ProductCardData): number {
  if (item.colorOptions.length > 0) {
    return Object.values(item.variantQuantities ?? {}).reduce(
      (sum, qty) => sum + qty,
      0,
    );
  }
  return item.quantity;
}

export function countSelectedProducts(items: ProductCardData[]): number {
  return items.filter((item) => getTotalQuantity(item) > 0).length;
}

export function getReviewLines(items: ProductCardData[]): ReviewLineItem[] {
  const lines: ReviewLineItem[] = [];

  for (const item of items) {
    if (item.colorOptions.length === 0) {
      if (item.quantity > 0) {
        lines.push({
          lineId: item.id,
          productId: item.id,
          name: item.name,
          color: null,
          quantity: item.quantity,
          image: item.image,
          originalPrice: item.originalPrice,
          salePrice: item.salePrice,
        });
      }
      continue;
    }

    for (const option of item.colorOptions) {
      const quantity = item.variantQuantities?.[option.label] ?? 0;
      if (quantity <= 0) continue;

      lines.push({
        lineId: `${item.id}-${option.label}`,
        productId: item.id,
        name: item.name,
        color: option.label,
        quantity,
        image: option.image,
        originalPrice: item.originalPrice,
        salePrice: item.salePrice,
      });
    }
  }

  return lines;
}

export function mergeSavedItem(
  base: ProductCardData,
  saved: ProductCardData,
): ProductCardData {
  let merged = initVariantQuantities({
    ...base,
    quantity: saved.quantity,
    selectedColor: saved.selectedColor,
    variantQuantities: saved.variantQuantities,
  });

  if (
    !saved.variantQuantities &&
    saved.quantity > 0 &&
    saved.selectedColor &&
    base.colorOptions.length > 0
  ) {
    merged = {
      ...merged,
      variantQuantities: {
        ...merged.variantQuantities,
        [saved.selectedColor]: saved.quantity,
      },
      quantity: getActiveQuantity({
        ...merged,
        selectedColor: saved.selectedColor,
        variantQuantities: {
          ...merged.variantQuantities,
          [saved.selectedColor]: saved.quantity,
        },
      }),
    };
  }

  return merged;
}
