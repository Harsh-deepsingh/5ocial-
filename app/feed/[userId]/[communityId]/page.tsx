import { Suspense } from "react";
import Card from "../../../components/Card/Card";
import Dashboard from "../../../components/Dashboard/Dashboard";
import Line from "../../../components/Line/Line";
import { SidebarDemo } from "../../../components/Sidebar/SideBar";
import Content from "../../Content";
import Post from "../../Post";
import Loading from "../../../components/Loading/Loading";
const Feed = ({ params }: { params: string }) => {
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        <SidebarDemo>
          <Dashboard>
            <Card>
              <Post></Post>
            </Card>
            <Line></Line>
            <Content></Content>
          </Dashboard>
        </SidebarDemo>
      </Suspense>
    </>
  );
};

export default Feed;
