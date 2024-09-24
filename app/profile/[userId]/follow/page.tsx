"use client";
import { useState } from "react";
import Dashboard from "../../../components/Dashboard/Dashboard";
import Card from "../../../components/Card/Card";
import { SidebarDemo } from "../../../components/Sidebar/SideBar";
import UserFollow from "./UserFollow";
import Followers from "./Followers";
import Following from "./Following";
import Loading from "../../../components/Loading/Loading";
import { useSession } from "next-auth/react";
const Page = ({ params }: { params: { userId: string } }) => {
  const [activeButton, setActiveButton] = useState("Followers");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading></Loading>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
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
