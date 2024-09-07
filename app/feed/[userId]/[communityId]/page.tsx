import Card from "../../../components/Card/Card";
import Dashboard from "../../../components/Dashboard/Dashboard";
import Line from "../../../components/Line/Line";
import { SidebarDemo } from "../../../components/Sidebar/SideBar";
import Content from "../../Content";
import Post from "../../Post";
const Feed = () => {
  return (
    <>
      <SidebarDemo>
        <Dashboard>
          <Card>
            <Post></Post>
          </Card>
          <Line></Line>
          <Content></Content>
        </Dashboard>
      </SidebarDemo>
    </>
  );
};

export default Feed;
