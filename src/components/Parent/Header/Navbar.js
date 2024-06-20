import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../../services/UserService/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../redux/features/counterSlice';


export default function Navbar() {
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  const user = useSelector(selectUser);
  console.log(user);
  
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden ">
      <div className="bg-gradient-to-r from-mathcha via-white to-mathcha flex flex-col items-center justify-center w-full py-2">
        <div className="px-3 relative xl:px-0 sm:px-3 flex max-w-[1180px] items-center justify-between w-full">
            {/* LOGO */}
            <div className="cursor-pointer">
                <Link to='/'>
                  <img src='/assets/Logo-removebg.png' alt='123' width={170}/>
                </Link>
            </div>
            {/* MENU */}
            <div className="hidden sm:text-lg text-2xl text-[#2D4263] font-normal md:flex md:flex-row items-center sm:gap-2.5 md:gap-[50px]">
              <Link to={'/about'}>
                <div className='font-bold'>Trung tâm</div>
              </Link>
              <Link to={'/discount'}>
                <div className='font-bold'>Ưu đãi</div>
              </Link>
              <Link to={'/contact'}>
                <div className='font-bold'>Liên hệ</div>
              </Link>
              <Link to={'/qanda'}>
                <div className='font-bold'>Hỏi đáp</div>
              </Link>
            {/* LOGIN */}
            {
              user == null ?   
                <Link 
                  className="flex items-center font-Cormorant px-5 py-3 rounded-[68px] bg-mathcha-orange !font-bold hover:text-white duration-1000 hover:bg-mathcha-green hover:border-white"
                  font="text-white font-normal"  to={"/login"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Đăng nhập
                </Link> :  
                <div className='flex'>
                  <img src='./assets/admin-avatar.png' alt='a' className='rounded-full w-10'/>
                  <Link 
                    className="flex items-center font-Cormorant px-1 py-1 rounded-lg !font-bold hover:text-white duration-1000 hover:bg-mathcha-green hover:border-white"
                    font="text-white font-normal" onClick={handleLogout} to={'/'}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                      </svg>
                      Đăng xuất
                  </Link>
                </div>
            }
            </div>           
        </div>
      </div>
      {/* <nav>
        <ul>
          {!isAuthenticated && <li><Link to={'/'}>Home</Link></li>}
          {isAuthenticated && <li><Link to={'/'} onClick={handleLogout}>Logout</Link></li>}
          {isAdmin && <li><Link to={'/admin'}>Admin</Link></li>}  
        </ul>
      </nav> */}
    </div>
  )
}
