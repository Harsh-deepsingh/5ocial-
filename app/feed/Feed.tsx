"use client";
import Line from "../components/Line/Line";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Content from "./Content";
import Post from "./Post";
import Dashboard from "../components/Dashboard/Dashboard";

const Feed = () => {
  return (
    <>
      <Post></Post>
      <Line></Line>
      <Content></Content>
    </>
  );
};

export default Feed;
