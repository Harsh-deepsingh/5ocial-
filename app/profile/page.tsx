"use client";
import React, { useState } from "react";
import { Sidebar } from "../components/ui/sidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Card from "../components/Card/Card";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
import UserContent from "./UserContent";
import Content from "../feed/Content";

const Profile = () => {
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Card>
            <ProfileLetter />
            <p className="font-bold text-lg">Username</p>
            <div className="text-theme-border text-sm flex gap-2 font-bold">
              <div className="flex gap-1">
                <p className="text-white">1</p>
                <p>follower</p>
              </div>
              <div className="flex gap-1">
                <p className="text-white">1</p>
                <p>following</p>
              </div>
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
