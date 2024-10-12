"use client";
import React, { useEffect, useState } from "react";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
import { Posts } from "../lib/actions/getPosts";
import Card from "../components/Card/Card";
import PostAction from "../components/PostComponents/PostAction";
import Line from "../components/Line/Line";
import Image from "next/image";
import Poll from "./Poll";
import Dropdown from "../components/Dropdown/Dropdown";
import { getCommunity } from "../lib/actions/getCommunity";
import { IconPointFilled, IconUsersGroup } from "@tabler/icons-react";
import NoContent from "../components/NoContent/NoContent";
import Popup from "../components/Popup/Popup";
import { format } from "date-fns";
type Post = {
  username: string | null | undefined;
  postId: string;
  content: string;
  date: string;
  imageUrl: string | null;
  userId: string;
  options: { optionId: string; text: string; postId: string }[];
}[];

const SubContent = ({
  params,
}: {
  params: { userId: string; communityId: string };
}) => {
  const userId = params.userId;
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [communityName, setCommunityName] = useState<string | undefined>("");
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const take = 4;

  const loadMorePosts = async () => {
    if (!hasMorePosts) return;

    setIsLoading(true);

    const skip = page * take;

    const res = await Posts(sortOption, page + 1, skip, take);
    if (res?.posts) {
      setPosts((currentData) => [...currentData, ...res.posts]);
      setPage((currentPage) => currentPage + 1);
    }

    if (res?.noMorePosts) {
      setHasMorePosts(false);
    }

    setIsLoading(false);
  };

  const onScroll = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading &&
      hasMorePosts
    ) {
      await loadMorePosts();
    }
  };

  useEffect(() => {
    async function getCommunityId(communityId: string) {
      const community = await getCommunity(communityId);
      setCommunityName(community);
    }
    getCommunityId(params.communityId);
  }, [params.communityId]);

  useEffect(() => {
    setPage(1);
    setPosts([]);
    setHasMorePosts(true);
    async function getPosts() {
      setIsLoading(true);
      const res = await Posts(sortOption, 1, 0, take);
      if (res?.posts) {
        setPosts(res?.posts);
      }

      if (res?.noMorePosts) {
        setHasMorePosts(false);
      }

      setIsLoading(false);
    }
    getPosts();
  }, [sortOption]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLoading, page, hasMorePosts]);

  const handleSort = (data: string) => {
    setSortOption(data);
  };

  return (
    <>
      <div className="flex flex-row gap-2">
        <Dropdown sendSort={handleSort}></Dropdown>
        {communityName && (
          <div className="ml-7 flex gap-2 text-black mb-2 font-bold bg-white rounded-md justify-center items-center px-4 w-max py-2">
            <IconUsersGroup className="w-5 h-6 md:w-max md:h-max font-bold"></IconUsersGroup>
            <p>{communityName?.toUpperCase()}</p>
          </div>
        )}
        <Popup>
          Only user&apos;s of{" "}
          {communityName ? communityName.toUpperCase() : "this community"} can
          see these posts
        </Popup>
      </div>
      <div className="flex gap-2 flex-col">
        {isLoading && posts.length === 0 ? (
          <div className="w-full flex items-center justify-center p-10 h-10">
            <div
              className="text-theme-blue inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <>
            {posts?.length ? (
              <DateManipulation
                posts={posts}
                userId={userId}
              ></DateManipulation>
            ) : (
              <>{!isLoading && <NoContent />}</>
            )}
          </>
        )}

        {isLoading && posts.length > 0 && hasMorePosts && (
          <div className="w-full flex items-center justify-center p-10 h-40">
            <div
              className="text-theme-blue inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}

        {!hasMorePosts && (
          <div className="w-full flex items-center justify-center text-gray-500">
            No more posts available
          </div>
        )}
      </div>
    </>
  );
};

export default SubContent;

const DateManipulation = ({
  posts,
  userId,
}: {
  posts: Post;
  userId: string;
}) => {
  return (
    <>
      {posts.map((post) => {
        const [day, month, year] = post.date.split(",")[0].split("/");
        const correctedDate = new Date(`${year}-${month}-${day}`);
        const formattedDate = format(correctedDate, "dd MMM");

        return (
          <div className="" key={post.postId}>
            <Card>
              <div className="mt-1">
                <div className="flex gap-3 h-max justify-start">
                  <ProfileLetter username={post.username}>
                    {post.username ? post.username[0].toUpperCase() : ""}
                  </ProfileLetter>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-lg flex gap-2 items-center">
                      {post.username}
                      <span className="text-xs text-theme-border flex justify-center items-center">
                        <IconPointFilled className="w-2 h-2"></IconPointFilled>
                        {formattedDate}
                      </span>
                    </p>
                    <p>{post.content}</p>
                    {post.imageUrl?.length && post.username ? (
                      <Image
                        src={post.imageUrl}
                        alt="Image"
                        width="500"
                        height="500"
                        className="rounded-md shadow-lg"
                      />
                    ) : null}
                    {post.options.length ? (
                      <>
                        <Poll userId={userId} post={post.options}></Poll>
                      </>
                    ) : null}
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
        );
      })}
    </>
  );
};
