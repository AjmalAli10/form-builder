import React from 'react';
import { QuestionType } from '../types/form';

interface InputTypeDropdownProps {
  onSelect: (type: QuestionType) => void;
  isOpen: boolean;
}

export const InputTypeDropdown: React.FC<InputTypeDropdownProps> = ({
  onSelect,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute mt-2 w-[292px] bg-white rounded-lg shadow-lg border overflow-hidden">
      <div className="h-9 px-4 py-2 flex items-center bg-[#FAFBFC] border-b">
        <p className="text-xs font-medium text-[#6E7781] uppercase">Input Types</p>
      </div>

      <div className="p-2 space-y-1">
        <button
          onClick={() => onSelect('SHORT_ANSWER')}
          className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center gap-3"
        >
          <span className="text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </span>
          Short answer
        </button>
        
        <button
          onClick={() => onSelect('LONG_ANSWER')}
          className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center gap-3"
        >
          <span className="text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </span>
          Long answer
        </button>
        
        <button
          onClick={() => onSelect('SINGLE_SELECT')}
          className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center gap-3"
        >
          <span className="text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
          Single select
        </button>
        
        <button
          onClick={() => onSelect('URL')}
          className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center gap-3"
        >
          <span className="text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </span>
          URL
        </button>
        
        <button
          onClick={() => onSelect('NUMBER')}
          className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center gap-3"
        >
          <span className="text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </span>
          Number
        </button>
      </div>
    </div>
  );
}; 
