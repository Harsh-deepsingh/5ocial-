"use client";
import Line from "../../components/Line/Line";
import Content from "../Content";
import Post from "./Post";
const Feed = async () => {
  return (
    <>
      <Post></Post>
      <Line></Line>
      <Content></Content>
    </>
  );
};

export default Feed;
