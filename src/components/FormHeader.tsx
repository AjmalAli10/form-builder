import React from 'react';
import { useFormStore } from '../store/useFormStore';
import { useRouter } from 'next/navigation';

interface FormHeaderProps {
  isPreview?: boolean;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ isPreview }) => {
  const { form, setTitle } = useFormStore();
  const router = useRouter();

  const handleNavigation = () => {
    if (isPreview) {
      router.push('/form-builder');
    } else {
      router.push('/preview');
    }
  };

  const hasQuestions = form.questions.length > 0;

  return (
    <div className="w-full flex items-center justify-between border-b pb-4 mb-6">
      <input
        type="text"
        placeholder="Untitled form"
        className="w-full px-3 py-2 text-base font-semibold leading-[22px] text-left text-[#0D0D0D] underline-offset-[from-font] decoration-skip-ink-none focus:outline-none focus:border-b-2 focus:border-blue-500 placeholder:text-[#959DA5] font-inter"
        value={form.title}
        onChange={(e) => setTitle(e.target.value)}
        readOnly={isPreview}
      />
      
      <button
        className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 ${
          !isPreview && !hasQuestions 
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={handleNavigation}
        disabled={!isPreview && !hasQuestions}
      >
        {isPreview ? 'Back to Editor' : 'Preview'}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </button>
    </div>
  );
}; 