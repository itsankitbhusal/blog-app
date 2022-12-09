import React from "react";
import Logo from "./navbar/Logo";
import Links from "./navbar/Links";
import Auth from "./navbar/Auth";

const Navbar = () => {
  return (
    <>
      <div className=" flex gap-4 justify-between items-center text-lg px-[5vw] py-[3vh] bg-slate-100">
        <Logo />
        <Links />
        <Auth />
      </div>
    </>
  );
};

export default Navbar;
