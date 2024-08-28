import React from "react";
import Like from "./Like";
import Comment from "./Comments/Comment";
import Follow from "./Follow";

const PostAction = ({ postId }: { postId: string }) => {
  return (
    <div className="w-full flex  justify-between items-center">
      <Comment></Comment>
      <Like postId={postId}></Like>
      <Follow></Follow>
    </div>
  );
};

export default PostAction;
