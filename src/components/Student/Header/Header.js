import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-gray-100 min-w-screen'>
        <header className="w-full text-gray-700 bg-gradient-to-r from-violet-200 to-indigo-200 border-t border-gray-100 shadow-sm body-font ">
            <div className="container items-center flex flex-col justify-between px-20 mx-10 md:flex-row">
                <Link to={'/'} className="flex items-center font-medium text-gray-900 title-font ml-20 md:mb-0">
                    <img src='/assets/Logo-removebg.png' width={150}/>
                </Link>
                <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto gap-5">
                    <a href="#_" className="font-medium hover:text-gray-900">Khóa học</a>
                    <a href="#_" className="font-medium hover:text-gray-900">Câu hỏi</a>
                </nav>
                <div className="flex items-center h-full ml-5">
                    <a href="/" className=" px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease">
                        Log out
                    </a>
                </div>
            </div>
        </header>
    </div>
  )
}
