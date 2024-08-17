"use client";
import { useState } from "react";
import React from "react";

const UserContent = () => {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  return (
    <div>
      <div className="flex justify-between h-16 text-theme-border">
        <button
          className={`w-full rounded-sm transition-all duration-100 ease-in-out ${
            activeButton === "Post"
              ? "border-b-2 border-theme-blue text-white"
              : "hover:bg-black hover:text-white"
          }`}
          onClick={() => handleButtonClick("Post")}
        >
          Posts
        </button>
        <button
          className={`w-full rounded-sm transition-all duration-100 ease-in-out ${
            activeButton === "Likes"
              ? "border-b-2 border-theme-blue text-white"
              : "hover:bg-black hover:text-white"
          }`}
          onClick={() => handleButtonClick("Likes")}
        >
          Likes
        </button>
        <button
          className={`w-full rounded-sm transition-all duration-100 ease-in-out ${
            activeButton === "Comments"
              ? "border-b-2 border-theme-blue text-white"
              : "hover:bg-black hover:text-white"
          }`}
          onClick={() => handleButtonClick("Comments")}
        >
          Comments
        </button>
        <button
          className={`w-full rounded-sm transition-all duration-100 ease-in-out ${
            activeButton === "CommunityPosts"
              ? "border-b-2 border-theme-blue text-white"
              : "hover:bg-black hover:text-white"
          }`}
          onClick={() => handleButtonClick("CommunityPosts")}
        >
          Community Posts
        </button>
      </div>
    </div>
  );
};

export default UserContent;
