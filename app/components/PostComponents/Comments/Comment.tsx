"use client";
import React, { useState } from "react";
import CommentModal from "./CommentModal";
import Card from "../../Card/Card";
import SubContent from "../../../[feed]/SubContent";
import Post from "../../../[feed]/Post";

const Comment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="text-theme-border hover:text-theme-blue w-min">
      <button onClick={openModal}>
        <div className="bg-transparent hover:bg-[#00aeff20] p-1.5 rounded-full flex justify-center items-center gap-1 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.4em"
            height="1.4em"
            viewBox="0 0 24 24"
            className="stroke-[#3F454B] group-hover:stroke-theme-blue"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 4H5a2 2 0 0 0-2 2v15l3.467-2.6a2 2 0 0 1 1.2-.4H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
            />
          </svg>
          <p className="text-xs font-bold">20</p>
        </div>
      </button>
      <CommentModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-5 text-white">
          <Card>
            <SubContent></SubContent>
          </Card>
          <Post></Post>
        </div>
      </CommentModal>
    </div>
  );
};

export default Comment;
