import React from 'react'
import classNames from "classnames";

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
      <div className=" md:flex items-center justify-between max-w-[1180px] w-full">
          <div className="text-start flex flex-col gap-2.5 sm:gap-3 md:gap-5 px-[4%] xl:px-0 md:max-w-[430px] lg:max-w-[518px] w-full ">
            <div className="text-[#2D4263] font-Cormorant text-[25px] sm:text-[40px] md:text-[50px] lg:text-[75px] md:leading-[70px] lg:leading-[87px] font-medium tracking-[0.03em]">
              Discover{" "}
              <span className="text-[#C84B31] underline">
                Rare 3D Collections
              </span>{" "}
              in the
              <span className="text-[#C84B31] underline">World</span>
            </div>
            <div className="text-[#2D4263] text-sm sm:text-xl md:text-sm font-montserrat">
              The largest 3D NFT marketplace authentic and truly unique digital
              creation. Create yout own NFT dream gallery
            </div>
            <div>
              <div className="w-full justify-between flex gap-2.5 md:gap-[30px] lg:gap-[50px] ">
                {discover.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="max-w-[150px] w-full gap-1.5 text-[#2D4263] flex flex-col text-center"
                    >
                      <div className="text-xl sm:text-3xl md:text-[32px] font-semibold leading-9">
                        {data.price}
                      </div>
                      <div className="text-[10px] sm:text-base md:text-[10px] whitespace-nowrap md:text-base font-normal tracking-[0.03em]">
                        {data.field}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              label="Join Now"
              color="bg-[#ECDBBA]"
              className="w-full text-center lg:max-w-[150px] px-7 py-3 border-2 border-[#2D4263] rounded-[68px] hover:text-white duration-1000 hover:bg-[#2D4263] !font-semibold"
              font="text-[#2D4263]"
            />
          </div>
          <div className="px-3">
            <img src={"/assets/nft/bubble.png"} alt="bubble" />
          </div>
        </div>
    </div>
  )
}
