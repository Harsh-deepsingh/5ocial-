"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const CountComment = ({
  postId,
  commentId,
  isModalOpen,
}: {
  postId?: string;
  commentId?: string;
  isModalOpen: boolean;
}) => {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (commentId) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/comments?commentId=${commentId}`
          );
          setCommentCount(res.data.commentCount);
        } else {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/comments?postId=${postId}`
          );
          setCommentCount(res.data.commentCount);
        }
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchComments();
  }, [postId, commentId, isModalOpen]);
  return <div className="w-6 text-xs font-bold">{commentCount}</div>;
};

export default CountComment;
