import React, { useState } from 'react'
import classNames from "classnames";

const Navitem = ["explore", "resources", "creators"];
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
        <div className="flex justify-center items-center gap-3">
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex text-[#ECDBBA] flex-col items-center w-full overflow-x-hidden ">
      <div className="px-3 relative xl:px-0 sm:px-3 py-3 flex max-w-[1180px] items-center justify-between w-full">
          <div className="cursor-pointer">
            <svg
              width="58"
              height="30"
              viewBox="0 0 58 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.88 26.88C24.44 27.7067 22.6933 28.36 20.64 28.84C18.5867 29.32 16.4533 29.56 14.24 29.56C11.2533 29.56 8.70667 29.2 6.6 28.48C4.52 27.76 2.94667 26.76 1.88 25.48C0.84 24.2 0.32 22.72 0.32 21.04C0.32 19.5733 0.72 18.28 1.52 17.16C2.32 16.04 3.42667 15.1733 4.84 14.56C3.74667 14 2.90667 13.2267 2.32 12.24C1.76 11.2267 1.48 10.12 1.48 8.92C1.48 7.37333 1.96 5.96 2.92 4.68C3.90667 3.4 5.4 2.37333 7.4 1.6C9.4 0.826665 11.8667 0.439998 14.8 0.439998C16.64 0.439998 18.4533 0.613332 20.24 0.959999C22.0267 1.30667 23.6 1.77333 24.96 2.36L22.8 8.28C20.32 7.18667 17.76 6.64 15.12 6.64C13.2267 6.64 11.8133 6.89333 10.88 7.4C9.94667 7.88 9.48 8.56 9.48 9.44C9.48 11.04 10.64 11.84 12.96 11.84H20.88V17.88H12.44C11.08 17.88 10.0533 18.1067 9.36 18.56C8.66667 18.9867 8.32 19.6267 8.32 20.48C8.32 21.3867 8.82667 22.0933 9.84 22.6C10.8533 23.1067 12.4267 23.36 14.56 23.36C16.08 23.36 17.64 23.16 19.24 22.76C20.8667 22.3333 22.28 21.76 23.48 21.04L25.88 26.88ZM29.0266 0.999998H42.2666C45.3332 0.999998 48.0532 1.57333 50.4266 2.72C52.7999 3.86667 54.6399 5.49333 55.9466 7.6C57.2532 9.70667 57.9066 12.1733 57.9066 15C57.9066 17.8267 57.2532 20.2933 55.9466 22.4C54.6399 24.5067 52.7999 26.1333 50.4266 27.28C48.0532 28.4267 45.3332 29 42.2666 29H29.0266V0.999998ZM41.9466 22.68C44.3466 22.68 46.2666 22 47.7066 20.64C49.1732 19.28 49.9066 17.4 49.9066 15C49.9066 12.6 49.1732 10.72 47.7066 9.36C46.2666 8 44.3466 7.32 41.9466 7.32H36.9466V22.68H41.9466Z"
                fill="#2D4263"
              />
              <path d="M-1 16H59.2666V18H-1V16Z" fill="#2D4263" />
            </svg>
          </div>
          <div className="hidden sm:text-lg text-2xl text-[#2D4263] font-normal md:flex md:flex-row items-center sm:gap-2.5 md:gap-[60px]">
            {Navitem.map((navitem, index) => {
              return (
                <a key={index} href="#_">
                  <div>{navitem}</div>
                </a>
              );
            })}
            <Button
              label="Connect Wallet"
              color="bg-[#2D4263]"
              className="font-Cormorant px-7 py-3 rounded-[68px] !font-bold"
              font="text-[#ECDBBA] font-normal"
            />
          </div>
          <div
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
                  <a key={index} href="#_">
                    <div>{navitem}</div>
                  </a>
                );
              })}
              <Button
                label="Connect Wallet"
                color="bg-[#ECDBBA]"
                className="font-Cormorant px-7 py-3 rounded-[68px] !font-bold"
                font="text-[#2D4263]"
              />
            </div>
          </div>
        </div>
    </div>
  )
}
