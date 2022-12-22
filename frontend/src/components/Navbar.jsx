import React from "react";
import Logo from "./navbar/Logo";
import Links from "./navbar/Links";

const Navbar = () => {
  return (
    <>
      <div className="w-full flex gap-4 justify-between items-center text-lg px-[10vw] py-[3vh] bg-white backdrop-blur-3xl bg-opacity-50 drop-shadow-2xl">
        <Logo />
        <Links />
      </div>
    </>
  );
};

export default Navbar;
