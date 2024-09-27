"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { SidebarDemo } from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import ProfileLetter from "../../components/ProfilePicture/ProfileLetter";
import FollowUser from "../FollowUser";
import ProfileData from "../ProfileData";
import { useParams } from "next/navigation";
import axios from "axios";
import UserContent from "../UserContent";
import Loading from "../../components/Loading/Loading";
import { useSession } from "next-auth/react";
type post =
  | {
      username: string | null | undefined;
      postId: string;
      content: string;
      userId: string;
      communityId: string;
      shared: boolean;
      sharedCommunity: string | null;
    }[]
  | undefined;
const Profile = () => {
  const { data: session, status } = useSession();
  const data: { userId: string } = useParams();
  const userId = data.userId;

  const [activeButton, setActiveButton] = useState("Post");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<post>([]);
  const [username, setUsername] = useState<string>("");
  const [likedPosts, setLikedPosts] = useState<post>([]);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProfileData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?userId=${userId}`
        );

        if (res) {
          setPost(res.data.data.posts);
          const data = res.data;
          const profileData = data.profileUsername;
          setUsername(profileData.username);
          setLikedPosts(res.data.likedPosts);
          setComments(res.data.data.comment);
        } else {
          return "userId invalid";
        }
      } catch (err) {
        console.error("Failed to fetch profile data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [userId]);
  if (status === "loading") {
    return <Loading></Loading>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  const sharedPosts = post?.filter((p) => p.shared === true);
  const nonSharedPosts = post?.filter((p) => p.shared === false);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Card>
            <ProfileLetter>
              {username ? <> {username[0].toUpperCase()}</> : <></>}
            </ProfileLetter>
            <p className="font-bold text-lg">{username}</p>
            <div className="flex gap-2">
              <FollowUser userId={userId}></FollowUser>
            </div>
            <UserContent
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            ></UserContent>
          </Card>
          {activeButton === "Post" ? (
            <ProfileData post={nonSharedPosts} username={username} />
          ) : activeButton === "Likes" ? (
            <ProfileData post={likedPosts} username={username} />
          ) : activeButton === "Comments" ? (
            <ProfileData post={comments} username={username} />
          ) : activeButton === "Shared Posts" ? (
            <ProfileData post={sharedPosts} username={username} />
          ) : (
            <div>Select a valid option</div>
          )}
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default Profile;
