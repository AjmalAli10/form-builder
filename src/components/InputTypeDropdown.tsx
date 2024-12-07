import React from 'react';
import { QuestionType } from '../types/form';
import { getTypeIcon } from '@/lib/icons';
import { DROPDOWN_STYLES, INPUT_TYPE_HEADER } from '@/lib/constants';
import { InputTypeDropdownProps } from '@/lib/types';

export const InputTypeDropdown: React.FC<InputTypeDropdownProps> = ({
  onSelect,
  isOpen,
  className = '',
}) => {
  if (!isOpen) return null;

  const formatTypeLabel = (type: string) => {
    return type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
  };

  const types: QuestionType[] = ['SHORT_ANSWER', 'LONG_ANSWER', 'SINGLE_SELECT', 'NUMBER', 'URL'];

  return (
    <div className={`${DROPDOWN_STYLES.container} ${className}`}>

        <div className={INPUT_TYPE_HEADER.className}>
          <p className={INPUT_TYPE_HEADER.textClassName}>{INPUT_TYPE_HEADER.text}</p>
        </div>


      <div className={DROPDOWN_STYLES.content}>
        <div className="space-y-1">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={DROPDOWN_STYLES.button}
            >
              <span className={DROPDOWN_STYLES.iconWrapper}>
                {getTypeIcon(type)}
              </span>
              {formatTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 
