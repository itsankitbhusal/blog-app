import React from "react";

import { Link } from "react-router-dom";

const Auth = ({ isSignedIn, setIsSignedIn, loading }) => {
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    setIsSignedIn(false);
  };

  return (
    <>
      {loading ? (
        <div className="  bg-brand-primary text-white px-6 py-1.5 rounded-sm">
          User...
        </div>
      ) : (
        <div className="flex gap-4 ">
          {!isSignedIn ? (
            <Link
              to="/login"
              className=" bg-brand-primary text-white px-6 py-1.5 rounded-sm"
            >
              Sign In
            </Link>
          ) : (
            <Link
              className="bg-red-400 text-white px-6 py-1.5 rounded-sm"
              onClick={logOut}
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Auth;
