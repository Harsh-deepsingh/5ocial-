import React from "react";

const ProfileLetter = ({
  onClick,
  children,
  username,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  username: string | null | undefined;
}) => {
  const color = username?.split("_")[1]?.toLowerCase() || "#4b5563";

  return (
    <div>
      <button onClick={onClick}>
        <div
          className="h-min w- rounded-full"
          style={{ backgroundColor: "#4b5563" }}
        >
          <div
            className="w-12 h-12 rounded-full flex justify-center  items-center text-white "
            style={{ backgroundColor: color }}
          >
            <p className="text-2xl">{children}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ProfileLetter;
