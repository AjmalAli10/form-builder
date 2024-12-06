"use client";
import { useState } from "react";
import { useFormStore } from '@/store/useFormStore';
import { QuestionBuilder } from "./QuestionBuilder";
import { FormHeader } from "./FormHeader";
import { InputTypeDropdown } from "./InputTypeDropdown";
import { QuestionType } from "@/types/form";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function FormBuilder() {
  const { selectedTypes } = useFormStore();
  const addSelectedType = useFormStore((state) => state.addSelectedType);
  const removeSelectedType = useFormStore((state) => state.removeSelectedType);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const saveDraft = useFormStore((state) => state.saveDraft);
  const loadDraft = useFormStore((state) => state.loadDraft);
  const drafts = useFormStore((state) => state.drafts);
  const [showDrafts, setShowDrafts] = useState(false);

  const handleTypeSelect = (type: QuestionType) => {
    addSelectedType(type);
    setIsDropdownOpen(false);
  };

  const handleCancel = (type: QuestionType) => {
    removeSelectedType(type);
  };

  const handlePublish = async () => {
    try {
      router.push('/preview');
    } catch (error) {
      console.error('Error publishing form:', error);
    }
  };

  const handleSaveAsDraft = () => {
    saveDraft();
    toast.success('Form saved as draft');
  };

  return (
    <div className="w-full mx-auto py-8 px-4">
      <FormHeader />

      <div className="space-y-4">
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
        <div className="relative">
          <button 
            onClick={handleSaveAsDraft}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-2"
          >
            <span>Save as Draft</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDrafts && drafts.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border">
              <div className="p-2">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Saved Drafts</h3>
                <div className="space-y-1">
                  {drafts.map((draft) => (
                    <button
                      key={draft.id}
                      onClick={() => {
                        loadDraft(draft.id);
                        setShowDrafts(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      {draft.title || 'Untitled Form'} - {new Date(Number(draft.id)).toLocaleDateString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={handlePublish}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Publish form
        </button>
      </div>
    </div>
  );
}
