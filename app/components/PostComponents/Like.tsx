"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import LikeIcon from "./LikeIcon/LikeIcon";
import DislikeIcon from "./DislikeIcon/DislikeIcon";

type Comment = {
  commentId: string;
  username: string | null;
  content: string;
  userId: string;
  postId: string;
};

type LikeDislikeProps = {
  postId?: string;
  comment?: Comment;
  userId?: string;
};

const LikeDislike = ({ postId, comment, userId }: LikeDislikeProps) => {
  // States for like
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  // States for dislike
  const [dislike, setDislike] = useState(false);
  const [DislikeCount, setDislikeCount] = useState(0);
  const [isDisliking, setIsDisliking] = useState(false);

  const handleLike = useCallback(async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const requestUrl = comment
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/like?userId=${userId}&commentId=${comment.commentId}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/like?userId=${userId}&postId=${postId}`;

      await axios.post(requestUrl, {
        actionType: "LIKE",
      });

      setLike((prev) => !prev);

      // const fetchUrl = comment
      //   ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/likes?commentId=${comment.commentId}`
      //   : `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/likes?postId=${postId}`;

      // const res = await axios.get(fetchUrl);
      // setLikeCount(res.data.like);
    } catch (error) {
      console.error("Unable to like:", error);
    } finally {
      setIsLiking(false);
    }
  }, [comment, postId, userId, isLiking]);

  const handleDislike = useCallback(async () => {
    if (isDisliking) return;

    setIsDisliking(true);
    try {
      const requestUrl = comment
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/like?userId=${userId}&commentId=${comment.commentId}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/like?userId=${userId}&postId=${postId}`;

      await axios.post(requestUrl, {
        actionType: "DISLIKE",
      });

      setDislike((prev) => !prev);

      // const fetchUrl = comment
      //   ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/likes?commentId=${comment.commentId}`
      //   : `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/likes?postId=${postId}`;

      // const res = await axios.get(fetchUrl);
      // setDislikeCount(res.data.dislike);
    } catch (error) {
      console.error("Unable to dislike:", error);
    } finally {
      setIsDisliking(false);
    }
  }, [comment, postId, userId, isDisliking]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUrl = comment
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/likes?commentId=${comment.commentId}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/likes?postId=${postId}`;

        const res = await axios.get(fetchUrl);
        setLikeCount(res.data.like);
        setDislikeCount(res.data.dislike);

        const checkUrl = comment
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/likes/check-like?userId=${userId}&commentId=${comment.commentId}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/likes/check-like?userId=${userId}&postId=${postId}`;

        const checkRes = await axios.get(checkUrl);
        setLike(checkRes.data.hasLiked);
        setDislike(checkRes.data.hasDisliked);
      } catch (error) {
        console.error(
          "Failed to fetch like/dislike data or check status:",
          error
        );
      }
    };

    fetchData();
  }, [postId, comment, userId, like, dislike]);

  return (
    <div className="w-2/5 flex  justify-between items-center">
      {/* Like button */}
      <div className="text-theme-border hover:text-[rgb(249,24,129)] w-min p-1">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex justify-center items-center"
        >
          <LikeIcon like={like} likeCount={likeCount} />
        </button>
      </div>

      {/* Dislike button */}
      <div className="text-theme-border hover:text-[rgb(249,24,24)] w-min p-1">
        <button
          onClick={handleDislike}
          disabled={isDisliking}
          className="flex justify-center items-center"
        >
          <DislikeIcon dislike={dislike} DislikeCount={DislikeCount} />
        </button>
      </div>
    </div>
  );
};

export default LikeDislike;
