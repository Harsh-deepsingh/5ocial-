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
  const [test, setTets] = useState(false);
  useEffect(() => {
    const fetchFollower = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/follower?followingId=${followingId}`
        );
        setFollowCount(res.data.followers);
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      }
    };

    fetchFollower();
  }, [postId]);
  function handleClick() {
    setTets((prev) => !prev);
  }
  return (
    <div onClick={handleClick}>
      {" "}
      <p className="text-xs font-bold">{followCount}</p>
    </div>
  );
};

export default CountFollow;
