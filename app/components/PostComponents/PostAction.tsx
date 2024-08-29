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
type comment = {
  commentId: string;
  username: string | null;
  content: string;
  userId: string;
  postId: string;
};
const PostAction = ({
  postId,
  followingId,
  post,
  comment,
}: {
  postId: string;
  followingId: string;
  post: post;
  comment: comment;
}) => {
  console.log(postId);

  return (
    <div className="w-full flex  justify-between items-center">
      <Comment post={post} comment={comment}></Comment>
      <Like postId={postId} comment={comment}></Like>
      <Follow postId={postId} followingId={followingId}></Follow>
    </div>
  );
};

export default PostAction;
