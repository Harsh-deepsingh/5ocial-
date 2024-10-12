"use client";
import { useState, useEffect } from "react";
import { IconPointFilled, IconUsersGroup } from "@tabler/icons-react";
import { getCommunity } from "../../../lib/actions/getCommunity";
import Card from "../../../components/Card/Card";
import ProfileLetter from "../../../components/ProfilePicture/ProfileLetter";
import PostAction from "../../../components/PostComponents/PostAction";
import Line from "../../../components/Line/Line";
import { sharedPosts } from "../../../lib/actions/getSharedPost";
import Image from "next/image";
import Poll from "../../../feed/Poll";
import Dropdown from "../../../components/Dropdown/Dropdown";
import NoContent from "../../../components/NoContent/NoContent";
import Popup from "../../../components/Popup/Popup";
import { format } from "date-fns";

type community = {
  communityId: string;
  communityName: string;
};

type Post = {
  community: community;
  username: string | null | undefined;
  postId: string;
  content: string;
  date: string;
  imageUrl: string | null;
  userId: string;
  options: { optionId: string; text: string; postId: string }[];
}[];

const SharedPosts = ({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [communityName, setCommunityName] = useState<string | undefined>("");

  const take = 4;

  const loadMorePosts = async () => {
    setIsLoading(true);

    const skip = page * take;

    const res = await sharedPosts(
      communityId,
      sortOption,
      page + 1,
      skip,
      take
    );

    if (res?.posts) {
      setPosts((currentData) => [...currentData, ...res.posts]);
      setPage((currentPage) => currentPage + 1);
    }
    setIsLoading(false);
  };

  const onScroll = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading
    ) {
      await loadMorePosts();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    setPosts([]);

    async function getPosts() {
      const res = await sharedPosts(communityId, sortOption, 1, 0, take);

      if (res?.posts) {
        setPosts(res.posts);
      }
      setIsLoading(false);
    }

    getPosts();
  }, [sortOption, communityId]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLoading]);

  const handleSort = (data: string) => {
    setSortOption(data);
  };

  useEffect(() => {
    async function getCommunityId(communityId: string) {
      const community = await getCommunity(communityId);

      setCommunityName(community);
    }
    getCommunityId(communityId);
  }, [communityId]);

  return (
    <div>
      <>
        <Line></Line>
        <div className="mt-2 flex flex-row gap-2">
          <Dropdown sendSort={handleSort}></Dropdown>
          {communityName && (
            <div className="ml-7 flex gap-2 text-black mb-2 font-bold bg-white rounded-md justify-center items-center px-4 w-max py-2">
              <IconUsersGroup className="w-5 h-6 md:w-max md:h-max font-bold"></IconUsersGroup>
              <p>{communityName?.toUpperCase()}</p>
            </div>
          )}

          <Popup>
            Posts from users of other communities to{" "}
            {communityName ? communityName.toUpperCase() : "this community"}
          </Popup>
        </div>
      </>

      <div className="flex gap-2 flex-col">
        {isLoading && posts.length === 0 ? (
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
        ) : posts.length ? (
          <DateManipulation posts={posts} userId={userId}></DateManipulation>
        ) : (
          !isLoading && <NoContent />
        )}

        {isLoading && posts.length > 0 && (
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
      </div>
    </div>
  );
};

function DateManipulation({ posts, userId }: { posts: Post; userId: string }) {
  return (
    <>
      {posts?.map((post) => {
        const [day, month, year] = post.date.split(",")[0].split("/");
        const correctedDate = new Date(`${year}-${month}-${day}`);
        const formattedDate = format(correctedDate, "dd MMM");
        return (
          <div className="" key={post.postId}>
            <Card>
              <div className="mt-1">
                <div className="flex gap-3 h-max justify-start mb-9">
                  <ProfileLetter username={post.username}>
                    {post.username ? post.username[0].toUpperCase() : ""}
                  </ProfileLetter>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-lg flex gap-2 items-center">
                      {post.username}
                      <div className="text-xs text-theme-border flex justify-center items-start gap-1 flex-col sm:flex-row sm:items-center hidden sm:flex">
                        <div className="flex justify-center items-center">
                          <IconPointFilled className="w-2 h-2"></IconPointFilled>
                          <p>{formattedDate}</p>
                        </div>
                        <div className="flex justify-center items-center">
                          <IconPointFilled className="w-2 h-2"></IconPointFilled>
                          {post.community.communityName.toUpperCase()}
                        </div>
                      </div>
                    </p>
                    <p>{post.content}</p>
                    {post.imageUrl?.length && post.username ? (
                      <Image
                        src={post.imageUrl}
                        alt="Image"
                        width="500"
                        height="500"
                        className="rounded-md shadow-md shadow-black"
                      />
                    ) : null}
                    {post.options.length ? (
                      <Poll userId={userId} post={post.options}></Poll>
                    ) : null}
                  </div>
                </div>
                <Line></Line>
                <PostAction
                  postId={post.postId}
                  followingId={post.userId}
                  post={post}
                />
                <div className="text-theme-border flex items-center justify-between sm:hidden">
                  <div className="flex items-center">
                    <IconPointFilled className="w-2 h-2"></IconPointFilled>
                    <div className="text-xs">{post.date}</div>
                  </div>
                  <div className="flex justify-center items-center text-xs">
                    <IconPointFilled className="w-2 h-2"></IconPointFilled>
                    {post.community.communityName.toUpperCase()}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
}

export default SharedPosts;
