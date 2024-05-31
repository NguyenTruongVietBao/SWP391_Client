import React from 'react'
import "@fontsource/cormorant";
import "@fontsource/montserrat";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Parent/Home';
import About from '../pages/Parent/About/About';
import QandA from '../pages/Parent/QandA/QandA';
import Contact from '../pages/Parent/Contact/Contact';
import Discount from '../pages/Parent/Discount/Discount';
import Navbar from '../components/Parent/Header/Navbar';
import Footer from '../components/Parent/Footer/Footer';
import DetailCourse from '../pages/Parent/Course/DetailCourse';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';

export default function ParentRouter() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path='contact' element={<Contact/>}></Route>
          <Route path='' element={<Home/>}></Route>    
          <Route path='about' element={<About/>}></Route>
          <Route path='discount' element={<Discount/>}></Route>
          <Route path='qanda' element={<QandA/>}></Route>   
          <Route path="/course-detail" element={<DetailCourse/>}></Route> 
          <Route path="/login" element={<Login/>}></Route> 
          <Route path="/register" element={<Register/>}></Route> 
      </Routes>
      <Footer/>
    </>
  )
}
