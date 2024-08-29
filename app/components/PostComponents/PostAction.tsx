import React from "react";
import Like from "./Like";
import Comment from "./Comments/Comment";
import Follow from "./Follow";
type post = {
  username: string | null | undefined;
  postId: string;
  content: string;
  userId: string;
};
const PostAction = ({
  postId,
  followingId,
  post,
}: {
  postId: string;
  followingId: string;
  post: post;
}) => {
  return (
    <div className="w-full flex  justify-between items-center">
      <Comment post={post}></Comment>
      <Like postId={postId}></Like>
      <Follow postId={postId} followingId={followingId}></Follow>
    </div>
  );
};

export default PostAction;
