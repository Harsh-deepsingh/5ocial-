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
    <button
      className={`w-full rounded-sm transition-all duration-200 ease-in ${
        isActive ? "bg-black text-white" : " hover:text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ProfileButton;
