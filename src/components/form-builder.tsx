"use client";
import { useState } from "react";
import { useFormStore } from '@/store/useFormStore';
import { QuestionBuilder } from "./QuestionBuilder";
import { FormHeader } from "./FormHeader";
import { InputTypeDropdown } from "./InputTypeDropdown";
import { QuestionType } from "@/types/form";

export default function FormBuilder() {
  const { form } = useFormStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([]);
  console.log(form);
  const handleTypeSelect = (type: QuestionType) => {
    setSelectedTypes((prev) => [...prev, type]);
    setIsDropdownOpen(false);
  };

  const handleCancel = (type: QuestionType) => {
    setSelectedTypes((prev) => prev.filter((t) => t !== type));
  };
  return (
    <div className="w-full mx-auto py-8 px-4">
      <FormHeader />

      <div className="">
{selectedTypes.map((type, index) => (
          <QuestionBuilder
            key={index}
            type={type}
            onCancel={() => handleCancel(type)}
          />
        ))}

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full py-4 px-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center gap-2"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Question
          </button>
          <InputTypeDropdown
              isOpen={isDropdownOpen}
              onSelect={handleTypeSelect}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-2">
          Save as Draft
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Publish form
        </button>
      </div>
    </div>
  );
}
