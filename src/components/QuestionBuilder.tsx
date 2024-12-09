import { QuestionType, FormQuestion } from "../types/form";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { BaseInput } from "./shared/BaseInput";
import { QUESTION_TYPES } from "../lib/constants";
import { BaseQuestionProps } from "../lib/types";
import { useState } from "react";
import { getTypeIcon } from "../lib/icons";
import { InputTypeDropdown } from "./InputTypeDropdown";

interface QuestionBuilderProps {
  question: FormQuestion;
  onQuestionChange: (question: FormQuestion) => void;
  onCancel: () => void;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  type: QuestionType;
  onTypeChange: (type: QuestionType) => void;
  isPublishAttempted?: boolean;
}

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  question,
  onQuestionChange,
  onCancel,
  dragHandleProps,
  type,
  onTypeChange,
  isPublishAttempted = false
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOptionsChange = (newOptions: string[]) => {
    onQuestionChange({
      ...question,
      options: newOptions,
    });
  };

  const renderQuestionInput = () => {
    const questionType = QUESTION_TYPES[type];
    if (!questionType) return null;

    if ("isCustom" in questionType) {
      if (questionType.type === "single-select") {
        const Component = questionType.component;
        return (
          <Component
            options={question.options || [""]}
            setOptions={handleOptionsChange}
          />
        );
      }
      const Component =
        questionType.component as React.ComponentType<BaseQuestionProps>;
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
          className={`flex-1 text-sm font-semibold focus:outline-none bg-transparent leading-5 font-inter text-left underline-offset-[from-font] decoration-skip-ink-none ${
            isPublishAttempted && !question.question.trim() ? 'placeholder:text-[#EB5757]' : 'placeholder:text-[#959DA5]'
          } text-[#0D0D0D]`}
          value={question.question}
          onChange={(e) =>
            onQuestionChange({ ...question, question: e.target.value })
          }
        />

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-2"
            >
              <span className="text-gray-600">{getTypeIcon(type)}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <InputTypeDropdown
              isOpen={isMenuOpen}
              onSelect={(newType) => {
                onTypeChange(newType);
                setIsMenuOpen(false);
              }}
              className="right-0 top-full mt-1"
            />
          </div>

          {dragHandleProps && (
            <div
              {...dragHandleProps}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-md cursor-move"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.875 3H4.88029M4.875 8H4.88029M4.875 13H4.88029M11.5364 3H11.5417M11.5364 8H11.5417M11.5364 13H11.5417"
                  stroke="#0D0D0D"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {renderQuestionInput()}
    </div>
  );
};
