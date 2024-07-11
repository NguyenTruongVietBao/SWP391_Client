import React from 'react'
import ManagerPage from '../pages/Manager/ManagerPage'
import {Route, Routes} from "react-router-dom";
import CoursePage from "../pages/Manager/CoursePage";
import {CourseDetailPage} from "../pages/Manager/CourseDetail.page";
import DetailDayPage from "../pages/Manager/DetailDayPage";
import DetailMonthPage from "../pages/Manager/DetailMonthPage";
import DetailYearPage from "../pages/Manager/DetailYearPage";
import ListCourse from "../pages/Manager/ListCourse";
import ListUser from "../pages/Manager/ListUser";

function ManagerRouter() {
  return (
      <div>
          <Routes>
              <Route path='/' element={<ManagerPage/>}></Route>
              <Route path='/course' element={<CoursePage/>}></Route>
              <Route path='/course/:courseId' element={<CourseDetailPage/>}></Route>

              <Route path='/day' element={<DetailDayPage/>}></Route>
              <Route path='/month' element={<DetailMonthPage/>}></Route>
              <Route path='/year' element={<DetailYearPage/>}></Route>

              <Route path='/courses/' element={<ListCourse/>}></Route>
              <Route path='/users/' element={<ListUser/>}></Route>
          </Routes>
      </div>
  )
}

export default ManagerRouter