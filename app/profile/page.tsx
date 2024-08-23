"use client";
import React, { useState } from "react";
import { Sidebar } from "../components/ui/sidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Card from "../components/Card/Card";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
import UserContent from "./UserContent";
import Content from "../feed/Content";
import FollowUser from "./FollowUser";
import { auth } from "../lib/getSession";

const Profile = () => {
  auth();
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Card>
            <ProfileLetter />
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
