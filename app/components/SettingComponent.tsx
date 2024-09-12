import React from "react";

const SettingComponent = ({
  main,
  mainInfo,
  onClick,
}: {
  main: string;
  mainInfo: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-start items-start rounded-sm transition-all duration-200 ease-in p-4 text-sm text-theme-border hover:bg-black cursor-pointer"
    >
      <p className="font-bold text-white">{main}</p>
      <p className="flex text-algin">{mainInfo}</p>
    </button>
  );
};

export default SettingComponent;
