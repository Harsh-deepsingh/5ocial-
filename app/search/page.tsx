"use client";
import React, { useState, useEffect } from "react";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Dashboard from "../components/Dashboard/Dashboard";
import Filter from "./Filter";
import Content from "../feed/Content";
import { auth } from "../lib/getSession";

const Search = () => {
  auth();
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Filter></Filter>
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default Search;
