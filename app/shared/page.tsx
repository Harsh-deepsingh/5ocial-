import React from "react";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Dashboard from "../components/Dashboard/Dashboard";
import SharedPosts from "../communities/sharedPosts/[sharedCommunityId]/SharedPosts";
import { logUserInfo } from "../lib/actions/getUsername";
const page = async () => {
  const data = await logUserInfo();
  const communityId = data?.communityId;

  // const res = await sharedPosts(communityId);
  // const posts = res.posts;
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <SharedPosts communityId={communityId}></SharedPosts>
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default page;
