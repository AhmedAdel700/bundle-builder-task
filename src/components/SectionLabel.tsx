interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <p className="uppercase text-[10px] font-semibold text-[#484848] tracking-wide pt-3 pb-1">
      {label}
    </p>
  );
}
