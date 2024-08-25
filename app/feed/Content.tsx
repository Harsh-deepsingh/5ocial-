import React from "react";
import Card from "../components/Card/Card";
import PostAction from "../components/PostComponents/PostAction";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
import SubContent from "./SubContent";

const Content = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <Card>
        {children}
        <SubContent></SubContent>
        <PostAction></PostAction>
      </Card>
    </div>
  );
};

export default Content;
