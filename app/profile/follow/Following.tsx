import React from "react";
import ProfileLetter from "../../components/ProfilePicture/ProfileLetter";
import PrimaryButton from "../../components/Buttons/Button";
import Line from "../../components/Line/Line";
const Following = () => {
  return (
    <div>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-4">
          <ProfileLetter></ProfileLetter>
          <p className="font-bold text-lg">Username</p>
        </div>
        <PrimaryButton>Follow</PrimaryButton>
      </div>
      <Line></Line>
    </div>
  );
};

export default Following;
