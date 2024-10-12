import { IconInfoCircle } from "@tabler/icons-react";
import React, { Children, useState } from "react";

const Popup = ({ children }: { children: string | string[] }) => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="text-white">
      <div className=" w-full h-full  relative bg-  cursor-pointer flex justify-center items-center select-none">
        <IconInfoCircle
          onClick={togglePopup}
          className="w-full h-full"
        ></IconInfoCircle>

        {isVisible && (
          <div
            className="text-xs absolute z-10 w-40 bg-gray-700 text-white text-center rounded-lg py-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2
            transition-opacity duration-300 ease-in-out opacity-100 animate-fadeIn"
          >
            {children}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-5 border-transparent border-t-gray-700" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
