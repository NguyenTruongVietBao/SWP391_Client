
import StudentPage from "../pages/Student/StudentPage"
import Footer from '../components/Parent/Footer/Footer'
import { Route, Routes } from "react-router-dom"
import DetailPage from "../pages/Student/DetailPage"

function StudentRouter() {
  return (
    <Routes>
      <Route path="/" element={<> <StudentPage/><Footer/> </>}></Route>
      <Route path="/detail/:courseId" element={<DetailPage/>}></Route>
    </Routes>
  )
}

export default StudentRouter