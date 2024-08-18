import React from "react";
import Card from "../components/Card/Card";
import PostAction from "../components/PostComponents/PostAction";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
import SubContent from "./SubContent";
const Content = () => {
  return (
    <div>
      <Card>
        <SubContent></SubContent>
        <PostAction></PostAction>
      </Card>
    </div>
  );
};

export default Content;
