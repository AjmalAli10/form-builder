interface URLPreviewProps {
  value?: string;
  onChange: (value: string) => void;
}

export const URLPreview: React.FC<URLPreviewProps> = ({ value, onChange }) => {
  return (
    <input
      type="url"
      className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:border-blue-500"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter URL (e.g., https://example.com)"
    />
  );
}; 