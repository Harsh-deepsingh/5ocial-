import React from "react";
import Card from "../../Card/Card";
import ProfileLetter from "../../ProfilePicture/ProfileLetter";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Poll from "../../../feed/Poll";
type Post = {
  username: string | null | undefined;
  postId: string;
  content: string;
  date: string;
  imageUrl: string | null;
  userId: string;
  options: { optionId: string; text: string; postId: string }[];
};

const CommentModal = ({
  isOpen,
  onClose,
  post,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  post?: Post;
  userId?: string;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-auto backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="md:w-3/6 mt-11 sm:w-4/5"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {post && userId ? (
              <Card>
                <div>
                  <button className="text-white text-3xl" onClick={onClose}>
                    &times;
                  </button>
                </div>
                <div className="flex flex-col gap-5 text-white">
                  <Card>
                    <div className="flex gap-3 h-max justify-start">
                      {post.username && (
                        <ProfileLetter username={post.username}>
                          {post.username ? post.username[0].toUpperCase() : ""}
                        </ProfileLetter>
                      )}

                      <div className="w-full flex flex-col gap-2">
                        {post.username && (
                          <p className="text-lg">{post.username}</p>
                        )}
                        <p>{post.content}</p>
                        {post.imageUrl?.length && post.username ? (
                          <Image
                            src={post.imageUrl}
                            alt="Image"
                            width="500"
                            height="500"
                            className="rounded-md shadow-lg"
                          ></Image>
                        ) : null}
                        {post.options && post.options.length ? (
                          <>
                            <Poll userId={userId} post={post.options}></Poll>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                  <div className="w-full flex flex-col justify-between gap-1">
                    <div className="flex flex-col">
                      <div className="flex gap-2 justify-start items-start">
                        <div className="w-full">
                          <CommentInput postId={post.postId} userId={userId} />
                        </div>
                      </div>
                      <div className="flex w-full mt-2">
                        <Comments postId={post.postId} userId={userId} />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(CommentModal);
