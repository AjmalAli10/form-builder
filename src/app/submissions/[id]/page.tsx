'use client'

import { use } from 'react';
import { useFormStore } from '../../../store/useFormStore';
import { useRouter } from 'next/navigation';

export default function SubmissionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const submissions = useFormStore((state) => state.submissions);
  const submission = submissions.find(s => s.id === id);

  if (!submission) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">Submission not found</p>
          <button
            onClick={() => router.push('/submissions')}
            className="mt-4 px-4 py-2 text-sm text-blue-500 hover:bg-blue-50 rounded-md"
          >
            Back to Submissions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-[#0D0D0D]">{submission.title || 'Untitled Form'}</h1>
              <p className="text-sm text-gray-500 mt-1">
                Submitted on {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <button
              onClick={() => router.push('/submissions')}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-2"
            >
              Back to Submissions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {submission.questions.map((question, index) => (
              <div key={question.id} className="p-4 border border-[#E1E4E8] rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0D0D0D] mb-2">
                      {index + 1}. {question.question}
                    </p>
                    <div className="text-sm text-gray-600">
                      {question.type === 'SINGLE_SELECT' ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            {question.answer === question.options?.[0] && (
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                            )}
                          </span>
                          <span>{question.answer}</span>
                        </div>
                      ) : (
                        <p>{question.answer || 'No answer provided'}</p>
                      )}
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">
                    {question.type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 