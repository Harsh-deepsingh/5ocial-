"use client";
import { useEffect, useState } from "react";
import Dashboard from "../../../components/Dashboard/Dashboard";
import Card from "../../../components/Card/Card";
import { SidebarDemo } from "../../../components/Sidebar/SideBar";
import ProfileLetter from "../../../components/ProfilePicture/ProfileLetter";
import UserFollow from "./UserFollow";
import Followers from "./Followers";
import Following from "./Following";

const Page = ({ params }: { params: { userId: string } }) => {
  const [activeButton, setActiveButton] = useState("Followers");

  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Card>
            <UserFollow
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            ></UserFollow>
          </Card>
          <Card>
            {activeButton === "Followers" ? (
              <Followers params={params}></Followers>
            ) : (
              <Following params={params}></Following>
            )}
          </Card>
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default Page;
