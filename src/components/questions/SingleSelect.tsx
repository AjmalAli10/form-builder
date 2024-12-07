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
          <div key={index} className="flex items-center gap-2.5">
            <input
              type="radio"
              disabled
              className="w-4 h-4"
            />
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className="h-8 flex-1 px-2 py-1.5 bg-white border border-[#E1E4E8] rounded-lg shadow-[0px_1px_1px_-0.5px_#00000008] focus:outline-none placeholder:text-[#959DA5] font-inter text-sm font-normal leading-5 text-left text-[#0D0D0D] underline-offset-[from-font] decoration-skip-ink-none"
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