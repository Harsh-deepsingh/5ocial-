"use client";
import { useState, useEffect } from "react";
import axios from "axios";

type Option = {
  optionId: string;
  text: string;
  postId: string;
};

type PollProps = {
  post: Option[];
  userId?: string;
};

type PollResult = {
  optionId: string;
  text: string;
  percentage: number;
};

const Poll = ({ post, userId }: PollProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pollResults, setPollResults] = useState<PollResult[]>([]);

  // Function to handle voting or changing the vote
  const vote = async (optionId: string) => {
    if (!userId) {
      setErrorMessage("You must be logged in to vote.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/vote?userId=${userId}&optionId=${optionId}`
      );
      if (response.status === 200) {
        setSelectedOption(optionId);
        setErrorMessage("");
        fetchPollResults();
      }
    } catch (error) {
      setErrorMessage("Failed to cast vote. Please try again later.");
      console.error("Error voting:", error);
    }
  };

  const fetchPollResults = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/vote/result?postId=${post[0]?.postId}`
      );
      if (response.status === 200) {
        setPollResults(response.data.pollResults || []);
      }
    } catch (error) {
      console.error("Error fetching poll results:", error);
    }
  };

  const checkUserVoted = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/vote/check?userId=${userId}&postId=${post[0]?.postId}`
      );

      if (response.status === 200 && response.data.hasVoted) {
        setSelectedOption(response.data.selectedOptionId); // Get the current selected option
        fetchPollResults();
      }
    } catch (error) {
      console.error("Error checking vote status:", error);
    }
  };

  useEffect(() => {
    checkUserVoted();
  }, []);

  return (
    <div>
      {post.map((option) => {
        const result = pollResults?.find(
          (res) => res.optionId === option.optionId
        );

        const isSelected = selectedOption === option.optionId;

        return (
          <div key={option.optionId} className="mb-4 flex items-center">
            <div className="flex justify-center items-center gap-3 w-full">
              <div
                className={`w-full relative h-full z-0 ${
                  isSelected ? "cursor-not-allowed " : "cursor-pointer"
                }`}
              >
                <div className="w-full rounded relative h-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-theme-blue text-white opacity-10 rounded"
                    style={{
                      width: `${result?.percentage}%`,
                      transition: "width 1s ease",
                    }}
                  ></div>
                  <div
                    className={`border h-full focus:outline-none  border-theme-border rounded p-2 w-full bg-transparent ${
                      isSelected ? "border-theme-blue" : ""
                    }`}
                    onClick={
                      !isSelected ? () => vote(option.optionId) : undefined
                    }
                  >
                    {option.text}
                  </div>
                </div>
              </div>
              {result && (
                <div className="flex justify-center items-center w-12 text-gray-500">
                  {result.percentage}%
                </div>
              )}
            </div>
          </div>
        );
      })}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Poll;
