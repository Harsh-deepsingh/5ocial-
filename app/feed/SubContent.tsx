import React from "react";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
import { Posts } from "../lib/actions/getPosts";
import Card from "../components/Card/Card";
import PostAction from "../components/PostComponents/PostAction";
import Line from "../components/Line/Line";

const SubContent = async () => {
  const res = await Posts();
  const posts = res?.posts;

  return (
    <div className="flex gap-2 flex-col-reverse">
      {posts?.length && posts.length > 0 ? (
        posts.map((post) => (
          <div className="" key={post.postId}>
            <Card>
              <div className="mt-1">
                <div className="flex gap-3 h-max justify-start">
                  <ProfileLetter>
                    {post.username ? post.username[0].toUpperCase() : ""}
                  </ProfileLetter>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-lg">{post.username}</p>
                    <p>{post.content}</p>
                  </div>
                </div>
                <Line />
                <PostAction
                  postId={post.postId}
                  followingId={post.userId}
                  post={post}
                />
              </div>
            </Card>
          </div>
        ))
      ) : (
        <>No posts yet!</>
      )}
    </div>
  );
};

export default SubContent;
