import React from 'react'
import ContentManagerPage from '../pages/ContentManager/ContentManagerPage'
import { Route, Routes } from 'react-router-dom'
import ReviewPage from '../pages/ContentManager/ReviewPage'
import DetailPage from '../pages/ContentManager/DetailPage'
import CreatePage from '../pages/ContentManager/CreatePage'
import ProfilePage from '../pages/ContentManager/ProfilePage'
import UpdatePage from '../pages/ContentManager/UpdatePage'
import UpdateQuizPage from "../pages/ContentManager/UpdateQuizPage";
import UpdatePage2 from "../pages/ContentManager/UpdatePage2";
import ListQuizPage from "../pages/ContentManager/ListQuizPage";

export default function ContentManagerRouter() {
  return (
     <div>
        <Routes>
          <Route path='/' element={<ContentManagerPage/>}></Route>
          <Route path='create' element={<CreatePage/>}></Route>
          <Route path='update/:courseId' element={<UpdatePage/>}></Route>
          <Route path='update2/:courseId' element={<UpdatePage2/>}></Route>
          <Route path='review' element={<ReviewPage/>}></Route>
          <Route path='profile' element={<ProfilePage/>}></Route>
          <Route path='detail/:courseId' element={<DetailPage/>}></Route>
          <Route path='update-quiz/:topicId' element={<UpdateQuizPage/>}></Route>
            <Route path='display-quiz/:topicId' element={<ListQuizPage/>}></Route>
        </Routes>
     </div>
  )
}
