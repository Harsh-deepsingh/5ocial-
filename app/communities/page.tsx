import React, { Suspense } from "react";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Dashboard from "../components/Dashboard/Dashboard";
import Card from "../components/Card/Card";
import Communities from "./Communities";
import { getServerSession } from "next-auth";
import Loading from "../components/Loading/Loading";
import { authOptions } from "../lib/auth";
const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Access Denied. Please log in.</p>;
  }
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
