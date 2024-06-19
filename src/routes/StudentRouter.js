
import StudentPage from "../pages/Student/StudentPage"
import Footer from '../components/Parent/Footer/Footer'
import { Route, Routes } from "react-router-dom"
import LoginStudent from "../pages/Login/LoginStudent"
import CourseLearningPage from "../pages/Student/CourseLearningPage"

function StudentRouter() {
  return (
    <Routes>
      <Route path="/" element={<> <StudentPage/><Footer/> </>}></Route>
      <Route path="/login" element={<LoginStudent/>}></Route>
      <Route path="/course/:courseId" element={<CourseLearningPage/>}></Route>
    </Routes>
  )
}

export default StudentRouter