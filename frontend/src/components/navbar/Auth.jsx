import React from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div className="flex gap-4 ">
        <Link
          to="/login"
          className=" bg-brand-primary text-white px-6 py-1.5 rounded-sm"
        >
          Sign In
        </Link>
        {/* <Link to="/register">Register</Link> */}
      </div>
    </>
  );
};

export default Auth;
