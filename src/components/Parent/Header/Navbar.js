import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../redux/features/counterSlice';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'

export default function Navbar() {
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  const user = useSelector(selectUser);
  console.log(user);
  
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden ">
      <div className="bg-gradient-to-r from-mathcha via-white to-mathcha flex flex-col items-center justify-center w-full py-2">
        <div className="px-3 relative xl:px-0 sm:px-3 flex max-w-[1180px] items-center justify-between w-full">
            {/* LOGO */}
            <div className="cursor-pointer">
                <Link to='/'>
                  <img src='/assets/Logo-removebg.png' alt='123' width={170}/>
                </Link>
            </div>
            {/* MENU */}
            <div className="hidden sm:text-lg text-2xl text-[#2D4263] font-normal md:flex md:flex-row items-center sm:gap-2.5 md:gap-[50px]">
              <Link to={'/about'}>
                <div className='font-bold'>Trung tâm</div>
              </Link>
              <Link to={'/discount'}>
                <div className='font-bold'>Ưu đãi</div>
              </Link>
              <Link to={'/contact'}>
                <div className='font-bold'>Liên hệ</div>
              </Link>
              <Link to={'/qanda'}>
                <div className='font-bold'>Hỏi đáp</div>
              </Link>
            {/* LOGIN */}
            {
              user == null
                ?   
                <Link 
                  className="flex items-center font-Cormorant px-5 py-3 rounded-[68px] bg-mathcha-orange !font-bold hover:text-white duration-1000 hover:bg-mathcha-green hover:border-white"
                  font="text-white font-normal"  to={"/login"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Đăng nhập
                </Link>
                  :  
                  <Menu>
                    <MenuButton>
                      <img src='./assets/admin-avatar.png' alt='a' className='rounded-full w-10'/>
                    </MenuButton>
                    <Transition
                      enter="transition ease-out duration-75"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <MenuItems
                        anchor="bottom end"
                        className="w-36 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black [--anchor-gap:var(--spacing-1)] focus:outline-none"
                      >

                        <MenuItem>
                          <Link 
                            className="flex items-center justify-start font-Cormorant ml-2 mb-2 px-1 py-1 rounded-lg !font-bold hover:text-white duration-1000 hover:bg-mathcha-green hover:border-white"
                            font="text-white font-normal" to={'/profile'}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                              <span className='ml-2'>
                                Hồ sơ
                              </span>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link 
                            className="flex items-center justify-start font-Cormorant ml-2 px-1 py-1 rounded-lg !font-bold hover:text-white duration-1000 hover:bg-mathcha-green hover:border-white"
                            font="text-white font-normal" onClick={handleLogout} to={'/'}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                              </svg>
                              <span className='ml-2'>
                                Logout
                              </span>
                          </Link>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
              }
            </div>           
        </div>
      </div>
    </div>
  )
}
