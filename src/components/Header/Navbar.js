import React from 'react'

export default function Navbar() {
  return (
    <div className='max-w-screen-2xl text-base mx-auto px-8 text-center bg-slate-400'>
      <header className='py-6 mx-10'>
        <nav className='flex flex-row items-center justify-between'>
          <div className='logo basis-2/6 text-center font-semibold cursor-pointer'>
            Mathcha.edu
          </div>
          <ul className='basis-3/6 flex items-center justify-end gap-10 uppercase text-base font-medium text-gray-700'>
            <li className='ct_top-menu-item'>
              <a href='/'>Home</a>
            </li>
            <li className='ct_top-menu-item'><a href='/'>About</a></li>
            <li className='ct_top-menu-item'><a href='/'>News</a></li>
            <li className='ct_top-menu-item'><a href='/'>Contact</a></li>
          </ul>
          <ul className='basis-1/6 flex justify-start items-center ml-16 uppercase text-md text-gray-700 font-medium'>
            <li className='ct_top-menu-item '>
              <a href='/' className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ct_icon mb-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span className='mx-2'>Cart</span>
                <span className='ct_badge bg-orange-500 text-white'>10</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
                  