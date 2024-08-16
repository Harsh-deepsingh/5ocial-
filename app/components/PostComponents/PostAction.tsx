import React from "react";
import Like from "./Like";
import Comment from "./Comment";
import Follow from "./Follow";

const PostAction = () => {
  return (
    <div className="w-full flex  justify-between items-center">
      <Comment></Comment>
      <Like></Like>
      <Follow></Follow>
    </div>
  );
};

export default PostAction;
