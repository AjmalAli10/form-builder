import React from 'react';
import { useFormStore } from '../store/useFormStore';

export const QuestionList: React.FC = () => {
  const { questions } = useFormStore((state) => state.form);
  const removeQuestion = useFormStore((state) => state.removeQuestion);

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div
          key={question.id}
          className="p-4 border rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{question.question}</p>
            <p className="text-sm text-gray-500">Type: {question.type}</p>
          </div>
          
          <button
            onClick={() => removeQuestion(question.id)}
            className="px-3 py-1 text-red-500 hover:bg-red-50 rounded-md"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}; 