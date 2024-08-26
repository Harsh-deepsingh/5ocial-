"use client";
import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { SidebarDemo } from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import ProfileLetter from "../../components/ProfilePicture/ProfileLetter";
import UserContent from "./UserContent";
import FollowUser from "./FollowUser";
import Content from "../Content";

const Profile = () => {
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Card>
            <ProfileLetter>H</ProfileLetter>
            <p className="font-bold text-lg">Username</p>
            <div className="flex gap-2">
              <FollowUser></FollowUser>
            </div>
            <UserContent></UserContent>
          </Card>
          <Content></Content>
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default Profile;
