interface NumberPreviewProps {
  value?: number;
  onChange: (value: number) => void;
}

export const NumberPreview: React.FC<NumberPreviewProps> = ({ value, onChange }) => {
  return (
    <input
      type="number"
      className="w-full h-8 px-2 py-1.5 border border-[#E1E4E8] rounded-lg bg-white shadow-[0px_1px_1px_-0.5px_#00000008] focus:outline-none text-sm font-semibold leading-5 text-left text-[#0D0D0D] underline-offset-[from-font] decoration-skip-ink-none placeholder:text-[#959DA5] gap-2.5"
      value={value || ''}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder="Enter a number"
    />
  );
}; 