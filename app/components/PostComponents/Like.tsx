"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

type comment = {
  commentId: string;
  username: string | null;
  content: string;
  userId: string;
  postId: string;
};

const Like = ({
  postId,
  comment,
  userId,
}: {
  postId?: string;
  comment?: comment;
  userId?: string;
}) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const handleLike = useCallback(async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const requestUrl = comment
        ? `http://localhost:3000/api/like?userId=${userId}&commentId=${comment.commentId}`
        : `http://localhost:3000/api/like?userId=${userId}&postId=${postId}`;

      await axios.post(requestUrl, {
        actionType: like ? "DISLIKE" : "LIKE",
      });

      setLike((prev) => !prev);

      const fetchUrl = comment
        ? `http://localhost:3000/api/feed/likes?commentId=${comment.commentId}`
        : `http://localhost:3000/api/feed/likes?postId=${postId}`;

      const res = await axios.get(fetchUrl);
      setLikeCount(res.data.like);
    } catch (error) {
      console.error("Unable to like:", error);
    } finally {
      setTimeout(() => {
        setIsLiking(false);
      }, 200);
    }
  }, [comment, like, postId, userId, isLiking]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const fetchUrl = comment
          ? `http://localhost:3000/api/feed/likes?commentId=${comment.commentId}`
          : `http://localhost:3000/api/feed/likes?postId=${postId}`;

        const res = await axios.get(fetchUrl);
        setLikeCount(res.data.like);

        const checkUrl = comment
          ? `http://localhost:3000/api/feed/likes/check-like?userId=${userId}&commentId=${comment.commentId}`
          : `http://localhost:3000/api/feed/likes/check-like?userId=${userId}&postId=${postId}`;

        const checkRes = await axios.get(checkUrl);
        setLike(checkRes.data.hasLiked);
      } catch (error) {
        console.error(
          "Failed to fetch likes or check user like status:",
          error
        );
      }
    };

    fetchLikes();
  }, [postId, comment, userId]);

  return (
    <div className="text-theme-border hover:text-[rgb(249,24,129)] w-min">
      <button
        onClick={handleLike}
        disabled={isLiking}
        className="flex justify-center items-center"
      >
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
                {likeCount}
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
              <div className="text-xs font-bold">{likeCount}</div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default Like;
