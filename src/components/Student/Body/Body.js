import React from 'react'

export default function Body() {
  return (
    <div className="bg-gradient-to-r from-violet-100 to-indigo-100 flex items-center justify-center">
        <div className="my-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-9/12 backdrop-blur-sm bg-white/40 p-6 rounded-lg shadow-sm border-violet-200 border">
            {/* Xem thêm */}
            <div className="w-full flex justify-between items-center p-3">
            <h2 className="text-xl font-semibold">Khóa học của tôi</h2>
            <button id="openModalBtn" className="flex items-center bg-gradient-to-r from-violet-300 to-indigo-300  border border-fuchsia-00 hover:border-violet-100 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                <p className="text-white">Xem thêm</p>
            </button>
            </div>
            {/* Search */}
            <div className="w-full flex justify-center p-1 mb-4">
                <div className="relative w-full">
                    <input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300" placeholder="Search..." />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    </div>
                </div>
            </div>
            {/* Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="backdrop-blur-sm bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-4">Project 1</h2>
                    <p className="text-gray-700">Description of Project 2 goes here. You can provide more details about the project.</p>
                    <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                        <img src="https://placekitten.com/48/48" alt className="w-6 h-6 rounded-full bg-violet-100" loading="lazy" />                     
                    </dd>
                    </div>
                </div>
                <div className="backdrop-blur-sm bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-4">Project 1</h2>
                    <p className="text-gray-700">Description of Project 2 goes here. You can provide more details about the project.</p>
                    <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                        <img src="https://placekitten.com/48/48" alt className="w-6 h-6 rounded-full bg-violet-100" loading="lazy" />                     
                    </dd>
                    </div>
                </div>
                <div className="backdrop-blur-sm bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-4">Project 1</h2>
                    <p className="text-gray-700">Description of Project 2 goes here. You can provide more details about the project.</p>
                    <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                        <img src="https://placekitten.com/48/48" alt className="w-6 h-6 rounded-full bg-violet-100" loading="lazy" />                     
                    </dd>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
