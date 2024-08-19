"use client";
import { useState } from "react";
import React from "react";
import ProfileButton from "../components/Buttons/ProfileButton";

const UserContent = () => {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  return (
    <div>
      <div className="flex justify-between h-16 text-theme-border">
        <ProfileButton>Post</ProfileButton>
        <ProfileButton>Likes</ProfileButton>
        <ProfileButton>Comments</ProfileButton>
        <ProfileButton>Community Posts</ProfileButton>
      </div>
    </div>
  );
};

export default UserContent;
