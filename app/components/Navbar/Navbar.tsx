"use client";
import React from "react";
import SecButton from "../Buttons/SecButton";
import { signIn } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 flex p-3 bg-theme-grey border-b border-theme-border">
      <div className="flex items-center w-full justify-between">
        <p>5ocial</p>
        <div className="flex flex-row">
          <SecButton onClick={() => signIn()}>{"Login"}</SecButton>
          <SecButton>{"Home"}</SecButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
