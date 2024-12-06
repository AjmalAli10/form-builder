'use client'
import { useFormStore } from '../../store/useFormStore';
import { QuestionBuilder } from '../../components/QuestionBuilder';
import { FormHeader } from '../../components/FormHeader';
import { InputTypeDropdown } from '../../components/InputTypeDropdown';
import { LoadingState } from '../../components/LoadingState';
import { useEffect, useState } from 'react';
import { QuestionType } from '../../types/form';
import { useRouter } from 'next/navigation';

export default function FormBuilder() {
  const [isHydrated, setIsHydrated] = useState(false);
  const form = useFormStore((state) => state.form);
  const builderState = useFormStore((state) => state.builderState);
  const setBuilderState = useFormStore((state) => state.setBuilderState);
  const saveDraft = useFormStore((state) => state.saveDraft);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingState />;
  }

  const handleTypeSelect = (type: QuestionType) => {
    console.log('Adding new question type:', type);
    setBuilderState({ 
      selectedTypes: [...builderState.selectedTypes, type],
      isDropdownOpen: false 
    });
  };

  const handleCancel = (typeToRemove: QuestionType) => {
    setBuilderState({
      selectedTypes: builderState.selectedTypes.filter(type => type !== typeToRemove)
    });
  };

  const toggleDropdown = () => {
    setBuilderState({ 
      isDropdownOpen: !builderState.isDropdownOpen 
    });
  };

  const handleSaveAsDraft = () => {
    if (form.questions.length > 0) {
      saveDraft();
      alert('Form saved as draft');
    } else {
      alert('Add at least one question before saving');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <FormHeader />

      <div className="space-y-6">
        {form.questions.map((question) => (
          <div key={question.id} className="p-4 border rounded-lg">
            <p className="font-medium">{question.question}</p>
            <p className="text-sm text-gray-500">Type: {question.type}</p>
          </div>
        ))}

        <div className="space-y-4">
          {builderState.selectedTypes.map((type, index) => (
            <QuestionBuilder
              key={index}
              type={type}
              onCancel={() => handleCancel(type)}
            />
          ))}

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full py-4 px-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Question
            </button>
            <InputTypeDropdown
              isOpen={builderState.isDropdownOpen}
              onSelect={handleTypeSelect}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button 
          onClick={handleSaveAsDraft}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save as Draft
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => router.push('/preview')}
        >
          Publish form
        </button>
      </div>
    </div>
  );
} 