"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import CountLike from "./CountLike";
type comment = {
  commentId: string;
  username: string | null;
  content: string;
  userId: string;
  postId: string;
};
const Like = ({ postId, comment }: { postId: string; comment: comment }) => {
  const [like, setLike] = useState(false);
  const params = useParams();
  const ids = params.feed;
  const id = ids.toString().split("%26");
  const userId = id[0];

  const handleLike = async () => {
    setLike((prev) => !prev);
    try {
      if (comment) {
        const res = await axios.post(
          `http://localhost:3000/api/like?userId=${userId}&commentId=${comment.commentId}`,
          { actionType: "LIKE" }
        );
      } else {
        const res = await axios.post(
          `http://localhost:3000/api/like?userId=${userId}&postId=${postId}`,
          { actionType: "LIKE" }
        );
      }
    } catch (error) {
      return { message: `unable to like ${error}` };
    }
  };

  return (
    <div className="text-theme-border hover:text-[rgb(249,24,129)] w-min">
      <button onClick={handleLike} className="flex justify-center items-center">
        <div className="bg-transparent hover:bg-[rgba(249,24,129,0.13)] p-1.5 rounded-full flex justify-center items-center gap-1 group">
          {like ? (
            <div className="flex justify-center items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 48 48"
              >
                <path
                  fill="rgb(249, 24, 128)"
                  stroke="rgb(249, 24, 128)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"
                />
              </svg>
              <div className="text-xs text-[rgb(249,24,129)] font-bold">
                <CountLike comment={comment} postId={postId}></CountLike>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 48 48"
                className="stroke-[#3F454B] group-hover:stroke-[rgb(249,24,129)]"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="5"
                  d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"
                />
              </svg>
              <CountLike postId={postId} comment={comment}></CountLike>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default Like;
