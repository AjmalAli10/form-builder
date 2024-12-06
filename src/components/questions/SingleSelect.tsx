interface SingleSelectProps {
  options: string[];
  setOptions: (options: string[]) => void;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  setOptions,
}) => {
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="space-y-4">
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
            />
            {index === options.length - 1 && (
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