import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";
import Feed from "./feed/Feed";
import { redirect } from "next/navigation";
import { SidebarDemo } from "./components/Sidebar/SideBar";
import Dashboard from "./components/Dashboard/Dashboard";

async function getUser() {
  //@ts-ignore
  const session = await getServerSession(authOptions);
  return session;
}

export default async function Home() {
  const session = await getUser();
  if (!session?.user) redirect("/signin");
  return (
    <div>
      <SidebarDemo>
        <Dashboard>
          <Feed />
        </Dashboard>
      </SidebarDemo>

      {/* {JSON.stringify(session)} */}
    </div>
  );
}
