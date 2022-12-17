import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import BASE_URL from "../constant/constant";
import { LoginContext } from "./context/LoginContext";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const Login = () => {
  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });
  });
  const [userData, setUserData] = useState({});

  const { setIsSignedIn, isSignedIn } = useContext(LoginContext);

  const Navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
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

  // make post request to submit login cardinals
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

  // for login inputs
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // google response
  const responseGoogle = async (response) => {
    const { email, givenName, familyName } = response.profileObj;

    const userData = { email, givenName, familyName };
    // send access token and profile info to backend
    // console.log(email, givenName, familyName);
    const result = await postGoogleData(userData);
    // console.log(result);

    if (result.status) {
      setIsSignedIn(true);
    }
    localStorage.setItem("token", result.token);
    localStorage.setItem("auth", true);

    if (localStorage.getItem("token") && isSignedIn) {
      Navigate("/");
    }
  };

  // making post request for google verification on server
  const postGoogleData = async (user) => {
    const response = await fetch(`${BASE_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
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

                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Login with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="none"
                />
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
