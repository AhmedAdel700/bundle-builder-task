"use client";

import React, { useState } from "react";
import type { ProductCardData } from "./ProductCard";
import ProductCard from "./ProductCard";
import { countSelectedProducts } from "../utils/productHelpers";
import livestream from "../../public/assets/livestream.svg";
import shield from "../../public/assets/shield.svg";
import remote from "../../public/assets/remote.svg";
import protection from "../../public/assets/protection.svg";

function AccordionArrow({ open }: { open: boolean }) {
  return (
    <span
      className={`text-sm -mt-2 inline-block transition-transform duration-300 leading-none ${
        open ? "rotate-0" : "rotate-180"
      }`}
      style={{ color: "var(--color-primary)" }}
    >
      ▲
    </span>
  );
}

interface AccordionStep {
  id: number;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  selectedCount?: number;
}

function AccordionItem({
  step,
  isOpen,
  onToggle,
  totalSteps,
}: {
  step: AccordionStep;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
  totalSteps: number;
}) {
  return (
    <div className="mb-6">
      {step.id !== 1 && (
        <>
          <span 
            className="text-xs font-medium tracking-wider uppercase"
            style={{ color: "var(--color-gray-600)" }}
          >
            STEP {step.id} OF {totalSteps}
          </span>
          <div 
            className="border-t-[0.5px] pt-2 pb-1"
            style={{ borderColor: "var(--color-border-dark)" }}
          ></div>
        </>
      )}

      <div
        className={`transition-all duration-300 ${
          isOpen
            ? "rounded-[10px] pt-3"
            : "py-4"
        }`}
        style={{
          backgroundColor: isOpen ? "var(--color-bg-light)" : "transparent",
          borderBottom: !isOpen ? "1px solid var(--color-border-dark)" : "none",
        }}
      >
        {step.id === 1 && (
          <>
            <span 
              className="text-xs font-medium tracking-wider uppercase p-4"
              style={{ color: "var(--color-gray-600)" }}
            >
              STEP {step.id} OF {totalSteps}
            </span>
            <div 
              className="border-t-[0.5px] pt-2 pb-1 mt-2"
              style={{ borderColor: "var(--color-border-transparent)" }}
            ></div>
          </>
        )}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 text-left bg-none border-none px-4 my-2"
        >
          <span className={`shrink-0`}>{step.icon}</span>

          <span
            className={`flex-1 font-semibold text-[22px] leading-[120%]`}
            style={{ color: "var(--color-text-primary)" }}
          >
            {step.title}
          </span>

          <span className="shrink-0 inline-flex gap-1.5">
            {(step.selectedCount ?? 0) > 0 && (
              <span 
                className="font-medium text-xs"
                style={{ color: "var(--color-primary)" }}
              >
                {step.selectedCount} selected
              </span>
            )}
            <span className="inline-flex items-center justify-center h-5">
              <AccordionArrow open={isOpen} />
            </span>
          </span>
        </button>

        <div
          style={{
            overflow: "hidden",
            maxHeight: isOpen ? "2000px" : "0px",
            transition: "max-height 0.4s ease",
          }}
        >
          <div className={step.id === 1 ? "pt-4 pb-2" : "pt-4 pb-2 px-4"}>{step.content}</div>
        </div>
      </div>
    </div>
  );
}

function CamerasContent({
  items,
  onQuantityChange,
  onColorChange,
}: {
  items: ProductCardData[];
  onQuantityChange: (id: string, qty: number) => void;
  onColorChange: (id: string, color: string) => void;
}) {
  return (
    <div>
      {/* Cards grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 justify-center px-4">
        {items.map((product, index) => (
          <ProductCard
            key={product.id}
            data={product}
            onQuantityChange={onQuantityChange}
            onColorChange={onColorChange}
            className={
              index === items.length - 1 && items.length % 2 !== 0
                ? "xl:col-span-2 xl:w-1/2 xl:mx-auto"
                : ""
            }
          />
        ))}
      </div>

      <div className="flex justify-center mt-6 mb-4">
        <button 
          className="w-full lg:w-[242px] h-[39px] px-6 py-1.25 font-semibold rounded-[7px] transition-colors duration-300 hover:text-white"
          style={{
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
            borderWidth: "1px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          Next: Choose your plan
        </button>
      </div>
    </div>
  );
}

function PlaceholderContent({ label }: { label: string }) {
  return (
    <div className="text-sm py-2" style={{ color: "var(--color-text-light)" }}>
      {label} options coming soon.
    </div>
  );
}

interface ProductsAreaProps {
  items: ProductCardData[];
  onQuantityChange: (id: string, quantity: number, color?: string | null) => void;
  onColorChange: (id: string, color: string) => void;
}

export default function ProductsArea({
  items,
  onQuantityChange,
  onColorChange,
}: ProductsAreaProps) {
  const [openStep, setOpenStep] = useState<number>(1);

  const selectedCameraCount = countSelectedProducts(items);

  const steps: AccordionStep[] = [
    {
      id: 1,
      title: "Choose your cameras",
      icon: <img src={livestream} className="w-[28px] h-[28px] object-cover" />,
      selectedCount: selectedCameraCount,
      content: (
        <CamerasContent
          items={items}
          onQuantityChange={onQuantityChange}
          onColorChange={onColorChange}
        />
      ),
    },
    {
      id: 2,
      title: "Choose your plan",
      icon: <img src={shield} className="w-[28px] h-[28px] object-cover" />,
      selectedCount: 0,
      content: <PlaceholderContent label="Plan" />,
    },
    {
      id: 3,
      title: "Choose your sensors",
      icon: <img src={remote} className="w-[28px] h-[28px] object-cover" />,
      selectedCount: 0,
      content: <PlaceholderContent label="Sensor" />,
    },
    {
      id: 4,
      title: "Add extra protection",
      icon: <img src={protection} className="w-[28px] h-[28px] object-cover" />,
      selectedCount: 0,
      content: <PlaceholderContent label="Extra protection" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {steps.map((step, idx) => (
        <AccordionItem
          key={step.id}
          step={step}
          isOpen={openStep === step.id}
          onToggle={() => setOpenStep(openStep === step.id ? 0 : step.id)}
          isLast={idx === steps.length - 1}
          totalSteps={steps.length}
        />
      ))}
    </div>
  );
}