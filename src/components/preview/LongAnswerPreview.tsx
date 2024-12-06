interface LongAnswerPreviewProps {
  value?: string;
  onChange: (value: string) => void;
}

export const LongAnswerPreview: React.FC<LongAnswerPreviewProps> = ({ value, onChange }) => {
  return (
    <textarea 
      name="textarea"
      className='w-full px-3 py-2 border rounded-lg border-gray-200' 
      rows={5} 
      cols={30} 
      minLength={10} 
      maxLength={20}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}; 