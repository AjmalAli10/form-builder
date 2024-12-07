import React from 'react';
import { FormQuestion } from '../../types/form';
import { ShortAnswerPreview } from './ShortAnswerPreview';
import { LongAnswerPreview } from './LongAnswerPreview';
import { SingleSelectPreview } from './SingleSelectPreview';
import { URLPreview } from './URLPreview';
import { NumberPreview } from './NumberPreview';

interface PreviewQuestionProps {
  question: FormQuestion;
  onChange: (value: string | number | string[]) => void;
}

export const PreviewQuestion: React.FC<PreviewQuestionProps> = ({
  question,
  onChange,
}) => {
  if (!question.question.trim()) {
    return null;
  }

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'SHORT_ANSWER':
        return <ShortAnswerPreview value={question.answer as string} onChange={onChange} />;
      case 'LONG_ANSWER':
        return <LongAnswerPreview value={question.answer as string} onChange={onChange} />;
      case 'SINGLE_SELECT':
        return <SingleSelectPreview options={question.options || []} value={question.answer as string} onChange={onChange} />;
      case 'NUMBER':
        return <NumberPreview value={question.answer as number} onChange={onChange} />;
      case 'URL':
        return <URLPreview value={question.answer as string} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <p className="font-medium">{question.question}</p>
      {question.description && (
        <p className="text-sm text-gray-600">{question.description}</p>
      )}
      {renderQuestionInput()}
    </div>
  );
}; 