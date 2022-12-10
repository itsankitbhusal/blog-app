import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'


const App = () => {
  return (

    <>
      <div className="container w-full bg-gradient-to-r from-slate-200 via-cyan-50 to-slate-200 text-brand-dark">

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>

    </>
  )
}

export default App