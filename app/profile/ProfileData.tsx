"use client";
import React from "react";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
import Card from "../components/Card/Card";
import PostAction from "../components/PostComponents/PostAction";
import Line from "../components/Line/Line";
import NoContent from "../components/NoContent/NoContent";
import Image from "next/image";
import Poll from "../feed/Poll";
type post =
  | {
      username: string | null | undefined;
      postId: string;
      content: string;
      userId: string;
      communityId: string;
      shared: boolean;
      sharedCommunity: string | null;
      date: string;
      imageUrl: string;
      options: { optionId: string; text: string; postId: string }[];
    }[]
  | undefined;

const ProfileData = ({
  userId,
  post,
  username,
}: {
  post: post;
  username: string;
  userId: string;
}) => {
  return (
    <div className="flex  gap-2 flex-col-reverse">
      {post == undefined || post.length < 1 ? (
        <NoContent></NoContent>
      ) : (
        <>
          {post?.map((post) => (
            <div className="" key={post.postId}>
              <Card>
                <div className="mt-1">
                  <div className="flex gap-3 h-max justify-start ">
                    <ProfileLetter username={username}>
                      {username ? username[0].toUpperCase() : ""}
                    </ProfileLetter>
                    <div className=" w-full flex flex-col gap-2">
                      <p className="text-lg">{username}</p>
                      <p>{post.content}</p>
                      {post.imageUrl?.length ? (
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
