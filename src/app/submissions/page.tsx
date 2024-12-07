'use client'
import { useFormStore } from '../../store/useFormStore';
import { useRouter } from 'next/navigation';

export default function SubmissionsPage() {
  const router = useRouter();
  const submissions = useFormStore((state) => state.submissions);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-[#0D0D0D]">Submitted Forms</h1>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-2"
            >
              Create New Form
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E1E4E8]">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0D0D0D]">Form Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0D0D0D]">Questions</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0D0D0D]">Submitted At</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0D0D0D]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E4E8]">
                {submissions.length > 0 ? (
                  submissions.map((submission, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-[#0D0D0D]">{submission.title || 'Untitled Form'}</td>
                      <td className="px-4 py-3 text-sm text-[#0D0D0D]">{submission.questions.length}</td>
                      <td className="px-4 py-3 text-sm text-[#0D0D0D]">
                        {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => router.push(`/submissions/${submission.id}`)}
                          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No submissions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 