"use client";
import React from "react";
import ProfileButton from "../../components/Buttons/ProfileButton";

const UserContent = ({
  activeButton,
  setActiveButton,
}: {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <div className="flex justify-between h-16 text-theme-border">
        <ProfileButton
          isActive={activeButton === "Post"}
          onClick={() => handleButtonClick("Post")}
        >
          Post
        </ProfileButton>
        <ProfileButton
          isActive={activeButton === "Likes"}
          onClick={() => handleButtonClick("Likes")}
        >
          Likes
        </ProfileButton>
        <ProfileButton
          isActive={activeButton === "Comments"}
          onClick={() => handleButtonClick("Comments")}
        >
          Comments
        </ProfileButton>
        <ProfileButton
          isActive={activeButton === "Shared Posts"}
          onClick={() => handleButtonClick("Shared Posts")}
        >
          Shared Posts
        </ProfileButton>
      </div>
    </div>
  );
};

export default UserContent;
