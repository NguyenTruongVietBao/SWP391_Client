import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/features/counterSlice';

export default function Menu() {
    const user = useSelector(selectUser);

    //logout
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
  return (
    <div id="menu" className="bg-black/10 col-span-3 rounded-lg p-4 ">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-black via-black/70 to-transparent bg-clip-text text-transparent">
            Content 
            <p>Manager<span className="text-indigo-400">.</span></p>
        </h1>
        {/* User info */}
        <Link to={'/content-manager/update'} className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
            <div>
                <img className="rounded-full w-10 h-10 relative object-cover" src="./assets/admin-avatar.png" alt="a" />
            </div>
            <div>
                <p className="font-medium group-hover:text-indigo-400 leading-4">{user.username}</p>
            </div>
        </Link>
        
        <hr className="my-2 border-slate-700" />

        {/* Menu */}
        <div id="menu" className="flex flex-col space-y-2 my-5">
            {/* Dashboard */}
            <span  className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>
                    <div>       
                        <Link to={'/content-manager'}>            
                        <p className="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">Khóa học</p>
                        <p className="text-slate-900 text-sm hidden md:block">Quản lý khóa học</p>                           
                        </Link>
                    </div>
                </div>
            </span>
            {/* Course */}                
            <span href='#manage-course' className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
</svg>

                    </div>
                    <div>
                        <Link to={'/content-manager/review'}>
                        <p className="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">Câu hỏi</p>
                        <p className="text-slate-900 text-sm hidden md:block">Quản lý câu hỏi</p>
                        </Link>
                    </div>
                </div>
            </span>

            {/* Logout */}
            <span className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                    </div>
                    <div>
                        <Link onClick={handleLogout} className="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">Đăng xuất</Link>
                    </div>
                </div>
            </span>
        </div>

        <p className="text-sm text-center text-gray-600">v2.0.3 | © 2024 VietBao</p>
    </div>
  )
}
