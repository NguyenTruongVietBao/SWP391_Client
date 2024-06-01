import React from 'react'

export default function AdminPage() {
  return (
    <div className="antialiased w-full min-h-screen text-slate-100 relative py-4" style={{backgroundImage: 'url("/assets/admin-wallpaper.png")'}}>
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
            {/* Menu */}
            <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
                <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent mb-2">Admin<span className="text-indigo-400">.</span></h1>
                {/* User info */}
                <a href="/" className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
                    <div>
                        <img className="rounded-full w-10 h-10 relative object-cover" src='/assets/admin-avatar.png' alt="a" />
                    </div>
                    <div>
                        <p className="font-medium group-hover:text-indigo-400 leading-4">Viet Bao</p>
                        <span className="text-xs text-slate-400">Admin handsome</span>
                    </div>
                </a>
                <hr className="my-2 border-slate-700" />
                {/* Menu */}
                <div id="menu" className="flex flex-col space-y-2 my-5">
                    {/* Profile */}
                    <a href='/' className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>                              
                        </div>
                        <div>
                        <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Profile</p>
                        <p className="text-slate-400 text-sm hidden md:block">Manage users</p>
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
                <p className="text-sm text-center text-gray-900">v2.0.3 | © 2024 VietBao</p>
            </div>
            {/* Content */}
            <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                {/* Manage Course */}
                <div id="manage-course">
                    <h1 className="font-bold pb-4 uppercase">Manage Course</h1>
                    <div className="overflow-x-scroll">
                    <table className="w-full whitespace-nowrap">
                        <thead className="bg-black/60">
                        <tr><th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                            <th className="text-left py-3 px-2">Email</th>
                            <th className="text-left py-3 px-2">Group</th>
                            <th className="text-left py-3 px-2">Status</th>
                            <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
                        </tr></thead>
                        <tbody><tr className="border-b border-gray-700">
                            <td className="py-3 px-2 font-bold">
                            <div className="inline-flex space-x-3 items-center">
                                <span><img className="rounded-full w-8 h-8" src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg"  alt="a"  /></span>
                                <span>Thai Mei</span>
                            </div>
                            </td>
                            <td className="py-3 px-2">thai.mei@abc.com</td>
                            <td className="py-3 px-2">User</td>
                            <td className="py-3 px-2">Approved</td>
                            <td className="py-3 px-2">
                            <div className="inline-flex items-center space-x-3">
                                <a href title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                </a>
                                <a href title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                </a>
                                <a href title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                                </a>
                            </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <td className="py-3 px-2 font-bold">
                            <div className="inline-flex space-x-3 items-center">
                                <span><img className="rounded-full w-8 h-8" src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg" alt="a" /></span>
                                <span>Thai Mei</span>
                            </div>
                            </td>
                            <td className="py-3 px-2">thai.mei@abc.com</td>
                            <td className="py-3 px-2">User</td>
                            <td className="py-3 px-2">Approved</td>
                            <td className="py-3 px-2">
                            <div className="inline-flex items-center space-x-3">
                                <a href title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                </a>
                                <a href title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                </a>
                                <a href title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                                </a>
                            </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <td className="py-3 px-2 font-bold">
                            <div className="inline-flex space-x-3 items-center">
                                <span><img className="rounded-full w-8 h-8" src="https://images.generated.photos/tGiLEDiAbS6NdHAXAjCfpKoW05x2nq70NGmxjxzT5aU/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTM4ODM1LmpwZw.jpg" alt="a" /></span>
                                <span>Thai Mei</span>
                            </div>
                            </td>
                            <td className="py-3 px-2">thai.mei@abc.com</td>
                            <td className="py-3 px-2">User</td>
                            <td className="py-3 px-2">Approved</td>
                            <td className="py-3 px-2">
                            <div className="inline-flex items-center space-x-3">
                                <a href title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                </a>
                                <a href title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                </a>
                                <a href title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                                </a>
                            </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <td className="py-3 px-2 font-bold">
                            <div className="inline-flex space-x-3 items-center">
                                <span><img className="rounded-full w-8 h-8" src="https://images.generated.photos/niCVbIBAm4hahzwS83HoEtcVEIactkKohOzgXWYY4lM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTk4ODczLmpwZw.jpg" alt="a" /></span>
                                <span>Marquez Spineli</span>
                            </div>
                            </td>
                            <td className="py-3 px-2">marquez.spineli@cba.com</td>
                            <td className="py-3 px-2">User</td>
                            <td className="py-3 px-2">Approved</td>
                            <td className="py-3 px-2">
                            <div className="inline-flex items-center space-x-3">
                                <a href title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                </a>
                                <a href title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                </a>
                                <a href title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                                </a>
                            </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                            <td className="py-3 px-2 font-bold">
                            <div className="inline-flex space-x-3 items-center">
                                <span><img className="rounded-full w-8 h-8" src="https://images.generated.photos/f_xU7q780YXiKG7IwKVV05eU6Sj2nIodEkN1S8GyM2M/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDk2MTc4LmpwZw.jpg" alt="s" /></span>
                                <span>Mark Spike</span>
                            </div>
                            </td>
                            <td className="py-3 px-2">mark.spike@abc.com</td>
                            <td className="py-3 px-2">Administrator</td>
                            <td className="py-3 px-2">Approved</td>
                            <td className="py-3 px-2">
                            <div className="inline-flex items-center space-x-3">
                                <a href title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                </a>
                                <a href title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                </a>
                                <a href title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
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
