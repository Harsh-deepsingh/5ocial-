"use client";
import React, { useState } from "react";
import ProfileButton from "../../../components/Buttons/ProfileButton";

const UserFollow = () => {
  const [activeButton, setActiveButton] = useState("Followers");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  return (
    <div>
      <div className="flex justify-between h-16 text-theme-border">
        <ProfileButton
          isActive={activeButton === "Followers"}
          onClick={() => handleButtonClick("Followers")}
        >
          Followers
        </ProfileButton>
        <ProfileButton
          isActive={activeButton === "Following"}
          onClick={() => handleButtonClick("Following")}
        >
          Following
        </ProfileButton>
      </div>
    </div>
  );
};

export default UserFollow;
