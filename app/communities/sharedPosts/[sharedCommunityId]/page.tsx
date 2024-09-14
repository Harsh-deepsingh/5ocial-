import React, { Suspense } from "react";
import SharedPosts from "./SharedPosts";
import { SidebarDemo } from "../../../components/Sidebar/SideBar";
import Dashboard from "../../../components/Dashboard/Dashboard";
import Post from "../../../feed/Post";
import Card from "../../../components/Card/Card";
import Loading from "../../../components/Loading/Loading";

const page = ({ params }: { params: { sharedCommunityId: string } }) => {
  return (
    <div>
      <Suspense fallback={<Loading></Loading>}>
        <SidebarDemo>
          <Dashboard>
            <Card>
              <Post></Post>
            </Card>
            <SharedPosts communityId={params.sharedCommunityId}></SharedPosts>
          </Dashboard>
        </SidebarDemo>
      </Suspense>
    </div>
  );
};

export default page;
