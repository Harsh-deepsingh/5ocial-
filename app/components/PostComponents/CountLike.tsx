"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CountLike = ({ postId }: { postId: string }) => {
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/feed/likes?postId=${postId}`
        );
        setLikeCount(res.data.like);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchLikes();
  }, [postId]);

  return <p className="text-xs font-bold">{likeCount}</p>;
};

export default CountLike;
