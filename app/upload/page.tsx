"use client";
import React, { useState } from "react";

const UploadImage = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col gap-10 justify-center items-center mt-10">
      Count: {count}
      <div className="flex gap-4">
        <button
          className="p-4 rounded-md w-20 bg-red-500 "
          onClick={() => setCount(count + 1)}
        >
          Inc
        </button>
        <button
          className="p-4 w-20 rounded-md bg-blue-500 "
          onClick={() => {
            count > 0 ? setCount(count - 1) : setCount(count);
          }}
        >
          Dec
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
