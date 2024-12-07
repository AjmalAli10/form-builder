'use client'
import { useEffect, useState } from 'react';
import { useFormStore } from '../../store/useFormStore';
import { FormHeader } from '../../components/FormHeader';
import { FormQuestion } from '../../types/form';
import { PreviewQuestion } from '../../components/preview/PreviewQuestion';
import { LoadingState } from '../../components/LoadingState';
import { useRouter } from 'next/navigation';

export default function PreviewPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useFormStore((state) => state.form);
  const updateAnswer = useFormStore((state) => state.updateAnswer);
  const submitForm = useFormStore((state) => state.submitForm);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingState />;
  }

  const calculateCompletion = () => {
    const validQuestions = form.questions.filter(q => q.question.trim());
    const totalQuestions = validQuestions.length;
    if (totalQuestions === 0) return 0;
    
    const answeredQuestions = validQuestions.filter((q: FormQuestion) => q.answer).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };


  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setShowSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/submissions');
      submitForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasQuestions = form.questions.length > 0;
  const hasAnswers = form.questions.some(q => q.answer);
  const completion = calculateCompletion();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-md shadow-sm">
          Form submitted successfully!
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="flex md:flex-row flex-col md:items-center justify-between mb-6">
            <FormHeader isPreview />
            <div className="flex flex-col items-end gap-1">
              <p className="font-inter text-[14px] font-normal leading-5 text-left text-[#0D0D0D] underline-offset-[from-font] decoration-skip-ink-none">
                Form completeness — {completion}%
              </p>
              <div className="md:w-72 w-full h-1 bg-gray-200 rounded-full">
                <div
                  className="h-1 bg-green-500 rounded-full transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>

          {hasQuestions && (
            <>
              <div>
                {form.questions
                  .slice()
                  .sort((a, b) => a.sequence - b.sequence)
                  .map((question: FormQuestion) => (
                    <div key={`question-${question.id}`} className="mb-6">
                      <PreviewQuestion
                        question={question}
                        onChange={(value) => updateAnswer(question.id, value)}
                      />
                    </div>
                  ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!hasAnswers || isSubmitting}
                  className={`h-8 px-4 py-1.5 rounded-xl flex items-center gap-2.5 shadow-[0px_12px_12px_-6px_#00000008,0px_6px_6px_-3px_#00000008,0px_3px_3px_-1.5px_#00000008] ${
                    hasAnswers && !isSubmitting
                      ? 'bg-[#00AA45] hover:bg-[#009E40] text-white' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 