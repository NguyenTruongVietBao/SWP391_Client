import React from 'react'
import ContentManagerPage from '../pages/ContentManager/ContentManagerPage'
import { Route, Routes } from 'react-router-dom'
import ReviewPage from '../pages/ContentManager/ReviewPage'
import DetailPage from '../pages/ContentManager/DetailPage'
import CreatePage from '../pages/ContentManager/CreatePage'
import UpdatePage from '../pages/ContentManager/UpdatePage'

export default function ContentManagerRouter() {
  return (
     <div>
        <Routes>
          <Route path='/' element={<ContentManagerPage/>}></Route>
          <Route path='create' element={<CreatePage/>}></Route>
          <Route path='update/:courseId' element={<UpdatePage/>}></Route>
          <Route path='review' element={<ReviewPage/>}></Route>
          <Route path='detail/:courseId' element={<DetailPage/>}></Route>
        </Routes>
     </div>
  )
}
