interface SingleSelectProps {
  questionText: string;
  setQuestionText: (value: string) => void;
  options: string[];
  setOptions: (options: string[]) => void;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  questionText,
  setQuestionText,
  options,
  setOptions,
}) => {
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions.filter(opt => opt.trim() !== '')); // Auto-remove empty options
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Write a question"
        className="w-full text-lg font-medium focus:outline-none"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              disabled
              className="w-4 h-4"
            />
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className="flex-1 px-3 py-2 border rounded-md"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              onBlur={() => {
                // Clean up empty options on blur
                setOptions(options.filter(opt => opt.trim() !== ''));
              }}
            />
            {index === options.length - 1 && option.trim() !== '' && (
              <button
                onClick={() => setOptions([...options, ''])}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};