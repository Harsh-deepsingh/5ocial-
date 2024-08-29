"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const CountComment = ({ postId }: { postId: string }) => {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/feed/comments?postId=${postId}`
        );
        setCommentCount(res.data.commentCount);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchComments();
  }, [postId]);
  return <div className="text-xs font-bold">{commentCount}</div>;
};

export default CountComment;
