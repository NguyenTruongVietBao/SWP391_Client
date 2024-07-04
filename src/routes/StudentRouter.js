
import StudentPage from "../pages/Student/StudentPage"
import Footer from '../components/Parent/Footer/Footer'
import { Route, Routes } from "react-router-dom"
import LoginStudent from "../pages/Login/LoginStudent"
import CourseDetail from "../pages/Student/CourseDetail"
import {LessonLearningPage} from "../pages/Student/LessonLearningPage";
import DoQuizTopic from "../pages/Student/DoQuizTopic";
import DoQuizChapter from "../pages/Student/DoQuizChapter";
import QuizPage from "../pages/Student/QuizPage";

function StudentRouter() {
  return (
      <Routes>
          <Route path="/" element={<> <StudentPage/><Footer/> </>}></Route>
          <Route path="/login" element={<LoginStudent/>}></Route>

          {/*learning*/}
          {/*<Route path="/course/:courseId/topic/:topicId" element={<CourseDetail/>}/>*/}
          <Route path="/course/:courseId" element={<CourseDetail/>}/>
          <Route path="/course/:courseId/topic/:topicId/lesson/:lessonId" element={<LessonLearningPage/>}></Route>

          {/*quiz*/}
          <Route path="/course/:courseId/quiz/topic/:topicId" element={<DoQuizTopic/>}></Route>
          <Route path="/course/:courseId/chapter/:chapterId/quiz" element={<DoQuizChapter/>}></Route>
          <Route path="/course/:courseId/topic/:topicId/quiz" element={<QuizPage/>} />
      </Routes>
  )
}

export default StudentRouter