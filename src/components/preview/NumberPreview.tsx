interface NumberPreviewProps {
  value?: number;
  onChange: (value: number) => void;
}

export const NumberPreview: React.FC<NumberPreviewProps> = ({ value, onChange }) => {
  return (
    <input
      type="number"
      className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:border-blue-500"
      value={value || ''}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder="Enter a number"
    />
  );
}; 