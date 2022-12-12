import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import logo from "../assets/images/logo.svg";
import BASE_URL from "../constant/constant";

const Login = ({ isSignedIn, setIsSignedIn }) => {
  const [userData, setUserData] = useState({});

  const Navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    // console.log(userData);
    const result = await submitLogin(userData);
    if (result) {
      setIsSignedIn(true);
    }
    localStorage.setItem("token", result.token);
    localStorage.setItem("auth", true);

    if (localStorage.getItem("token") && isSignedIn) {
      Navigate("/");
    }
  };

  const submitLogin = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    // render login page if jwt is not valid and empty
    !isSignedIn ? (
      <>
        <div className="h-[120vh] grid place-items-center">
          <div className=" bg-white rounded-lg px-8 py-16 grid place-items-center gap-16">
            <div className="text-center grid place-items-center gap-4 mt-4 text-brand-primary">
              <img
                draggable="false"
                src={logo}
                alt="tech blog logo"
                className="w-[10vw]"
              />
              <p className=" text-gray-600">
                Sign In with your cardinals or using google account
              </p>
            </div>
            <form onSubmit={handelSubmit} className="grid gap-4">
              <input
                className=" py-2 px-4 rounded-sm border"
                type="text"
                name="email"
                placeholder="Email"
                onChange={handelChange}
              />
              <input
                type="password"
                name="password"
                className=" py-2 px-4 rounded-sm border"
                placeholder="Password"
                onChange={handelChange}
              />
              <div className=" grid gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-brand-primary font-medium text-white py-3 px-4 rounded-md"
                >
                  Sign In
                </button>
                <div className=" flex justify-end hover:cursor-pointer text-sm  mt-[-0.5rem]">
                  <span className="text-brand-primary">Forget password?</span>
                </div>
                {/* or section */}
                <div className="relative text-center grid place-items-center">
                  <hr className="absolute my-4 mx-auto w-60 h-[.1rem] bg-gray-500 rounded border-0" />
                  <span className="px-1 py-1 z-10 text-gray-500 bg-white">
                    or
                  </span>
                </div>
                <button className="border font-medium px-4 py-3 rounded-md flex justify-center gap-2 items-center">
                  <FcGoogle className=" text-2xl" />
                  Login with Google
                </button>
              </div>
              <span className=" text-brand-primary text-sm hover:cursor-pointer">
                <span className="  ">Don't have an account? </span>
                <span className="text-sm font-medium">Sign Up</span>
              </span>
            </form>
          </div>
        </div>
      </>
    ) : (
      Navigate("/")
    )
  );
};

export default Login;
