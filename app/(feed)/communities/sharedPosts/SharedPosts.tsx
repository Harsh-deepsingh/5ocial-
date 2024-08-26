"use client";
import React from "react";
import { IconUsersGroup } from "@tabler/icons-react";
import Content from "../../Content";

const SharedPosts = () => {
  return (
    <div>
      <Content>
        <div className="flex gap-2 text-theme-border text-sm font-bold">
          <IconUsersGroup></IconUsersGroup>
          <p>Community name</p>
        </div>
      </Content>
    </div>
  );
};

export default SharedPosts;
