'use client'
import { QuestionType, FormQuestion } from '../types/form';
import { useState, useEffect } from 'react';
import { useFormStore } from '../store/useFormStore';
import { ShortAnswer } from './questions/ShortAnswer';
import { LongAnswer } from './questions/LongAnswer';
import { SingleSelect } from './questions/SingleSelect';
import { QuestionMenu } from './QuestionMenu';

interface QuestionBuilderProps {
  type: QuestionType;
  onCancel: () => void;
}

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({ type, onCancel }) => {
  const addQuestion = useFormStore((state) => state.addQuestion);
  const removeSelectedType = useFormStore((state) => state.removeSelectedType);
  const addSelectedType = useFormStore((state) => state.addSelectedType);
  const existingQuestion = useFormStore((state) => 
    state.form.questions.find(q => q.type === type)
  );
  
  const [questionText, setQuestionText] = useState(existingQuestion?.question || '');
  const [options, setOptions] = useState<string[]>(
    existingQuestion?.options || ['']
  );
  const [questionId, setQuestionId] = useState(() => existingQuestion?.id || Date.now().toString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleTypeChange = (newType: QuestionType) => {
    // Remove the old question type from selectedTypes
    removeSelectedType(type);
    // Add the new question type
    addSelectedType(newType);
    
    // Reset question data
    setQuestionText('');
    setOptions(['']);
    
    // Generate new question ID
    const newQuestionId = Date.now().toString();
    setQuestionId(newQuestionId);
    
    // Add new empty question with new type
    addQuestion({
      id: newQuestionId,
      type: newType,
      question: '',
      options: newType === 'SINGLE_SELECT' ? [''] : undefined,
      sequence: 0
    });
    setIsMenuOpen(false);
  };

  const getTypeIcon = (type: QuestionType) => {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 group hover:bg-[#FAFBFC] transition-colors">
      <div className="space-y-4">
        {/* Top row with input and controls */}
        <div className="flex items-center gap-3">

          {/* Question input */}
          <input
            type="text"
            placeholder="Write a question"
            className="flex-1 text-lg font-medium focus:outline-none group-hover:bg-[#FAFBFC] transition-colors"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          {/* Controls group */}
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
          {type === 'SINGLE_SELECT' && (
            <SingleSelect 
              options={options}
              setOptions={setOptions}
            />
          )}
          {type === 'SHORT_ANSWER' && <ShortAnswer />}
          {type === 'LONG_ANSWER' && <LongAnswer />}
        </div>
      </div>
    </div>
  );
}; 