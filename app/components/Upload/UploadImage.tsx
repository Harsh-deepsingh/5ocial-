"use client";
import React, { useState } from "react";

const UploadImage = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}></button>
      <button onClick={() => setCount(count - 1)}></button>
    </div>
  );
};

export default UploadImage;
