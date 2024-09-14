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

const Profile = () => {
  const data = useParams();
  const userId = data.userId;

  const [activeButton, setActiveButton] = useState("Post");
  const [post, setPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("Loading");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/profile?userId=${userId}`
        );

        if (res) {
          setPost(res.data.data.posts);
          setUsername(res.data.profileUsername.username);
          setLikedPosts(res.data.likedPosts);
          setComments(res.data.data.comment);
        } else {
          return "userId invalid";
        }
      } catch (err) {
        return "Failed to fetch profile data";
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [userId]);

  const sharedPosts = post.filter((p) => p.shared === true);
  const nonSharedPosts = post.filter((p) => p.shared === false);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Card>
            <ProfileLetter>{username[0].toUpperCase()}</ProfileLetter>
            <p className="font-bold text-lg">{username}</p>
            <div className="flex gap-2">
              <FollowUser userId={userId} username={username}></FollowUser>
            </div>
            <UserContent
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            ></UserContent>
          </Card>
          {activeButton === "Post" ? (
            <ProfileData
              post={nonSharedPosts}
              username={username}
              userId={userId}
            />
          ) : activeButton === "Likes" ? (
            <ProfileData
              post={likedPosts}
              username={username}
              userId={userId}
            />
          ) : activeButton === "Comments" ? (
            <ProfileData post={comments} username={username} userId={userId} />
          ) : activeButton === "Shared Posts" ? (
            <ProfileData
              post={sharedPosts}
              username={username}
              userId={userId}
            />
          ) : (
            <div>Select a valid option</div>
          )}
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default Profile;
