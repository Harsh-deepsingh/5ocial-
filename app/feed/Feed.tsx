"use client";
import React, { useState, useRef, useEffect } from "react";
import Card from "../components/Card/Card";
import Button from "../components/Buttons/Button";
import Line from "../components/Line/Line";

const Feed = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
    autoResize();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to auto to calculate the new height
    textarea.style.height = textarea.scrollHeight + "px"; // Set height to scrollHeight
  };

  useEffect(() => {
    autoResize();
  }, [text]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-2 flex-col">
        <Line />
        <Card>
          <div className="flex gap-2 justify-center items-start">
            <div className="w-12 h-12 bg-gray-600 rounded-full flex justify-center items-center">
              <p className="text-2xl">H</p>
            </div>
            <div className="flex flex-col justify-between gap-5">
              <div className="flex flex-col">
                <textarea
                  ref={textareaRef}
                  className="resize-none overflow-hidden md:w-96 w-min bg-transparent mb-2 shadow-sm focus:outline-none"
                  placeholder="Share your thoughts!"
                  value={text}
                  onChange={handleInputChange}
                  rows={1}
                />
                <p className="text-xs">community name</p>
                <Line />
              </div>
              <div className="flex items-end justify-end">
                <Button>Post</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Feed;
