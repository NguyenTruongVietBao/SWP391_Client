import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {logout, selectUser} from '../../redux/features/counterSlice';

export default function Menu() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login')
        dispatch(logout())
    }
    
  return (
    <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent mb-2">
            Admin<span className="text-indigo-400">.</span>
        </h1>
        {/* User info */}
        <a href="/" className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
            <div>
                <img className="rounded-full w-10 h-10 relative object-cover" src='/assets/admin-avatar.png' alt="a" />
            </div>
            <div>
                <p className="font-medium group-hover:text-indigo-400 leading-4">{user.username}</p>
                <span className="text-xs text-slate-400">Admin handsome</span>
            </div>                        
        </a>
        <div>
        </div>
        <hr className="my-2 border-slate-700" />
        {/* Menu */}
        <div id="menu" className="flex flex-col space-y-2 my-5">
            {/* Profile */}
            <span className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <Link to={'/admin'}>
                        <div>
                            <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Bảng điều khiển</p>
                            <p className="text-slate-400 text-sm hidden md:block">Quản lý người dùng</p>
                        </div>
                    </Link>  
                </div>
            </span>
            {/* Logout */}
            <span className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                    </div>
                    <div>
                        <button onClick={handleLogout} className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Đăng xuất</button>
                    </div>
                </div>
            </span>
        </div>
        <p className="text-sm text-center text-gray-800">v2.0.3 | © 2024 VietBao</p>
    </div>
  )
}
