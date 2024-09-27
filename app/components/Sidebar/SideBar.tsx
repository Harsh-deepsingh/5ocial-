"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconHome,
  IconSettings,
  IconShare3,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import cn from "../../lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const SidebarDemo = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <IconHome className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: `/profile/${userId}`,
      icon: <IconUser className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Communities",
      href: `/communities`,
      icon: <IconUsersGroup className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Shared posts",
      href: `/shared`,
      icon: <IconShare3 className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: `/setting`,
      icon: <IconSettings className="text-white h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "sticky top-2 rounded-md flex flex-col  md:flex-row bg-theme-grey lg:w-3/4 flex-1 max-w-7xl mx-auto border border-theme-border",
        "h-max"
        // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="sticky top-0 justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            {/* <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://yt3.googleusercontent.com/ytc/AIdro_lTZyk85Unp1xLt6uy0fjuknQNUub9JvrSqsj2ByRQ17Io=s900-c-k-c0x00ffffff-no-rj"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            /> */}
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
};

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Blindly Social
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <Image
      src="/favicon.ico"
      alt="Blindly Social"
      width="28"
      height="28"
    ></Image>
  );
};
