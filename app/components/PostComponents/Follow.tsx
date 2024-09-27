"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

const Follow = ({
  followingId,
  userId,
  postId,
}: {
  followingId?: string;
  userId?: string;
  postId?: string;
}) => {
  const [follow, setFollow] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const handleFollow = useCallback(async () => {
    if (isFollowing) return;

    setIsFollowing(true);
    try {
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/follower?userId=${userId}&followingId=${followingId}`
      );
      setFollow((prev) => !prev);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/follower?followingId=${followingId}`
      );
      setFollowCount(res.data.followers);
    } catch (error) {
      console.error("Unable to follow/unfollow:", error);
    } finally {
      setTimeout(() => {
        setIsFollowing(false);
      }, 200);
    }
  }, [followingId, userId, isFollowing]);

  useEffect(() => {
    const fetchFollowStatusAndCount = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/follower?followingId=${followingId}`
        );
        setFollowCount(res.data.followers);

        const checkUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/follower/check-follow?userId=${userId}&followingId=${followingId}`;
        const checkRes = await axios.get(checkUrl);
        setFollow(checkRes.data.hasFollowed);
      } catch (error) {
        console.error("Failed to fetch follow status or count:", error);
      }
    };

    fetchFollowStatusAndCount();
  }, [followingId, userId]);

  return (
    <div className="text-theme-border hover:text-green-500 w-min">
      <div className="group-hover:stroke-green-500 bg-transparent hover:bg-[#00ff0d20] p-1.5 rounded-full flex justify-center items-center gap-1 group">
        <button
          className="flex justify-center items-center"
          onClick={handleFollow}
        >
          {follow ? (
            <div className="text-green-500 flex justify-center items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 24 24"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="M11 2a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 11c-2.395 0-4.575.694-6.178 1.672c-.8.488-1.484 1.064-1.978 1.69C2.358 16.976 2 17.713 2 18.5c0 .845.411 1.511 1.003 1.986c.56.45 1.299.748 2.084.956C6.665 21.859 8.771 22 11 22q.346 0 .685-.005a1 1 0 0 0 .89-1.428A6 6 0 0 1 12 18c0-1.252.383-2.412 1.037-3.373a1 1 0 0 0-.72-1.557Q11.671 13 11 13m10.708 3.068a1 1 0 0 0-1.414-1.414l-3.182 3.182l-1.414-1.414a1 1 0 0 0-1.414 1.414l2.05 2.05a1.1 1.1 0 0 0 1.556 0z"
                  />
                </g>
              </svg>
              <p className="text-xs font-bold">{followCount}</p>
            </div>
          ) : (
            <div className="flex justify-center items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 24 24"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="M11 4a3 3 0 1 0 0 6a3 3 0 0 0 0-6M6 7a5 5 0 1 1 10 0A5 5 0 0 1 6 7M4.413 17.601c-.323.41-.413.72-.413.899c0 .122.037.251.255.426c.249.2.682.407 1.344.582C6.917 19.858 8.811 20 11 20q.333 0 .658-.005a1 1 0 0 1 .027 2Q11.345 22 11 22c-2.229 0-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C2.41 20.01 2 19.345 2 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69C6.425 13.695 8.605 13 11 13q.671 0 1.316.07a1 1 0 0 1-.211 1.989Q11.564 15 11 15c-2.023 0-3.843.59-5.136 1.379c-.647.394-1.135.822-1.45 1.222Zm17.295-1.533a1 1 0 0 0-1.414-1.414l-3.182 3.182l-1.414-1.414a1 1 0 0 0-1.414 1.414l2.05 2.05a1.1 1.1 0 0 0 1.556 0z"
                  />
                </g>
              </svg>
              <p className="text-xs font-bold">{followCount}</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Follow;
