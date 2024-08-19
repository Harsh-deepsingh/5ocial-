import React from "react";
import { Sidebar } from "../../components/ui/sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";
import Card from "../../components/Card/Card";
import { SidebarDemo } from "../../components/Sidebar/SideBar";

const page = () => {
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Card>HELLO</Card>
        </Dashboard>
      </SidebarDemo>
    </div>
  );
};

export default page;
