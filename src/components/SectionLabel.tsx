interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <p className="uppercase text-xs font-normal text-[#A8B2BD] tracking-wide pt-3">
      {label}
    </p>
  );
}