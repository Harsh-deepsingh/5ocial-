import React, { memo } from "react";
const PrimaryButton = memo(
  ({
    onClick,
    children,
  }: {
    onClick?: () => void;
    children: React.ReactNode;
  }) => {
    return (
      <button
        onClick={onClick}
        className="mb-2 me-2 w-min rounded-full bg-theme-blue px-3 py-2 text-center text-sm font-medium text-white hover:bg-sky-600 focus:outline-none"
      >
        {children}
      </button>
    );
  }
);

export default PrimaryButton;
