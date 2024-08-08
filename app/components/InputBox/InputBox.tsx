import React from "react";

const InputBox = ({
  type,
  placeholder,
  onChange,
}: {
  type: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 placeholder-theme-border border-theme-border rounded-md border shadow-sm focus:outline-none bg-transparent"
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
