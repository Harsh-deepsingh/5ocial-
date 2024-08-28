import React from "react";
import Card from "../components/Card/Card";
import PostAction from "../components/PostComponents/PostAction";
import SubContent from "./SubContent";

const Content = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      {children}
      <SubContent></SubContent>
    </div>
  );
};

export default Content;
