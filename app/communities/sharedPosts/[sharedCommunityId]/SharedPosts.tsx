import React from "react";
import { IconUsersGroup } from "@tabler/icons-react";
import { getCommunity } from "../../../lib/actions/getCommunity";
import Card from "../../../components/Card/Card";
import ProfileLetter from "../../../components/ProfilePicture/ProfileLetter";
import PostAction from "../../../components/PostComponents/PostAction";
import Line from "../../../components/Line/Line";
import { sharedPosts } from "../../../lib/actions/getSharedPost";
import Image from "next/image";
import Poll from "../../../feed/Poll";
const SharedPosts = async ({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}) => {
  const communityName = await getCommunity(communityId);
  const res = await sharedPosts(communityId);
  const posts = res.posts;

  return (
    <div>
      <div className=" ml-7 flex gap-2 text-theme-blue mb-2 text-xs">
        <IconUsersGroup className="w-4 h-4"></IconUsersGroup>
        <p>{communityName}</p>
      </div>
      <div className="flex  gap-2 flex-col-reverse">
        {posts?.map((post) => (
          <div className="" key={post.postId}>
            <Card>
              <div className="mt-1">
                <div className="flex gap-2 text-theme-blue mb-2 text-xs">
                  <IconUsersGroup className="w-4 h-4"></IconUsersGroup>
                  <p>{post.community.communityName}</p>
                </div>
                <div className="flex gap-3 h-max justify-start ">
                  <ProfileLetter>
                    {post.username ? post.username[0].toUpperCase() : ""}
                  </ProfileLetter>
                  <div className=" w-full flex flex-col gap-2">
                    <p className="text-lg">{post.username}</p>
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
                    {post.options.length ? (
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
      </div>
    </div>
  );
};

export default SharedPosts;
