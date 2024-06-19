import React from 'react'
import { Link } from 'react-router-dom'

export default function StudentPage() {
  return (
    <div className="bg-cover min-h-screen" style={{backgroundImage: 'url("/assets/wallpaper-learning-student.png")'}}>
        {/* Navbar */}
        <div className=" bg-orange-100 text-blue-800 px-10 z-10 w-full">
            <div className="flex items-center justify-between text-5x1">
                <div className="">
                    <img src="/assets/Logo-removebg.png" width={150} alt="a"/>
                </div>
                <div className="flex justify-start text-gray-700">
                  <div className="relative w-full">
                    <input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 px-10 rounded-lg focus:outline-none border-2 border-gray-950 focus:border-violet-300 transition-colors duration-300" placeholder="Tìm kiếm khóa học" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div className=" border-[5px] border-mathcha-orange w-full "></div>
        {/* Main */}
        <div className="flex flex-row py-12 px-10 ">
            {/* Menu */}
            <div className="w-2/12 mr-10">
                <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4 items-center justify-center">
                    <a href='/learning' className="flex text-gray-600 hover:text-black my-4 mb-8 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span> Home</span>
                    </a>
                    <a href='/learning' className="flex text-gray-600 hover:text-black mt-8 my-4 mb-8 w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                      </svg>
                        <span> My Course</span>
                    </a>
                    <a href='/student' className="flex text-gray-600 hover:text-black my-4 w-full ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                      </svg>
                        <span> Quiz</span>
                    </a>
                </div>
                <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
                    <a href className=" flex text-gray-600 hover:text-black my-4 w-full mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span> Profile</span>
                    </a>
                    <a href className="flex text-gray-600 hover:text-black my-4 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        <span> Log out</span>
                    </a>
                </div>
            </div>
            {/* Body */}
            <div className="w-10/12">
                <div className="grid grid-cols-3 gap-10">
                    <div className="bg-no-repeat bg-blue-100 border-4 border-black rounded-xl h-120 py-3 flex flex-col items-center justify-center gap-5">
                        <img src='./assets/Class/class-1.png' alt='image_course' className='rounded-xl'/>
                        <p className="text-5xl text-indigo-900"><strong>Lớp 1</strong></p>
                        <Link to={'./course/1'} className="bg-orange-300 text-xl text-white rounded-full px-8 py-2 border-2 border-black"><strong>Học</strong></Link>
                    </div>
                    <div className="bg-no-repeat bg-green-100 border-4 border-black rounded-xl h-120 py-3 flex flex-col items-center justify-center gap-5">
                        <img src='./assets/Class/class-1.png' alt='image_course' className='rounded-xl'/>
                        <p className="text-5xl text-indigo-900"><strong>Lớp 1</strong></p>
                        <a href='/student' className="bg-orange-300 text-xl text-white  rounded-full  px-8 py-2 border-2 border-black"><strong>Học</strong></a>
                    </div>
                    <div className="bg-no-repeat bg-yellow-100 border-4 border-black rounded-xl h-120 py-3 flex flex-col items-center justify-center gap-5">
                        <img src='./assets/Class/class-1.png' alt='image_course' className='rounded-xl'/>
                        <p className="text-5xl text-indigo-900"><strong>Lớp 1</strong></p>
                        <a href='/student' className="bg-orange-300 text-xl text-white  rounded-full  px-8 py-2 border-2 border-black"><strong>Học</strong></a>
                    </div>
                    <div className="bg-no-repeat bg-pink-100 border-4 border-black rounded-xl h-120 py-3 flex flex-col items-center justify-center gap-5">
                        <img src='./assets/Class/class-1.png' alt='image_course' className='rounded-xl'/>
                        <p className="text-5xl text-indigo-900"><strong>Lớp 1</strong></p>
                        <a href='/student' className="bg-orange-300 text-xl text-white  rounded-full  px-8 py-2 border-2 border-black"><strong>Học</strong></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
