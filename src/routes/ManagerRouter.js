import React from 'react'
import ManagerPage from '../pages/Manager/ManagerPage'
import {Route, Routes} from "react-router-dom";
import CoursePage from "../pages/Manager/CoursePage";
import {CourseDetailPage} from "../pages/Manager/CourseDetail.page";

function ManagerRouter() {
  return (
      <div>
          <Routes>
              <Route path='/' element={<ManagerPage/>}></Route>
              <Route path='/course' element={<CoursePage/>}></Route>
              <Route path='/course/:courseId' element={<CourseDetailPage/>}></Route>
          </Routes>
      </div>
  )
}

export default ManagerRouter