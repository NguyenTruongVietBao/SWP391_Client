import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginStudent() {
  return (
    <header className=" bg-cover h-screen" style={{backgroundImage: 'url("/assets/wallpaper-login-student.png")'}}>
        <div className="content px-8 py-2">
            <div className="body mt-28 mx-8">
                <div className="md:flex items-center justify-center">                  
                    <div className="w-full md:max-w-md mt-6">
                        <div className="card bg-white/5 p-6 backdrop-blur-2xl shadow-2xl rounded-lg px-4 py-4  mb-6 ">
                            <form action="#">
                            <div className="flex items-center justify-center">
                                <h2 className="text-3xl font-bold tracking-wide">
                                Đăng nhập
                                </h2> 
                            </div>
                            <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
                                cho bé học tập hehe
                            </h2>
                            <input type="text" className="rounded px-4 w-full py-3 bg-gray-50  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Tên đăng nhập" />
                            <input type="password" className="rounded px-4 w-full py-3 bg-gray-50  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Mật khẩu" />
                            <div className="flex flex-col items-center justify-between">
                                <button className="bg-gray-800 text-gray-200 font-bold px-4 py-3 my-5 rounded">Sign In</button>
                                <a href="#" className="text-gray-600 ">Forgot Password?</a>
                            </div>                           
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
