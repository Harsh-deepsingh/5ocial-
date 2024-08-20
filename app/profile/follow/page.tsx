import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Card from "../../components/Card/Card";
import { SidebarDemo } from "../../components/Sidebar/SideBar";
import ProfileLetter from "../../components/ProfilePicture/ProfileLetter";
import UserFollow from "./UserFollow";

const page = () => {
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Card>
            <ProfileLetter></ProfileLetter>
            <p className="font-bold text-lg">Username</p>
            <UserFollow></UserFollow>
          </Card>
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default page;
