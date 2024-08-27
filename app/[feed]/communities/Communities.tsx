"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
const Communities = () => {
  const communities = [
    { id: 1, name: "Engineering Community" },
    { id: 2, name: "Medical Community" },
    { id: 3, name: "Law Community" },
    { id: 4, name: "Business Community" },
    { id: 4, name: "Business Community" },
  ];
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Explore Other Communities & Shared posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div
              key={community.id}
              className="p-6 border border-theme-border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">112 members</p>
                <p className="text-gray-600">112 Shared posts</p>
              </div>
              <div className="mt-2 w-32">
                <PrimaryButton onClick={handleClick}>View & Post</PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communities;
