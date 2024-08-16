import React from "react";
import Card from "../components/Card/Card";

const Content = () => {
  return (
    <div>
      <Card>
        <div className="flex gap-3 h-max justify-start ">
          <div className="w-9 h-8 bg-gray-600 rounded-full flex justify-center items-center">
            <p className="text-lg">H</p>
          </div>
          <div className=" w-full flex flex-col">
            <p className="text-lg">username</p>
            <p>
              smart mens are always listen music I think I'm not sure let's see
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Content;
