"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FollowCountResponse {
  followers: number;
}
interface FollowingCountResponse {
  following: number;
}

const FollowUser = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [followCount, setFollowCount] = useState<FollowCountResponse>({
    followers: 0,
  });
  const [followingCount, setFollowingCount] = useState<FollowingCountResponse>({
    following: 0,
  });

  useEffect(() => {
    async function fetchFollowCount() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/follower?followingId=${userId}`
        );
        setFollowCount(res.data);
        setFollowingCount(res.data);
      } catch (error) {
        console.error("Error fetching follow count:", error);
      }
    }
    fetchFollowCount();
  }, [userId]);

  return (
    <div>
      <div className="text-theme-border text-sm flex gap-2 font-bold">
        <div className="flex gap-1">
          <p className="text-white">{followCount.followers}</p>
          <button
            className="hover:text-white"
            onClick={() => {
              router.push(`/profile/${userId}/follow`);
            }}
          >
            followers
          </button>
        </div>
        <div className="flex gap-1">
          <p className="text-white">{followingCount.following}</p>
          <button
            className="hover:text-white"
            onClick={() => {
              router.push(`/profile/${userId}/follow`);
            }}
          >
            following
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUser;
