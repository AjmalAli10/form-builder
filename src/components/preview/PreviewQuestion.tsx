import React from 'react';
import { FormQuestion } from '../../types/form';
import { ShortAnswerPreview } from './ShortAnswerPreview';
import { LongAnswerPreview } from './LongAnswerPreview';
import { SingleSelectPreview } from './SingleSelectPreview';
import { URLPreview } from './URLPreview';
import { NumberPreview } from './NumberPreview';

interface PreviewQuestionProps {
  question: FormQuestion;
  onAnswer: (answer: string | number) => void;
}

export const PreviewQuestion: React.FC<PreviewQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'SHORT_ANSWER':
        return <ShortAnswerPreview value={question.answer as string} onChange={onAnswer} />;
      case 'LONG_ANSWER':
        return <LongAnswerPreview value={question.answer as string} onChange={onAnswer} />;
      case 'SINGLE_SELECT':
        return <SingleSelectPreview options={question.options || []} value={question.answer as string} onChange={onAnswer} />;
      case 'NUMBER':
        return <NumberPreview value={question.answer as number} onChange={onAnswer} />;
      case 'URL':
        return <URLPreview value={question.answer as string} onChange={onAnswer} />;
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