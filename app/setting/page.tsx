import React from "react";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Dashboard from "../components/Dashboard/Dashboard";
import Card from "../components/Card/Card";

const page = () => {
  return (
    <SidebarDemo>
      <Dashboard>
        <Card>Hello World!</Card>
      </Dashboard>
    </SidebarDemo>
  );
};

export default page;
