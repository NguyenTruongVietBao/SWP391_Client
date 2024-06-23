import React from 'react'
import "@fontsource/cormorant";
import "@fontsource/montserrat";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParentPage from '../pages/Parent/ParentPage';
import About from '../pages/Parent/About/About';
import QandA from '../pages/Parent/QandA/QandA';
import Contact from '../pages/Parent/Contact/Contact';
import Discount from '../pages/Parent/Discount/Discount';
import Navbar from '../components/Parent/Header/Navbar';
import Footer from '../components/Parent/Footer/Footer';
import DetailCourse from '../pages/Parent/Course/DetailCourse';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import ListCourse from '../pages/Parent/Course/ListCourse';
import Profile from '../pages/Parent/Profile';
import ListStudentPage from '../pages/Parent/ListStudentPage';
import CreateStudent from '../pages/Parent/CreateStudent';
import HistoryPayment from '../pages/Parent/HistoryPayment';
import ListCourseBought from '../pages/Parent/Course/ListCourseBought';
export default function ParentRouter() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path='contact' element={<Contact/>}></Route>
          <Route path='' element={<ParentPage/>}></Route>    
          <Route path='about' element={<About/>}></Route>
          <Route path='discount' element={<Discount/>}></Route>
          <Route path='qanda' element={<QandA/>}></Route>   
          <Route path="/course/:courseId" element={<DetailCourse/>}></Route> 
          <Route path="/profile" element={<Profile/>}></Route> 
          <Route path="/profile/students" element={<ListStudentPage/>}></Route> 
          <Route path="/profile/students/create" element={<CreateStudent/>}></Route> 
          <Route path="/profile/history" element={<HistoryPayment/>}></Route> 
          <Route path="my-course" element={<ListCourseBought/>}></Route>  
          {/* <Route path="/login" element={<Login/>}></Route>  */}
          {/* <Route path="/register" element={<Register/>}></Route>  */}
          <Route path="course" element={<ListCourse/>}></Route> 
      </Routes>
      <Footer/>
    </>
  )
}
