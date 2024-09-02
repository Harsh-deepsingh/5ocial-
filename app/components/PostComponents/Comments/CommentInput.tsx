"use client";
import { useParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "../../../components/Buttons/Button";
import Line from "../../../components/Line/Line";
const CommentInput = ({ postId }: { postId: string }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const ids = params.feed;
  const id = ids.toString().split("%26");
  const userId = id[0];
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
    autoResize();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
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
      const response = await axios.post(
        `http://localhost:3000/api/comment?userId=${userId}&postId=${postId}`,
        { content: text }
      );

      setText("");
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

export default CommentInput;
