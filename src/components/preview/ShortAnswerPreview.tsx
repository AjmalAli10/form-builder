import { BaseInput } from '../shared/BaseInput';

interface ShortAnswerPreviewProps {
  value?: string;
  onChange: (value: string) => void;
}

export const ShortAnswerPreview: React.FC<ShortAnswerPreviewProps> = ({ value, onChange }) => {
  return (
    <BaseInput 
      type="text" 
      placeholder="Type your answer here" 
      value={value} 
      onChange={onChange} 
      isPreview={true}
    />
  );
}; 