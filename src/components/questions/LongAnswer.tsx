

interface LongAnswerProps {
    questionText: string;
    setQuestionText: (value: string) => void;
     value?: string;
   }

export const LongAnswer: React.FC<LongAnswerProps> = ({ questionText,setQuestionText }) => {
    return (
        <div className="space-y-2 w-full">
         <input
              type="text"
              placeholder="Write a question"
              className="w-full text-lg font-medium focus:outline-none"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
    
          <textarea 
            name="textarea"
            className='w-full px-3 py-2 border rounded-lg border-gray-200' 
            rows={5} 
            cols={30} 
            minLength={10} 
            maxLength={20}
          >
          </textarea>
    
        </div>
      );
}; 