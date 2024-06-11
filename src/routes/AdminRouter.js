import React from 'react'
import AdminPage from '../pages/Admin/AdminPage'
import UpdatePage from '../pages/Admin/UpdatePage'
import { Route, Routes } from 'react-router-dom'
import CreatePage from '../pages/Admin/CreatePage'

export default function AdminRouter() {
  return (
      <Routes>
          <Route path='/' element={<AdminPage/>}></Route>
          
          <Route path='create' element={<CreatePage/>}></Route>
          <Route path='update/:userId' element={<UpdatePage/>}></Route>
      </Routes>
  )
}
