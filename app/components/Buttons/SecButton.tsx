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
      className="me-2 w-full border border-theme-border rounded-md bg-transparent md:px-5 md:py-2.5 px-2 py-1 text-center text-sm font-medium text-white "
    >
      {children}
    </button>
  );
};

export default SecButton;
