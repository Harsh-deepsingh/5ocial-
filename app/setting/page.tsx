"use client";
import React, { useState } from "react";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Dashboard from "../components/Dashboard/Dashboard";
import Card from "../components/Card/Card";
import SettingComponent from "../components/SettingComponent";
import Logout from "./Logout";
import Delete from "./Delete";
import Feedback from "./Feedback";
import { IconArrowLeft } from "@tabler/icons-react";
const Page = () => {
  const [activeButton, setActiveButton] = useState("");

  const handleBack = () => {
    setActiveButton("");
  };

  return (
    <SidebarDemo>
      <Dashboard>
        <Card>
          {activeButton === "" ? (
            <>
              <SettingComponent
                main="Logout"
                mainInfo="Logout from your account"
                onClick={() => setActiveButton("logout")}
              ></SettingComponent>
              <SettingComponent
                onClick={() => setActiveButton("delete")}
                main="Delete Account"
                mainInfo="Delete your account permanently, once deleted it can't be recovered"
              ></SettingComponent>
              <SettingComponent
                onClick={() => setActiveButton("feedback")}
                main="Feedback"
                mainInfo="Give feedback to the developers of the application."
              ></SettingComponent>
            </>
          ) : (
            <>
              <div className="mb-4">
                <IconArrowLeft
                  className="cursor-pointer "
                  onClick={handleBack}
                />
              </div>
              {activeButton === "logout" && <Logout />}
              {activeButton === "delete" && <Delete />}
              {activeButton === "feedback" && <Feedback />}
            </>
          )}
        </Card>
      </Dashboard>
    </SidebarDemo>
  );
};

export default Page;
