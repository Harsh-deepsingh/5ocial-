import React from "react";
import SharedPosts from "./SharedPosts";
import { SidebarDemo } from "../../../components/Sidebar/SideBar";
import Dashboard from "../../../components/Dashboard/Dashboard";
import Post from "../../../feed/Post";
import Card from "../../../components/Card/Card";

const page = ({ params }: { params: { sharedCommunityId: string } }) => {
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Card>
            <Post></Post>
          </Card>
          <SharedPosts communityId={params.sharedCommunityId}></SharedPosts>
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default page;
