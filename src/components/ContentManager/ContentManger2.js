import React from 'react'
import { Button } from '@headlessui/react'

export default function ContentManger2() {
  return (
    <div className="antialiased bg-orange-50 w-full min-h-screen text-black relative py-4">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
            {/* Menu */}
            <div id="menu" className="bg-black/10 col-span-3 rounded-lg p-4 ">
                <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-black via-black/70 to-transparent bg-clip-text text-transparent">ContentManager<span className="text-indigo-400">.</span></h1>
                <p className="text-slate-800 text-sm mb-2">Welcome back</p>
                {/* User info */}
                <a href="/" className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
                    <div>
                        <img className="rounded-full w-10 h-10 relative object-cover" src="https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1800&t=st=1669749937~exp=1669750537~hmac=4c5ab249387d44d91df18065e1e33956daab805bee4638c7fdbf83c73d62f125" alt="a" />
                    </div>
                    <div>
                        <p className="font-medium group-hover:text-indigo-400 leading-4">Viet Bao</p>
                        <span className="text-xs text-slate-800">ahihi</span>
                    </div>
                </a>
                <hr className="my-2 border-slate-700" />
                {/* Menu */}
                <div id="menu" className="flex flex-col space-y-2 my-5">
                    {/* Dashboard */}
                    <a href='#statistic' className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">Dashboard</p>
                                <p className="text-slate-900 text-sm hidden md:block">Data overview</p>
                            </div>
                        </div>
                    </a>
                    {/* Course */}
                    <a href='#manage-course' className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                        <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                </svg>
                             
                            </div>
                            <div>
                                <p className="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">Course</p>
                                <p className="text-slate-900 text-sm hidden md:block">Manage course</p>
                            </div>
                        </div>
                    </a>
                    {/* Logout */}
                    <a href='/' className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">Logout</p>
                            </div>
                        </div>
                    </a>
                </div>
                <p className="text-sm text-center text-gray-600">v2.0.3 | © 2024 VietBao</p>
            </div>
            {/* Content */}
            <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
                {/* Manage Course */}
                <div id="manage-course">
                    <div className='flex items-center justify-between'>
                        <h1 className="font-bold py-4 uppercase">Manage Course</h1>
                        <Button className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-black/60 via-black/80 to-black/60 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Add course
                        </Button>
                    </div>
                    <div className="overflow-x-scroll">
                        <table className="w-full whitespace-nowrap">
                            <thead className="bg-gradient-to-br from-black/80 via-black/60 to-black/70  text-white/90">
                                <tr>
                                    <th className="text-left py-3 px-2 rounded-l-lg">Image</th>
                                    <th className="text-center py-3 px-2">Title</th>
                                    <th className="text-center py-3 px-2">Chapter</th>
                                    <th className="text-center py-3 px-2">Topic</th>
                                    <th className="text-center py-3 px-2">Lesson</th>
                                    <th className="text-center py-3 px-2">Price</th>
                                    <th className="text-center py-3 px-2 rounded-r-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700">
                                    <td className="py-3 font-bold">
                                        <div className="inline-flex items-center">
                                            <span><img className="rounded-lg w-16 h-auto" src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg" alt="a" /></span>                             
                                        </div>
                                    </td>
                                    <td className="py-3 px-2 text-center font-bold"><span>Thai Mei</span></td>
                                    <td className="py-3 px-2 text-center">10</td>
                                    <td className="py-3 px-2 text-center">20</td>
                                    <td className="py-3 px-2 text-center">40</td>
                                    <td className="py-3 px-2 text-center">100.000 VNĐ</td>
                                    <td className="py-3 px-2 text-center">
                                    <div className="inline-flex items-center space-x-3">
                                        <a href="/content-manager" title="Edit" className="hover:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </a>
                                        <a href="/content-manager" title="Delete" className="hover:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </a>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
