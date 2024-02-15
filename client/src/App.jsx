//import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Sign from './pages/Sign'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/header'


export default function App() {
  return (
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path='/' element={<Home /> } />
    <Route path='/sign-in' element={<Signin /> } />
    <Route path='/sign-up' element={<Sign /> } />
    <Route path='/about' element={<About /> } />
    <Route path='/profile' element={<Profile /> } />
  </Routes>
  </BrowserRouter>
  )
}
