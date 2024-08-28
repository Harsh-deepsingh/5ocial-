import React from "react";
import Like from "./Like";
import Comment from "./Comments/Comment";
import Follow from "./Follow";

const PostAction = ({
  postId,
  followingId,
}: {
  postId: string;
  followingId: string;
}) => {
  return (
    <div className="w-full flex  justify-between items-center">
      <Comment></Comment>
      <Like postId={postId}></Like>
      <Follow postId={postId} followingId={followingId}></Follow>
    </div>
  );
};

export default PostAction;
