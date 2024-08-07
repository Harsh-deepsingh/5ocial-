import React from "react";

const InputBox = ({
  type,
  placeholder,
}: {
  type: string;
  placeholder?: string;
}) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 placeholder-theme-border border-theme-border rounded-md border shadow-sm focus:outline-none bg-transparent"
      />
    </div>
  );
};

export default InputBox;
