interface SingleSelectPreviewProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}

export const SingleSelectPreview: React.FC<SingleSelectPreviewProps> = ({
  options,
  value,
  onChange
}) => {
  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <label key={`${option}-${index}`} className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="radio"
            className="w-4 h-4 text-[#0D0D0D]"
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <span className="text-sm font-semibold leading-5 text-[#0D0D0D]">{option}</span>
        </label>
      ))}
    </div>
  );
}; 