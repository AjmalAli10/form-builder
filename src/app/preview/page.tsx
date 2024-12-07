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
  const form = useFormStore((state) => state.form);
  const updateAnswer = useFormStore((state) => state.updateAnswer);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingState />;
  }

  const calculateCompletion = () => {
    const totalQuestions = form.questions.length;
    if (totalQuestions === 0) return 0;
    
    const answeredQuestions = form.questions.filter((q: FormQuestion) => q.answer).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const handleSubmit = async () => {
    try {
      // Add API call here to submit form
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const hasQuestions = form.questions.length > 0;
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
          <div className="flex items-center justify-between mb-6">
            <FormHeader isPreview />
            <div className="flex flex-col items-end gap-1">
              <p className="font-inter text-[14px] font-normal leading-5 text-left text-[#0D0D0D] underline-offset-[from-font] decoration-skip-ink-none">
                Form completeness — {completion}%
              </p>
              <div className="w-72 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-1 bg-green-500 rounded-full transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>

          {hasQuestions ? (
            <>
              <div className="space-y-6">
                {form.questions
                  .slice()
                  .sort((a, b) => a.sequence - b.sequence)
                  .map((question: FormQuestion) => (
                    <PreviewQuestion
                      key={`question-${question.id}`}
                      question={question}
                      onChange={(value) => updateAnswer(question.id, value)}
                    />
                  ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No questions added yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 