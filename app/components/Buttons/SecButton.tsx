import React from "react";
const SecButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="me-2 w-full border border-theme-border rounded-md bg-transparent px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none"
    >
      {children}
    </button>
  );
};

export default SecButton;
