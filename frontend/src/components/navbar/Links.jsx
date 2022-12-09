import React from "react";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <>
      <div className="links ">
        <ul className=" flex gap-4">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Links;
