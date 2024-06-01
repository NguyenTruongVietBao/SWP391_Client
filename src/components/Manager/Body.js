import React from 'react'

export default function Body() {
  return (
    <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
            {/* Menu */}
            <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
                <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">Manager<span className="text-indigo-400">.</span></h1>
                <p className="text-slate-400 text-sm mb-2">Welcome back</p>
                {/* User info */}
                <a href="/" className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
                    <div>
                        <img className="rounded-full w-10 h-10 relative object-cover" src="https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1800&t=st=1669749937~exp=1669750537~hmac=4c5ab249387d44d91df18065e1e33956daab805bee4638c7fdbf83c73d62f125" alt="a" />
                    </div>
                    <div>
                        <p className="font-medium group-hover:text-indigo-400 leading-4">Viet Bao</p>
                        <span className="text-xs text-slate-400">ahihi</span>
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
                                <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Dashboard</p>
                                <p className="text-slate-400 text-sm hidden md:block">Data overview</p>
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
                                <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Course</p>
                                <p className="text-slate-400 text-sm hidden md:block">Manage course</p>
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
                                <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Logout</p>
                            </div>
                        </div>
                    </a>
                </div>
                <p className="text-sm text-center text-gray-600">v2.0.3 | © 2024 VietBao</p>
            </div>
            {/* Content */}
            <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                {/* Statistic */}
                <div id="statistic">
                    <h1 className="font-bold py-4 uppercase">Last 24h Statistics</h1>
                    <div id="stats" className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                        <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-indigo-300 text-sm font-medium uppercase leading-4">Users</p>
                            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                            <span>+28</span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                </svg>
                            </span>
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="bg-black/60 p-6 rounded-lg">
                        <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-teal-300 text-sm font-medium uppercase leading-4">Income</p>
                            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                            <span>$2,873.88</span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                </svg>
                            </span>
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="bg-black/60 p-6 rounded-lg">
                        <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-blue-300 text-sm font-medium uppercase leading-4">Invoices</p>
                            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                            <span>+79</span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                </svg>
                            </span>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Manage Money */}
                <div id="manage-money" className="py-12">
                    <h1 className="font-bold uppercase">Manage Money</h1>
                    <div id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        <div className="bg-black/60 to-white/5 rounded-lg">
                            <div className="flex flex-row items-center">
                            <div className="text-3xl p-4">💰</div>
                            <div className="p-2">
                                <p className="text-xl font-bold">348$</p>
                                <p className="text-gray-500 font-medium">Amber Gates</p>
                                <p className="text-gray-500 text-sm">24 Nov 2022</p>
                            </div>
                            </div>
                            <div className="border-t border-white/5 p-4">
                            <a href='/' className="inline-flex space-x-2 items-center text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <span>Info</span>                                      
                            </a>
                            </div>
                        </div>
                        <div className="bg-black/60 to-white/5 rounded-lg">
                            <div className="flex flex-row items-center">
                            <div className="text-3xl p-4">💰</div>
                            <div className="p-2">
                                <p className="text-xl font-bold">68$</p>
                                <p className="text-gray-500 font-medium">Maia Kipper</p>
                                <p className="text-gray-500 text-sm">23 Nov 2022</p>
                            </div>
                            </div>
                            <div className="border-t border-white/5 p-4">
                            <a href='/' className="inline-flex space-x-2 items-center text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <span>Info</span>                                      
                            </a>
                            </div>
                        </div>
                        <div className="bg-black/60 to-white/5 rounded-lg">
                            <div className="flex flex-row items-center">
                            <div className="text-3xl p-4">💰</div>
                            <div className="p-2">
                                <p className="text-xl font-bold">12$</p>
                                <p className="text-gray-500 font-medium">Oprah Milles</p>
                                <p className="text-gray-500 text-sm">23 Nov 2022</p>
                            </div>
                            </div>
                            <div className="border-t border-white/5 p-4">
                            <a href='/' className="inline-flex space-x-2 items-center text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <span>Info</span>                                      
                            </a>
                            </div>
                        </div>
                        <div className="bg-black/60 to-white/5 rounded-lg">
                            <div className="flex flex-row items-center">
                            <div className="text-3xl p-4">💰</div>
                            <div className="p-2">
                                <p className="text-xl font-bold">105$</p>
                                <p className="text-gray-500 font-medium">Jonny Nite</p>
                                <p className="text-gray-500 text-sm">23 Nov 2022</p>
                            </div>
                            </div>
                            <div className="border-t border-white/5 p-4">
                            <a href='/' className="inline-flex space-x-2 items-center text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <span>Info</span>                                      
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Manage Course */}
                <div id="manage-course">
                    <h1 className="font-bold pb-4 uppercase">Manage Course</h1>
                    <div className="overflow-x-scroll">
                    <table className="w-full whitespace-nowrap">
                        <thead className="bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                            <tr>
                                <th className="text-center py-3 px-2 rounded-l-lg">Info</th>
                                <th className="text-left py-3 pr-2">Chapter</th>
                                <th className="text-left py-3 px-2">Topic</th>
                                <th className="text-left py-3 px-2">Price</th>
                                <th className="text-left py-3 px-2">Status</th>
                                <th className="text-center py-3 px-2 rounded-r-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-700">
                                <td className="py-3 pl-2 font-bold">
                                    <div className="inline-flex space-x-3 items-center ">
                                        <span><img className="rounded-lg w-16 h-auto" src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"  alt="a"  /></span>                       
                                        <span>Thai Mei</span>
                                    </div>
                                </td>
                                <td className="py-3 pr-2">User</td>
                                <td className="py-3 px-2">User</td>
                                <td className="py-3 px-2">User</td>
                                <td className="py-3 px-2">Approved</td>
                                <td className="py-3 px-2">
                                <div className="flex items-center justify-center space-x-3">
                                    <a href title="Edit" className="hover:text-white p-2 bg-slate-600">
                                        Approve
                                    </a>
                                    <a href title="Edit password" className="hover:text-white p-2 bg-slate-600">
                                        Reject
                                    </a>
                                </div>
                                </td>
                            </tr>
                        </tbody></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
