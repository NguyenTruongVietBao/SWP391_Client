import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/features/counterSlice';

export default function Menu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
        dispatch(logout());
    };

    const linkClasses = 'hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group';
    const activeLinkClasses = 'bg-mathcha-orange text-white';

    return (
        <div id="menu" className="col-span-3 rounded-lg p-4 border bg-black/10">
            <hr className="my-2 border-slate-700" />
            <div id="menu" className="flex flex-col space-y-2 my-5 border border-black">
                {/* Profile */}
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                    }
                >
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-base text-black lg:text-lg leading-4 group-hover:text-mathcha-orange">Hồ sơ</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink
                    to="/profile/students"
                    className={({ isActive }) =>
                        isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                    }
                >
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-base text-black lg:text-lg leading-4 group-hover:text-mathcha-orange">Danh sách học sinh</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink
                    to="/profile/history"
                    className={({ isActive }) =>
                        isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                    }
                >
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-base text-black lg:text-lg leading-4 group-hover:text-mathcha-orange">Lịch sử mua hàng</p>
                        </div>
                    </div>
                </NavLink>
                {/* Logout */}
                <hr className="border-slate-300" />
                <div className={linkClasses}>
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>
                        </div>
                        <div>
                            <button onClick={handleLogout} className="font-bold text-base lg:text-lg text-gray-900 leading-4 group-hover:text-indigo-400">Đăng xuất</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-2 border-slate-700" />
        </div>
    );
}
