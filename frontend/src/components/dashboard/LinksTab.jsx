import React from "react";
import { Link } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";

const LinksTab = ({ name, value, hrefLink2, hrefLink, icon }) => {
  return (
    <>
      <Link
        to={hrefLink}
        className="my-4 flex gap-2 justify-start items-center"
      >
        <span>{icon}</span>
        {name}
      </Link>
      <ul className=" ml-4">
        <li>
          <Link
            to={hrefLink2}
            className=" flex gap-2 items-center justify-start"
          >
            <span>
              <IoAddCircle />
            </span>
            {value}
          </Link>
        </li>
      </ul>
    </>
  );
};

export default LinksTab;
