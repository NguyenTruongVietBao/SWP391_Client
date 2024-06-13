import React from 'react'
import classNames from "classnames";
import "@fontsource/cormorant";
import "@fontsource/montserrat";
const discover = [
  {
    price: "$278m",
    field: "Trading Volume",
  },
  {
    price: "300k",
    field: "Art Work",
  },
  {
    price: "1.8m",
    field: "Total Users",
  },
];
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
export default function Banner() {
  return (
    <div className='flex text-[#ECDBBA] flex-col items-center w-full overflow-x-hidden'>
      <div className="bg-mathcha flex flex-col items-center justify-center w-full">
        <div className=" md:flex items-center justify-between  w-full">
            <div className="">
              <img src={"/assets/trang chu-02.png"} alt="bubble" />
            </div>
        </div>
      </div>
    </div>
  )
}
