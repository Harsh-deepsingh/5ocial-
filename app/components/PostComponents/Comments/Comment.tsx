"use client";
import React, { useState } from "react";
import CommentModal from "./CommentModal";
import CountComment from "./CountComment";
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
const Comment = ({
  post,
  comment,
  userId,
}: {
  post: post;
  comment: comment;
  userId: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="text-theme-border hover:text-theme-blue w-min">
      <button onClick={openModal}>
        <div className="bg-transparent hover:bg-[#00aeff20] p-1.5 rounded-full flex justify-center items-center gap-1 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.4em"
            height="1.4em"
            viewBox="0 0 24 24"
            className="stroke-[#3F454B] group-hover:stroke-theme-blue"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 4H5a2 2 0 0 0-2 2v15l3.467-2.6a2 2 0 0 1 1.2-.4H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
            />
          </svg>
          <div>
            {post != undefined ? (
              <CountComment
                postId={post?.postId}
                isModalOpen={isModalOpen}
              ></CountComment>
            ) : (
              <CountComment
                commentId={comment.commentId}
                isModalOpen={isModalOpen}
              ></CountComment>
            )}
          </div>
        </div>
      </button>
      <CommentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        post={post}
        userId={userId}
      ></CommentModal>
    </div>
  );
};

export default Comment;
