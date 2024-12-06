interface SingleSelectPreviewProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}

export const SingleSelectPreview: React.FC<SingleSelectPreviewProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <label key={index} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="w-4 h-4 text-blue-500"
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}; 