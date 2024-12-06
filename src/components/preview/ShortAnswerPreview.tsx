interface ShortAnswerPreviewProps {
  value?: string;
  onChange: (value: string) => void;
}

export const ShortAnswerPreview: React.FC<ShortAnswerPreviewProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:border-blue-500"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer here"
    />
  );
}; 