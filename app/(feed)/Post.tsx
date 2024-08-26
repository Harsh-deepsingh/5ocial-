"use client";
import React, { useState, useRef, useEffect } from "react";
import Card from "../components/Card/Card";
import Button from "../components/Buttons/Button";
import Line from "../components/Line/Line";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";

const Post = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
    autoResize();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    autoResize();
  }, [text]);

  return (
    <Card>
      <div className="flex gap-2 justify-center items-start">
        <ProfileLetter>H</ProfileLetter>
        <div className="w-full flex flex-col justify-between gap-5">
          <div className="flex flex-col">
            <textarea
              ref={textareaRef}
              className="w-full resize-none overflow-hidden md:w-full  bg-transparent mb-2 shadow-sm focus:outline-none"
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
  );
};

export default Post;
