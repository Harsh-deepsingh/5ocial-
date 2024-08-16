"use client";
import Line from "../components/Line/Line";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Content from "./Content";
import Post from "./Post";
import Dashboard from "../components/Dashboard/Dashboard";

const Feed = () => {
  return (
    <>
      <SidebarDemo>
        <Dashboard>
          <Post></Post>
          <Line></Line>
          <Content></Content>
        </Dashboard>
      </SidebarDemo>
    </>
  );
};

export default Feed;
