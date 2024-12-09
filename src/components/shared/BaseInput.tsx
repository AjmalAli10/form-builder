interface BaseInputProps<T extends string | number> {
  type: 'text' | 'number' | 'url';
  placeholder: string;
  value?: T;
  onChange?: (value: T) => void;
  isPreview?: boolean;
  hasError?: boolean;
}

export const BaseInput = <T extends string | number>({ 
  type, 
  placeholder, 
  value, 
  onChange,
  isPreview = false,
  hasError = false
}: BaseInputProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
      onChange(newValue as T);
    }
  };

  return (
    <div className="">
      <input
        type={type}
        disabled={!isPreview}
        placeholder={placeholder}
        value={value || ''}
        onChange={handleChange}
        className={`w-full h-8 px-2 py-1.5 border border-[#E1E4E8] rounded-lg bg-white shadow-[0px_1px_1px_-0.5px_#00000008] focus:outline-none text-sm font-semibold leading-5 text-left text-[#0D0D0D] underline-offset-[from-font] decoration-skip-ink-none ${
          hasError ? 'placeholder:text-[#EB5757]' : 'placeholder:text-[#959DA5]'
        } gap-2.5`}
      />
    </div>
  );
}; 