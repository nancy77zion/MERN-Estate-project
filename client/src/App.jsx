//import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Sign from './pages/Sign'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/header'
import PrivateRoute from './components/PrivateRoute'


export default function App() {
  return (
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path='/' element={<Home /> } />
    <Route path='/sign-in' element={<Signin /> } />
    <Route path='/sign-up' element={<Sign /> } />
    <Route path='/about' element={<About /> } />
    <Route element={<PrivateRoute /> } >
      <Route path='/profile' element={<Profile /> } />
    </Route>
  </Routes>
  </BrowserRouter>
  )
}
