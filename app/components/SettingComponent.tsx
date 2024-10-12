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
    <div
      onClick={onClick}
      className="border sm:border sm:border-theme-border md:border-none flex flex-col justify-start items-start rounded-lg transition-all duration-200 ease-in p-4 text-sm text-theme-border md:hover:bg-black cursor-pointer"
      style={{ borderColor: "var(--theme-border-color)" }}
    >
      <p className="font-bold text-white">{main}</p>
      <p className="flex justify-start items-start">{mainInfo}</p>
    </div>
  );
};

export default SettingComponent;
