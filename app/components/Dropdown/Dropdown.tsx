"use client";
import { SetStateAction, useState } from "react";

export default function Dropdown({
  sendSort,
}: {
  sendSort: (arg0: string) => void;
}) {
  const [sort, setSort] = useState("");

  const handleSortChange = (e: { target: { value: any } }) => {
    const newSortValue = e.target.value;
    setSort(newSortValue);
    sendSort(newSortValue);
  };

  return (
    <div className="flex justify-start mb-2 relative text-white">
      <select
        className="border border-theme-border p-2 bg-theme-grey rounded-md outline-none focus:outline-none"
        value={sort}
        onChange={handleSortChange}
      >
        <option value="latest">Latest</option>
        <option value="mostLiked">Most Liked</option>
        <option value="Controversial">Controversial</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
