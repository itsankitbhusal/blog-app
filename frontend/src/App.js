import React, { useEffect, useState } from 'react';
import BASE_URL from './constant/constant';
import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    verifyJwt(localStorage.getItem("token"));
  }, []);

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

        <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} loading={loading} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />


          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer />

      </div>

    </>
  )
}

export default App