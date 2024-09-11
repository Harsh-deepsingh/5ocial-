"use client";
import { useRouter } from "next/navigation";
import React from "react";

const FollowUser = ({ userId }: { userId: string }) => {
  const router = useRouter();
  return (
    <div>
      <div className="text-theme-border text-sm flex gap-2 font-bold">
        <div className="flex gap-1">
          <p className="text-white">1</p>
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
          <p className="text-white">1</p>
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
