import React, { memo } from "react";

const InputBox = memo(
  ({
    type,
    placeholder,
    onChange,
    onKeyDown,
  }: {
    type: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  }) => {
    return (
      <div className="flex flex-col items-start space-y-2">
        <input
          type={type}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className="w-full px-4 py-2 md:w-96 placeholder-theme-border border-theme-border rounded-md border shadow-sm focus:outline-none bg-transparent"
          onChange={onChange}
        />
      </div>
    );
  }
);

export default InputBox;
