"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "../components/Buttons/Button";
import Line from "../components/Line/Line";
import { useSession } from "next-auth/react";
import PostFeatures from "../components/PostFeatures/PostFeatures";
import Image from "next/image";

const PostInput = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [emoji, setEmoji] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const data = useParams();
  const communityId = data.communityId;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const sharedCommunity = data.sharedCommunityId;
  const session = useSession();
  const userId = session?.data?.user?.id;
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    autoResize();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, [text]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter some content.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (sharedCommunity !== undefined) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/community/sharedPosts?userId=${userId}`,
          { sharedCommunity, content: text, imageUrl }
        );
        setText("");
        cancelImage();
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/post?userId=${userId}&communityId=${communityId}`,
          { content: text, imageUrl }
        );
        setText("");
        cancelImage();
      }
      router.push("/");
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("Failed to submit the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUrl = (url: string) => {
    cancelImage();
    setImageUrl(url);
  };
  const cancelImage = () => {
    setImageUrl("");
  };

  return (
    <div className="flex w-full flex-col">
      <textarea
        ref={textareaRef}
        className="w-full resize-none overflow-hidden bg-transparent mb-2 shadow-sm focus:outline-none"
        placeholder="Share your thoughts!"
        value={text + emoji}
        onChange={handleInputChange}
        rows={1}
      />
      {imageUrl.length ? (
        <>
          <button
            className="p-3 text-xl hover:text-gray-500 w-min"
            onClick={cancelImage}
          >
            &times;
          </button>
          <div className="flex justify-center items-center">
            <Image
              src={imageUrl}
              alt="my image"
              width="500"
              height="500"
              className="w-min h-min rounded-md"
            ></Image>
          </div>
        </>
      ) : (
        <></>
      )}
      <Line></Line>
      <div className="flex justify-between mt-2">
        <PostFeatures
          sendUrl={handleImageUrl}
          communityId={communityId}
          sharedCommunity={sharedCommunity}
          userId={userId}
        ></PostFeatures>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PostInput;
