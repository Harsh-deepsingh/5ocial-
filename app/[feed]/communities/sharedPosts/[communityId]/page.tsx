import React from "react";
import SharedPosts from "../SharedPosts";
import { SidebarDemo } from "../../../../components/Sidebar/SideBar";
import Dashboard from "../../../../components/Dashboard/Dashboard";

const page = ({
  params,
}: {
  params: { feed: string; communityId: string };
}) => {
  // const communityId = params.communityId;
  // console.log(communityId);
  console.log(params.communityId);
  console.log("Hi");

  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <SharedPosts></SharedPosts>
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default page;
