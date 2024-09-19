"use client";
import { useParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "../components/Buttons/Button";
import Line from "../components/Line/Line";
import { useSession } from "next-auth/react";
const PostInput = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const data = useParams();
  const communityId = data.communityId;
  //const userId = data.userId;
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
          `http://localhost:3000/api/community/sharedPosts?userId=${userId}`,
          { sharedCommunity, content: text }
        );
        setText("");
      } else {
        const response = await axios.post(
          `http://localhost:3000/api/post?userId=${userId}&communityId=${communityId}`,
          { content: text }
        );
        setText("");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("Failed to submit the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <textarea
        ref={textareaRef}
        className="w-full resize-none overflow-hidden bg-transparent mb-2 shadow-sm focus:outline-none"
        placeholder="Share your thoughts!"
        value={text}
        onChange={handleInputChange}
        rows={1}
      />
      <Line></Line>
      <div className="flex justify-end mt-2">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PostInput;
