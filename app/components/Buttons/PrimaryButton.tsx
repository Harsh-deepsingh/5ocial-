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
        className="mb-2 me-2 w-full rounded-md bg-theme-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-600 focus:outline-none"
      >
        {children}
      </button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";
export default PrimaryButton;
