import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import {  Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import MyOrders from './MyOrders/MyOrders';

function App() {
  const [showLogin, setShowLogin] = useState(false);


  return (
    <>
   {
  showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null
}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/MyOrders' element={<MyOrders/>} />
      </Routes>
      <Footer />
    </div>
    </>
  )
}

export default App
