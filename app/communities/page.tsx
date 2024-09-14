import React, { Suspense } from "react";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Dashboard from "../components/Dashboard/Dashboard";
import Card from "../components/Card/Card";
import Communities from "./Communities";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import Loading from "../components/Loading/Loading";
const page = () => {
  return (
    <div>
      <Suspense fallback={<Loading></Loading>}>
        <SidebarDemo>
          <Dashboard>
            <Card>
              <Communities></Communities>
            </Card>
          </Dashboard>
        </SidebarDemo>
      </Suspense>
    </div>
  );
};

export default page;
