'use client'
import { useEffect, useState } from 'react';
import { useFormStore } from '../../store/useFormStore';
import { FormHeader } from '../../components/FormHeader';
import { FormQuestion } from '../../types/form';
import { PreviewQuestion } from '../../components/preview/PreviewQuestion';
import { LoadingState } from '../../components/LoadingState';

export default function PreviewPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const form = useFormStore((state) => state.form);
  const updateAnswer = useFormStore((state) => state.updateAnswer);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingState />;
  }

  const calculateCompletion = () => {
    const totalQuestions = form.questions.length;
    const answeredQuestions = form.questions.filter((q: FormQuestion) => q.answer).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', form);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <FormHeader isPreview />
          
          <div className="mb-4">
            <div className="h-1 bg-gray-200 rounded-full">
              <div
                className="h-1 bg-green-500 rounded-full transition-all"
                style={{ width: `${calculateCompletion()}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Form completeness — {calculateCompletion()}%
            </p>
          </div>

          <div className="space-y-6">
            {form.questions.map((question: FormQuestion) => (
              <PreviewQuestion
                key={question.id}
                question={question}
                onAnswer={(answer) => updateAnswer(question.id, answer)}
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
        </div>
      </div>
    </div>
  );
} 