import React from 'react'

export default function Register() {
  return (
        <header className=" bg-cover border-t-2 h-screen" style={{backgroundImage: 'url("/assets/wallpaper-login.png")'}}>
            <div className="content px-8 py-2">
                <div className="body mt-5 mx-8">
                <div className="md:flex items-center justify-between">
                    <div className="w-full md:w-1/2 mr-auto" style={{textShadow: '0 20px 40px hsla(0,0%,0%,111)'}}>
                    </div>
                    <div className="w-full md:max-w-md mt-6">
                    <div className="card bg-white/5 p-6 backdrop-blur-2xl shadow-2xl rounded-lg px-4 py-4 mb-6 ">
                        <form action="#">
                        <div className="flex items-center justify-center mb-8">
                            <h2 className="text-3xl font-bold tracking-wide">
                            Register
                            </h2> 
                        </div>

                        <input type="text" className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-300 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="username" />
                        <input type="text" className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-300 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Firt Name" />
                        <input type="text" className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-300 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Last Name" />
                        <input type="text" className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-300 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="password" />
                        <input type="text" className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-300 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Email" />
                        <input type="text" className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-300 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Address" />
                        <input type="text" className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-300 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Phone" />
                        <input type="text" className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-300 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="image" />
                        <div className="flex items-center justify-center">
                            <button className="bg-gray-800 text-gray-200  px-2 py-1 rounded">Sign In</button>
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
