'use client'
import { QuestionType, FormQuestion } from '../types/form';
import { useState, useEffect } from 'react';
import { useFormStore } from '../store/useFormStore';
import { ShortAnswer } from './questions/ShortAnswer';
import { LongAnswer } from './questions/LongAnswer';
import { SingleSelect } from './questions/SingleSelect';

interface QuestionBuilderProps {
  type: QuestionType;
  onCancel: () => void;
}

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({ type, onCancel }) => {
  const addQuestion = useFormStore((state) => state.addQuestion);
  const existingQuestion = useFormStore((state) => 
    state.form.questions.find(q => q.type === type)
  );
  
  const [questionText, setQuestionText] = useState(existingQuestion?.question || '');
  const [options, setOptions] = useState<string[]>(
    existingQuestion?.options || ['']
  );
  const questionId = useState(() => existingQuestion?.id || Date.now().toString())[0];

  // Auto-save when question text or options change
  useEffect(() => {
    if (questionText.trim()) {
      const newQuestion: Partial<FormQuestion> = {
        id: questionId,
        type,
        question: questionText,
        options: type === 'SINGLE_SELECT' ? options.filter(opt => opt.trim() !== '') : undefined,
        sequence: 0
      };
      addQuestion(newQuestion);
    }
  }, [questionText, options, type, questionId, addQuestion]);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="space-y-4">
        {type === 'SHORT_ANSWER' && (
          <ShortAnswer 
            questionText={questionText} 
            setQuestionText={setQuestionText} 
          />
        )}
        
        {type === 'LONG_ANSWER' && (
          <LongAnswer 
            questionText={questionText} 
            setQuestionText={setQuestionText} 
          />
        )}

        {type === 'SINGLE_SELECT' && (
          <SingleSelect 
            questionText={questionText}
            setQuestionText={setQuestionText}
            options={options}
            setOptions={setOptions}
          />
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}; 