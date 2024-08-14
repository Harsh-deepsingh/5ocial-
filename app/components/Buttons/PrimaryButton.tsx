import React, { memo } from "react";
import "../../globals.css";
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
        className="mb-2 me-2 w-full rounded-md bg-theme-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-600 focus:outline-none"
      >
        {children}
      </button>
    );
  }
);

export default PrimaryButton;
