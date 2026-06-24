"use client";

import React, { useState } from "react";
import type { ProductCardData } from "./ProductCard";
import ProductCard from "./ProductCard";

function CameraIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function PlanIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function SensorIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function ExtraIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function AccordionArrow({ open }: { open: boolean }) {
  return (
    <span
      style={{
        fontSize: 10,
        color: "#4E2FD2",
        display: "inline-block",
        transition: "transform 0.3s ease",
        transform: open ? "rotate(0deg)" : "rotate(180deg)",
        lineHeight: 1,
      }}
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
    <div style={{ marginBottom: isOpen ? 8 : 0 }}>
      {/* Step label — always outside, full width, no padding effect */}
      <div
        style={{
          borderTop: "1px solid #1F1F1F",
          paddingTop: 8,
          paddingBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "#8A94A6",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
          }}
        >
          STEP {step.id} OF {totalSteps}
        </span>
      </div>

      {/* Accordion body — bordered box when open, plain when closed */}
      <div
        style={{
          backgroundColor: isOpen ? "#EDF4FF" : "transparent",
          border: isOpen ? "1px solid #4E2FD2" : "none",
          borderRadius: isOpen ? 10 : 0,
          padding: isOpen ? "12px 16px 16px 16px" : "0 0 10px 0",
          transition:
            "background-color 0.3s ease, border 0.2s ease, border-radius 0.3s ease, padding 0.3s ease",
        }}
      >
        {/* Header row */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 text-left"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Icon */}
          <span
            style={{
              color: isOpen ? "#4E2FD2" : "#8A94A6",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {step.icon}
          </span>

          {/* Title */}
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: isOpen ? "#1F1F1F" : "#6B7280",
              flex: 1,
              lineHeight: 1.2,
              display: "flex",
              alignItems: "center",
            }}
          >
            {step.title}
          </span>

          {/* Selected badge + Arrow */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            {(step.selectedCount ?? 0) > 0 && (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#4E2FD2",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {step.selectedCount} selected
              </span>
            )}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 20,
              }}
            >
              <AccordionArrow open={isOpen} />
            </span>
          </span>
        </button>

        {/* Collapsible content */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: isOpen ? "2000px" : "0px",
            transition: "max-height 0.4s ease",
          }}
        >
          <div style={{ paddingTop: 16, paddingBottom: 8 }}>{step.content}</div>
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 justify-center">
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

      {/* Next button */}
      <div className="flex justify-center mt-6">
        <button
          style={{
            background: "transparent",
            border: "2px solid #4E2FD2",
            color: "#4E2FD2",
            borderRadius: 8,
            padding: "12px 32px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#4E2FD2";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#4E2FD2";
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
    <div style={{ color: "#8A94A6", fontSize: 14, padding: "8px 0" }}>
      {label} options coming soon.
    </div>
  );
}

interface ProductsAreaProps {
  items: ProductCardData[];
  onQuantityChange: (id: string, quantity: number) => void;
  onColorChange: (id: string, color: string) => void;
}

export default function ProductsArea({
  items,
  onQuantityChange,
  onColorChange,
}: ProductsAreaProps) {
  const [openStep, setOpenStep] = useState<number>(1);

  const selectedCameraCount = items.filter((i) => i.quantity > 0).length;

  const steps: AccordionStep[] = [
    {
      id: 1,
      title: "Choose your cameras",
      icon: <CameraIcon size={22} />,
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
      icon: <PlanIcon size={22} />,
      selectedCount: 0,
      content: <PlaceholderContent label="Plan" />,
    },
    {
      id: 3,
      title: "Choose your sensors",
      icon: <SensorIcon size={22} />,
      selectedCount: 0,
      content: <PlaceholderContent label="Sensor" />,
    },
    {
      id: 4,
      title: "Add extra protection",
      icon: <ExtraIcon size={22} />,
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