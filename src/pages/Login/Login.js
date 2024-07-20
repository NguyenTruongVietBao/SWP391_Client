import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../config/axios'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/features/counterSlice'
import { toast } from 'react-toastify'
import Navbar from '../../components/Parent/Header/Navbar'
import Footer from '../../components/Parent/Footer/Footer'

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/login", {
                "password": password,
                "username": username
            });
            localStorage.setItem("token", response.data.data.token);
            const role = response.data.data.role;
            dispatch(login(response.data.data));
            if (role === 'ADMIN') {
                navigate("/admin");
            } else if (role === 'PARENT') {
                navigate("/");
            } else if (role === 'MANAGER') {
                navigate("/manager");
            } else if (role === 'CONTENT_MANAGER') {
                navigate("/content-manager");
            }
        } catch (e) {
            toast.error('Sai tên đăng nhập hoặc mật khẩu');
        }
    }

    return (
        <>
            <Navbar />
            <div className="border-[5px] border-mathcha-orange w-full"></div>
            <header className="bg-cover h-screen" style={{ backgroundImage: 'url("/assets/wallpaper-login.png")' }}>
                <div className="content px-8 py-2">
                    <div className="body mt-10 mx-8">
                        <div className="md:flex items-center justify-between">
                            {/* Left */}
                            <div className="w-full md:w-1/2 mr-auto"
                                 style={{textShadow: '0 20px 40px hsla(0,0%,0%,111)'}}>
                                <h1 className="text-4xl font-bold text-white tracking-wide">Bạn</h1>
                                <h2 className="text-2xl font-bold text-white tracking-wide">
                                    <span className="text-black">chưa có</span> <span className={'underline underline-offset-2'}>tài khoản</span> ?
                                </h2>
                                <p className="text-white">.</p>
                                <span className="mt-9 text-white">
                                    <Link to="/register"
                                          className="text-black rounded-xl text-lg ml-2 font-bold py-2 px-2 bg-mathcha-orange hover:bg-mathcha">Đăng ký</Link>
                                </span>
                            </div>
                            {/* Right */}
                            <div className="w-full md:max-w-md mt-4">
                                <div className="flex items-center justify-end mb-5">
                                    <Link to={'/learning/login'}
                                          className='bg-pink-200 text-xl font-bold px-10 py-1 border-2 border-gray-900 rounded-lg text-gray-700 hover:bg-mathcha'>Đăng nhập cho bé</Link>
                                </div>
                                <div
                                    className="card bg-white/5 p-6 backdrop-blur-2xl shadow-2xl rounded-lg px-4 py-4 mb-6 ">
                                    <form onSubmit={handleLogin}>
                                        <div className="flex items-center justify-center my-7">
                                            <h2 className="text-3xl font-bold tracking-wide font-mathcha-font-2">
                                                Welcome to <span
                                                className='text-mathcha-green text-4xl font-mathcha-font-3'>Mathcha</span>
                                            </h2>
                                        </div>
                                        <input
                                            type="text"
                                            className="rounded-lg px-4 w-full py-3 bg-gray-200 border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                                            placeholder="Tên đăng nhập"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <input
                                            type="password"
                                            className="rounded-lg px-4 w-full py-3 bg-gray-200 border border-gray-400 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                                            placeholder="Mật khẩu"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {error && <div className="text-red-500 mb-4">{error}</div>}
                                        {/*<button*/}
                                        {/*    className="transition duration-200 ml-1 mb-5 mt-3 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">*/}
                                        {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none"*/}
                                        {/*         viewBox="0 0 24 24" stroke="currentColor"*/}
                                        {/*         className="w-4 h-4 inline-block align-text-top">*/}
                                        {/*        <path stroke-linecap="round" stroke-linejoin="round"*/}
                                        {/*              stroke-width="2"*/}
                                        {/*              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>*/}
                                        {/*    </svg>*/}
                                        {/*    <span className="inline-block ml-1">Quên mật khẩu </span>*/}
                                        {/*</button>*/}
                                        <div className="flex items-center justify-between mt-10">
                                            <button className="transition duration-200 bg-gray-800 hover:bg-mathcha-green focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                                <span className="text-lg font-bold inline-block mr-2">Đăng nhập</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor" className="w-4 h-4 inline-block">
                                                    <path stroke-linejoin="round"
                                                          stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                </svg>
                                            </button>
                                        </div>

                                        {/*<div className="p-5 mt-5">*/}
                                        {/*    <div className="grid grid-cols-2 gap-2">*/}
                                        {/*        <button type="button"*/}
                                        {/*                className="transition duration-200 border border-gray-600 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Phone*/}
                                        {/*        </button>*/}
                                        {/*        <button type="button"*/}
                                        {/*                className="transition duration-200 border border-gray-600 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Google*/}
                                        {/*        </button>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Footer/>
        </>
    );
}
