'use client'
import { QuestionType, FormQuestion } from '../types/form';
import { useState } from 'react';
import { ShortAnswer } from './questions/ShortAnswer';
import { LongAnswer } from './questions/LongAnswer';
import { SingleSelect } from './questions/SingleSelect';
import { Number } from './questions/Number';
import { URL } from './questions/URL';
import { QuestionMenu } from './QuestionMenu';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { BaseInput } from './shared/BaseInput';

interface QuestionBuilderProps {
  type: QuestionType;
  onCancel: () => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  question: FormQuestion;
  onQuestionChange: (question: Partial<FormQuestion>) => void;
}

interface BaseQuestionProps {
  isPreview?: boolean;
}

interface SingleSelectQuestionProps extends BaseQuestionProps {
  options: string[];
  setOptions: (options: string[]) => void;
}

interface BaseQuestionType<T extends BaseQuestionProps = BaseQuestionProps> {
  component: React.ComponentType<T>;
}

interface SingleSelectType extends BaseQuestionType<SingleSelectQuestionProps> {
  isCustom: true;
  type: 'single-select';
}

interface OtherCustomType extends BaseQuestionType<BaseQuestionProps> {
  isCustom: true;
  type: 'other';
}

interface StandardQuestionType extends BaseQuestionType<BaseQuestionProps> {
  type: 'text' | 'number' | 'url';
  placeholder: string;
}

type QuestionVariant = 'SINGLE_SELECT' | 'SHORT_ANSWER' | 'LONG_ANSWER' | 'NUMBER' | 'URL';

type QuestionTypeConfig = Record<QuestionVariant, SingleSelectType | OtherCustomType | StandardQuestionType>;

const QUESTION_TYPES: QuestionTypeConfig = {
  SINGLE_SELECT: {
    component: SingleSelect,
    isCustom: true,
    type: 'single-select'
  },
  LONG_ANSWER: {
    component: LongAnswer,
    isCustom: true,
    type: 'other'
  },
  SHORT_ANSWER: {
    component: ShortAnswer,
    type: 'text',
    placeholder: 'Short answer text'
  },
  NUMBER: {
    component: Number,
    type: 'number',
    placeholder: 'Number input'
  },
  URL: {
    component: URL,
    type: 'url',
    placeholder: 'URL input'
  }
};

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({ 
  type, 
  onCancel,
  dragHandleProps,
  question,
  onQuestionChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleQuestionTextChange = (text: string) => {
    onQuestionChange({ ...question, question: text });
  };

  const handleOptionsChange = (newOptions: string[]) => {
    onQuestionChange({ ...question, options: newOptions });
  };

  const handleTypeChange = (newType: QuestionVariant) => {
    onQuestionChange({
      ...question,
      type: newType,
      options: newType === 'SINGLE_SELECT' ? [''] : undefined,
    });
    setIsMenuOpen(false);
  };

  const getTypeIcon = (type: QuestionVariant) => {
    switch (type) {
      case 'SHORT_ANSWER':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case 'LONG_ANSWER':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        );
      case 'SINGLE_SELECT':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case 'NUMBER':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        );
      case 'URL':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
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
    <div className="bg-gray-00 border-gray-200 rounded-2xl border  p-4">
      <div className="space-y-4">
        {/* All controls in single line */}
        <div className="flex items-center gap-3">
          {/* Question input */}
          <input
            type="text"
            placeholder="Write a question"
            className="flex-1 text-sm font-semibold focus:outline-none bg-transparent leading-5 font-inter text-left underline-offset-[from-font] decoration-skip-ink-none placeholder:text-[#959DA5] text-[#0D0D0D]"
            value={question.question}
            onChange={(e) => handleQuestionTextChange(e.target.value)}
          />

          {/* Right side controls group */}
          <div className="flex items-center gap-2">
            {/* Question type selector */}
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
              <QuestionMenu
                isOpen={isMenuOpen}
                onSelect={handleTypeChange}
                currentType={type}
              />
            </div>

            {/* Drag handle */}
            {dragHandleProps && (
              <div
                {...dragHandleProps}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-md cursor-move"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="4" cy="4" r="1.5" />
                  <circle cx="12" cy="4" r="1.5" />
                  <circle cx="4" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                </svg>
              </div>
            )}

            {/* Cancel button */}
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

        {/* Question type specific components */}
        <div>
          {renderQuestionInput()}
        </div>
      </div>
    </div>
  );
}; 