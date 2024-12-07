import { QuestionType, FormQuestion } from '../types/form';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { BaseInput } from './shared/BaseInput';
import { QUESTION_TYPES } from '../lib/constants';
import { BaseQuestionProps } from '../lib/types';
import { useState } from 'react';
import { getTypeIcon } from '../lib/icons';

interface QuestionBuilderProps {
  question: FormQuestion;
  onQuestionChange: (question: FormQuestion) => void;
  onCancel: () => void;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  type: QuestionType;
  onTypeChange: (type: QuestionType) => void;
}

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  question,
  onQuestionChange,
  onCancel,
  dragHandleProps,
  type,
  onTypeChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOptionsChange = (newOptions: string[]) => {
    onQuestionChange({
      ...question,
      options: newOptions
    });
  };

  const renderQuestionInput = () => {
    const questionType = QUESTION_TYPES[type];
    if (!questionType) return null;

    if ('isCustom' in questionType) {
      if (questionType.type === 'single-select') {
        const Component = questionType.component;
        return (
          <Component 
            options={question.options || ['']}
            setOptions={handleOptionsChange}
          />
        );
      }
      const Component = questionType.component as React.ComponentType<BaseQuestionProps>;
      return <Component isPreview={false} />;
    }

    return (
      <BaseInput
        type={questionType.type}
        placeholder={questionType.placeholder}
        isPreview={false}
      />
    );
  };

  return (
    <div className="bg-white border border-[#E1E4E8] rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Write a question"
          className="flex-1 text-sm font-semibold focus:outline-none bg-transparent leading-5 font-inter text-left underline-offset-[from-font] decoration-skip-ink-none placeholder:text-[#959DA5] text-[#0D0D0D]"
          value={question.question}
          onChange={(e) => onQuestionChange({ ...question, question: e.target.value })}
        />

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-2"
            >
              <span className="text-gray-600">{getTypeIcon(type)}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-[292px] bg-white rounded-md shadow-lg border border-[#E1E4E8] z-50">

                  <div className="h-9 px-4 py-2 flex items-center text-xs font-medium text-[#6E7781] uppercase bg-[#FAFBFC] rounded-t-lg">
                    Input Types
                  </div>
                  <div className="space-y-1">
                    {['SHORT_ANSWER', 'LONG_ANSWER', 'SINGLE_SELECT', 'NUMBER', 'URL'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          onTypeChange(type as QuestionType);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2"
                      >
                        {getTypeIcon(type as QuestionType)}
                        {type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>

            )}
          </div>

          {dragHandleProps && (
            <div
              {...dragHandleProps}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-md cursor-move"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="4" cy="3" r="1.5" />
                <circle cx="12" cy="3" r="1.5" />
                <circle cx="4" cy="8" r="1.5" />
                <circle cx="12" cy="8" r="1.5" />
                <circle cx="4" cy="13" r="1.5" />
                <circle cx="12" cy="13" r="1.5" />
              </svg>
            </div>
          )}

          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {renderQuestionInput()}
    </div>
  );
}; 