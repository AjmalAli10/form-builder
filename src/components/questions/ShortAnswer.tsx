
interface ShortAnswerProps {
 questionText: string;
 setQuestionText: (value: string) => void;
  value?: string;
}

export const ShortAnswer: React.FC<ShortAnswerProps> = ({ questionText,setQuestionText }) => {
  return (
    <div className="space-y-2 w-full">
     <input
          type="text"
          placeholder="Write a question"
          className="w-full text-lg font-medium focus:outline-none"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nested input 1"
          className="w-full h-8 text-lg font-medium focus:outline-none border rounded-lg px-3 py-2 border-gray-200"
          // Add any necessary props or handlers for the nested input
        />

    </div>
  );
}; 