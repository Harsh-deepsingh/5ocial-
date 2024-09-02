"use client";
import React from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useParams, useRouter } from "next/navigation";
const ViewCommunity = ({ communityId }: { communityId: string }) => {
  const router = useRouter();
  const prevUrl = "communities/sharedPosts";
  const handleClick = () => {
    router.push(`${prevUrl}/${communityId}`);
  };
  return (
    <div>
      <PrimaryButton onClick={handleClick}>View & Post</PrimaryButton>
    </div>
  );
};

export default ViewCommunity;
