"use client";
import React from "react";
import { useState } from "react";

const ProfileButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton("");
    setActiveButton(buttonName);
  };
  console.log(activeButton);

  return (
    <button
      className={`w-full rounded-sm transition-all duration-100 ease-in-out ${
        activeButton === `${children}`
          ? "border-b-2 border-theme-blue text-white"
          : "hover:bg-black hover:text-white"
      }`}
      onClick={() => handleButtonClick(`${children}`)}
    >
      {children}
    </button>
  );
};

export default ProfileButton;
