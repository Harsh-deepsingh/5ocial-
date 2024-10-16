"use client";
import cn from "../../lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { motion } from "framer-motion";
import {
  IconArrowLeft,
  IconHome,
  IconSearch,
  IconSettings,
  IconShare3,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col  w-[200px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "200px" : "60px") : "200px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
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
      href: "/communities",
      icon: <IconUsersGroup className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Shared posts",
      href: `/communities/sharedPosts/${userId}`,
      icon: <IconShare3 className="text-white h-5 w-5 flex-shrink-0" />,
    },
    // {
    //   label: "Search",
    //   href: "/search",
    //   icon: (
    //     <IconSearch className="text-white h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "Settings",
      href: "/setting",
      icon: <IconSettings className="text-white h-5 w-5 flex-shrink-0" />,
    },
  ];
  return (
    <>
      <div
        className={cn(
          "z-50 sticky top-0 h-10 px-6 py-6 flex md:hidden bg-theme-grey border border-theme-border w-full"
        )}
        {...props}
      >
        <div className="flex justify-between w-full items-center">
          {links.map((link, idx) => (
            <a key={idx} href={link.href}>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-white text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
