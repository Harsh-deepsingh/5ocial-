"use client";
import React from "react";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
import Card from "../components/Card/Card";
import PostAction from "../components/PostComponents/PostAction";
import Line from "../components/Line/Line";
type post =
  | {
      postId: string;
      content: string;
      userId: string;
      communityId: string;
      shared: boolean;
      sharedCommunity: string | null;
    }[]
  | undefined;

const ProfileData = ({ post, username }: { post: post; username: string }) => {
  return (
    <div className="flex  gap-2 flex-col-reverse">
      {post == undefined || post.length < 1 ? (
        <>No posts yet!</>
      ) : (
        <>
          {post?.map((post) => (
            <div className="" key={post.postId}>
              <Card>
                <div className="mt-1">
                  <div className="flex gap-3 h-max justify-start ">
                    <ProfileLetter>
                      {username ? username[0].toUpperCase() : ""}
                    </ProfileLetter>
                    <div className=" w-full flex flex-col gap-2">
                      <p className="text-lg">{username}</p>
                      <p>{post.content}</p>
                    </div>
                  </div>
                  <Line></Line>
                  <PostAction
                    postId={post.postId}
                    followingId={post.userId}
                    post={post}
                  ></PostAction>
                </div>
              </Card>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProfileData;
