import React from 'react'
import "@fontsource/cormorant";
import "@fontsource/montserrat";
import { Link, Route, Routes  } from 'react-router-dom'
import Contact from '../components/Contact/Contact'
import About from '../components/About/About'
import QandA from '../components/QandA/QandA'

import Navbar from '../components/Parent/Header/Navbar';
import Footer from '../components/Parent/Footer/Footer';
import Body from '../components/Parent/Body/Body'
import Banner from '../components/Parent/Body/Banner'

export default function ParentRouter() {
  return (
    <div>
        <Link to={"/home/contact"}>contact</Link>
        {/* <Navbar/> */}
        <Routes>
            <Route path='/home/agency' element={<About/>}></Route>
            <Route path='./contact' element={<Contact/>}></Route>
            <Route path='/' element={<><Banner/> <Body/></>}></Route>    
            <Route path='/qanda' element={<QandA/>}></Route>    
        </Routes>
        {/* <Footer/> */}
    </div>
  )
}
