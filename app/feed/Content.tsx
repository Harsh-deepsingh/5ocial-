import React from "react";
import SubContent from "./SubContent";

const Content = ({
  children,
  params,
}: {
  children?: React.ReactNode;
  params: { userId: string; communityId: string };
}) => {
  return (
    <div>
      {children}
      <SubContent params={params}></SubContent>
    </div>
  );
};

export default Content;
