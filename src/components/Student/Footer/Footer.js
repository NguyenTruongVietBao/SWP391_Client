import React from 'react'

export default function Footer() {
  return (
    <div className='bg-gradient-to-r from-violet-200 to-indigo-200'>
        <section className="bg-gradient-to-r from-violet-200 to-indigo-200">
            <div className="max-w-lg bg-gradient-to-r from-violet-200 to-indigo-200 px-4 py-8 mx-auto text-left md:max-w-none md:text-center">
                <h1 className="text-3xl font-extrabold leading-10 tracking-tight  text-white text-center sm:leading-none md:text-6xl text-4xl lg:text-7xl">
                    <span className="mt-2 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 md:inline-block"> Try your <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyon-400 to-purple-300">Best</span> </span>
                </h1>
            </div>
        </section>
        
        <hr className="text-black" />

        <footer className="flex bg-gradient-to-r from-violet-200 to-indigo-200 pb-5 items-center">
            <div className="max-w-screen-xl pt-8 mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <p className="mt-4 text-sm text-center text-000 lg:mt-0">
                        T&amp;C &nbsp; Career &nbsp; Privacy &amp; Policy &nbsp; Developers
                    </p>
                </div>
            </div>
        </footer>
    </div>
  )
}
