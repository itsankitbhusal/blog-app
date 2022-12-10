import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

const Links = () => {
  return (
    <>
      <div className="links font-bold ">
        <ul className=" flex gap-6 items-center ">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
          <div className=" mx-8">
            <Auth />
          </div>
        </ul>
      </div>
    </>
  );
};

export default Links;
