import React, { useEffect, useState } from 'react';
import BASE_URL from './constant/constant';
import { Route, Routes } from 'react-router-dom'
import { LoginContext } from './components/context/LoginContext';



import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Dashboard from "./components/Dashboard"
import Posts from './components/Posts';
import AddPost from './components/Posts/AddPost';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // check if token is present
    if (!token) {
      setIsSignedIn(false);
      setLoading(false);
      return;
    }
    verifyJwt(token);
  }, []);

  // function to verify token from server
  const verifyJwt = async (token) => {
    const response = await fetch(`${BASE_URL}/auth/verifyJWT`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": token,
      },
    });

    const data = await response.json();
    if (data.status) {
      setIsSignedIn(true);
      setLoading(false);
      return;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      setIsSignedIn(false);
    }

    console.log(data);
  };

  return (

    <>
      <div className="container w-full bg-gradient-to-r from-slate-200 via-cyan-50 to-slate-200 text-brand-dark">
        <LoginContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn }}>
          <Navbar />
        </LoginContext.Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* use context in Route path with login element */}

          <Route path='/login' element={
            <LoginContext.Provider value={{ isSignedIn, setIsSignedIn }}>
              <Login />
            </LoginContext.Provider>
          } />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/dashboard/posts" element={<Posts />} />
          <Route path="/dashboard/posts/add" element={<AddPost />} />




          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer />

      </div>

    </>
  )
}

export default App;
