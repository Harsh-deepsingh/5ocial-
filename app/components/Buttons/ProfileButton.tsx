"use client";
import React from "react";

const ProfileButton = ({
  onClick,
  isActive,
  children,
}: {
  onClick?: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-full justify-between h-10">
      <button
        className={`p-2 sm:p-4 w-full rounded-md transition-all duration-200 text-xs sm:text-lg ease-in font-bold ${
          isActive ? "sm:bg-black text-white" : "hover:text-white"
        }`}
        onClick={onClick}
      >
        {children}
      </button>

      {isActive && (
        <div className="p-px bg-theme-blue rounded-full transition-all duration-200 ease-in sm:hidden"></div>
      )}
    </div>
  );
};

export default ProfileButton;
