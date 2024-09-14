"use client";
import { useState } from "react";
import Dashboard from "../../../components/Dashboard/Dashboard";
import Card from "../../../components/Card/Card";
import { SidebarDemo } from "../../../components/Sidebar/SideBar";
import UserFollow from "./UserFollow";
import Followers from "./Followers";
import Following from "./Following";
import Loading from "../../../components/Loading/Loading";

const Page = ({ params }: { params: { userId: string } }) => {
  const [activeButton, setActiveButton] = useState("Followers");
  const [loading, setLoading] = useState(false);

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
            {loading ? (
              <Loading />
            ) : activeButton === "Followers" ? (
              <Followers params={params} setLoading={setLoading}></Followers>
            ) : (
              <Following params={params} setLoading={setLoading}></Following>
            )}
          </Card>
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default Page;
