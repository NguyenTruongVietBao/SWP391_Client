import React from 'react'
// import { useState } from 'react'
import classNames from "classnames";
import { Link } from 'react-router-dom';
import Login from '../../Login/Login';

const Button = ({
  size,
  className,
  color,
  font,
  label,
  endIcon,
  startIcon,
  endIconClassName,
  startIconClassName,
  ...props
}) => {
  return (
    <button
      className={classNames(
        className,
        "flex justify-center items-center",
        size ? size : "",
        color ? color : "bg-blue",
        font ? font : "font-[500] tracking-tight text-[#ECDBBA]"
      )}
      {...props}
    >
      {startIcon && (
        <div className={classNames(startIconClassName || "")}>{startIcon}</div>
      )}
      <div className="relative">
        <div className="flex justify-center items-center gap-1">
          <div className="label">{label}</div>
        </div>
      </div>
      {endIcon && (
        <div className={classNames(endIconClassName || "")}>{endIcon}</div>
      )}
    </button>
  );
};
export default function Navbar() {
  // const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden ">
      <div className="bg-[#fefefe] flex flex-col items-center justify-center w-full">
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
                <div className='font-bold'>Hệ thống trung tâm</div>
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
              <Button
                label={<Login/>}
                color="bg-mathcha-orange"
                className="font-Cormorant px-7 py-3 rounded-[68px] !font-bold hover:text-white duration-1000 hover:bg-mathcha-green hover:border-white"
                font="text-white font-normal"    
                startIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                }   
              />
              
            </div>
            {/* Mobile */}
            {/* <div
              className="md:hidden cursor-pointer"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 12C3 11.5858 3.33579 11.25 3.75 11.25H20.25C20.6642 11.25 21 11.5858 21 12C21 12.4142 20.6642 12.75 20.25 12.75H3.75C3.33579 12.75 3 12.4142 3 12Z"
                  fill="#2D4263"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 6C3 5.58579 3.33579 5.25 3.75 5.25H15C15.4142 5.25 15.75 5.58579 15.75 6C15.75 6.41421 15.4142 6.75 15 6.75H3.75C3.33579 6.75 3 6.41421 3 6Z"
                  fill="#2D4263"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 18C3 17.5858 3.33579 17.25 3.75 17.25H15C15.4142 17.25 15.75 17.5858 15.75 18C15.75 18.4142 15.4142 18.75 15 18.75H3.75C3.33579 18.75 3 18.4142 3 18Z"
                  fill="#2D4263"
                />
              </svg>
            </div>
            <div
              className={`
                " transition-all ease-in-out"
                  ${
                    isNavOpen
                      ? "md:hidden flex flex-col h-screen w-full left-0 top-0 absolute rounded-lg z-30 bg-[#2D4263]"
                      : "md:hidden flex flex-col h-screen w-full top-0 left-full  absolute  rounded-lg z-30 bg-[#2D4263]"
                  } 
              `}
            >
              <div
                className="flex pt-5 items-center justify-end text-xl font-bold px-6 w-full"
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                <img
                  src={"/assets/nft/closed.svg"}
                  alt="Close"
                  className="h-7 cursor-pointer"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center h-screen  gap-[30px] sm:gap-[50px]  md:hidden sm:text-lg text-xl  font-normal md:flex-row md:gap-[60px]">
                {Navitem.map((navitem, index) => {
                  return (
                    <Link key={index} to={'/'+navitem}>
                      <div>{navitem}</div>
                    </Link>
                  );
                })}
                <Button
                  label="Connect Wallet"
                  color="bg-[#ECDBBA]"
                  className="font-Cormorant px-7 py-3 rounded-[68px] !font-bold"
                  font="text-[#2D4263]"
                />
              </div>
            </div> */}
        </div>
        <div className=" border-[5px] border-white w-full "></div>
      </div>
    </div>
  )
}
