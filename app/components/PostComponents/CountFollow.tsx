"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const CountFollow = ({
  followingId,
  postId,
}: {
  followingId: string;
  postId: string;
}) => {
  const [followCount, setFollowCount] = useState(0);
  useEffect(() => {
    const fetchFollower = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/follower?followingId=${followingId}`
        );
        setFollowCount(res.data.followers);
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      }
    };

    fetchFollower();
  }, [postId, followCount, followingId]);
  return <p className="text-xs font-bold">{followCount}</p>;
};

export default CountFollow;
