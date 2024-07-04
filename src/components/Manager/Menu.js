import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../../redux/features/counterSlice';

export default function Menu() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    //logout
    const dispatch = useDispatch();
    const handleLogout = () => {
        navigate('/login')
        dispatch(logout())
    }
  return (
    <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">Manager<span className="text-indigo-400">.</span></h1>
        <p className="text-slate-400 text-sm mb-2">Welcome back</p>
        {/* User info */}
        <Link to={'./profile'} className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
            <div>
                <img className="rounded-full w-10 h-10 relative object-cover" src="./assets/admin-avatar.png" alt="a" />
            </div>
            <div>
                <p className="font-medium group-hover:text-indigo-400 leading-4">{user.first_name} {user.last_name}</p>
            </div>
        </Link>
        <hr className="my-2 border-slate-700" />
        {/* Menu */}
        <div id="menu" className="flex flex-col space-y-2 my-5">
            {/* Dashboard */}
            <Link to='/manager' className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Thống kê</p>
                        <p className="text-slate-400 text-sm hidden md:block">Doanh số bán hàng</p>
                    </div>
                </div>
            </Link>
            {/* Course */}
            <Link to={'/manager/course'} className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        
                    </div>
                    <div>
                        <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Khóa học</p>
                        <p className="text-slate-400 text-sm hidden md:block">Quản lý khóa học</p>
                    </div>
                </div>
            </Link>
            {/* Logout */}
            <span className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                    </div>
                    <div>
                        <button onClick={handleLogout}  className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Đăng xuất</button>
                    </div>
                </div>
            </span>
        </div>
        <p className="text-sm text-center text-gray-600">v2.0.3 | © 2024 VietBao</p>
    </div>
  )
}
