import React from "react";

const PrimaryButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button onClick={onClick} className="p-10 text-cyan-600 bg-white">
      {children}
    </button>
  );
};

export default PrimaryButton;
