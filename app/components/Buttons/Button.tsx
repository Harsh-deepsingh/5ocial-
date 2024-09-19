import React, { memo } from "react";
const PrimaryButton = memo(
  ({
    onClick,
    children,
    disabled,
  }: {
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
  }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="disabled:opacity-50 mb-2 me-2 w-min rounded-full bg-theme-blue px-3 py-2 text-center text-sm font-medium text-white hover:bg-sky-600 focus:outline-none"
      >
        {children}
      </button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";
export default PrimaryButton;
