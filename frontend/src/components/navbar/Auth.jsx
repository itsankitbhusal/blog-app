import React from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div className="flex gap-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </>
  );
};

export default Auth;
