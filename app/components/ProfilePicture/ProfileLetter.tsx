import React from "react";

const ProfileLetter = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <button onClick={onClick}>
        <div className="w-14 h-12 bg-gray-600 rounded-full flex justify-center items-center">
          <p className="text-2xl">{children}</p>
        </div>
      </button>
    </div>
  );
};

export default ProfileLetter;
