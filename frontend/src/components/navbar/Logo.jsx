import React from "react";
import LogoSvg from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <Link to="/">
        <img
          draggable={false}
          src={LogoSvg}
          alt="Blog Logo"
          className=" w-[7vw]"
        />
      </Link>
    </>
  );
};

export default Logo;
