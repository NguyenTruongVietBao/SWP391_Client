import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import "@fontsource/cormorant";
import "@fontsource/montserrat";
import classNames from "classnames";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import Banner from "./Banner";
const Navitem = ["explore", "resources", "creators"];
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
const dropsection = [
  {
    img: "/assets/nft/dropimg1.png",
    title1: "Knight Sword",
    subtitle: "@santosox",
    eth: "3 ETH",
  },
  {
    img: "/assets/nft/dropimg2.png",
    title1: "Daft Punk",
    subtitle: "@punix",
    eth: "2.34 ETH",
  },
  {
    img: "/assets/nft/dropimg3.png",
    title1: "Skater Girl",
    subtitle: "@inoino",
    eth: "10.5 ETH",
  },
  {
    img: "/assets/nft/dropimg4.png",
    title1: "Grogu",
    subtitle: "@alexio",
    eth: "20.5 ETH",
  },
  {
    img: "/assets/nft/dropimg5.png",
    title1: "Foodies",
    subtitle: "@animola",
    eth: "7 ETH",
  },
  {
    img: "/assets/nft/dropimg6.png",
    title1: "Friends Kawaii",
    subtitle: "@kunai",
    eth: "80 ETH",
  },
];
const sellNft = [
  {
    img: "/assets/nft/paint.png",
    title: "Create Artwork",
    desc: "Create your collection, Add social links, a description, profile & banner images, and set a secondary sales fee",
  },
  {
    img: "/assets/nft/time.png",
    title: "Add your NFTs",
    desc: "Upload your work, add a title and description, and customize your NFTs with properties, stats, and unlockable content.",
  },
  {
    img: "/assets/nft/box.png",
    title: "List them for sale",
    desc: "Choose between auctions and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!",
  },
];
const topcreator = [
  {
    img: "/assets/nft/creator1.png",
    name: "Axio Sun",
    ethe: "80224",
  },
  {
    img: "/assets/nft/creator2.png",
    name: "Gloria Wolff MD",
    ethe: "29369",
  },
  {
    img: "/assets/nft/creator3.png",
    name: "Albert Trantow",
    ethe: "53808",
  },
  {
    img: "/assets/nft/creator4.png",
    name: "Alexis Mante",
    ethe: "20123",
  },
  {
    img: "/assets/nft/creator5.png",
    name: "Cary Goldner",
    ethe: "16548",
  },
];
const topcreator1 = [
  {
    img: "/assets/nft/creator6.png",
    name: "Gregg Prosacco V",
    ethe: "24507",
  },
  {
    img: "/assets/nft/creator7.png",
    name: "Angelina Koss",
    ethe: "91031",
  },
  {
    img: "/assets/nft/creator8.png",
    name: "Axio Sun",
    ethe: "80224",
  },
  {
    img: "/assets/nft/creator2.png",
    name: "Gloria Wolff MD",
    ethe: "29369",
  },
  {
    img: "/assets/nft/creator3.png",
    name: "Albert Trantow",
    ethe: "53808",
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
const Body = () => {
  
  return (
    <div className="flex text-[#ECDBBA] flex-col items-center w-full overflow-x-hidden ">
      {/* Header + Banner */}
      <div className="bg-[#ECDBBA] gap-[43px] pb-10 flex flex-col items-center justify-center max-h-fit lg:h-[780px] w-full">
          {/* Header */}
        <Navbar/>
          {/* Banner */}
        <Banner/>
      </div>
      {/* Body */}
      <div className="bg-[#191919] w-full flex flex-col  gap-[123px] justify-center items-center ">
        <div className="px-[4%]">
          <div className="max-w-[1180px] flex flex-col gap-[50px]  lg:gap-[123px]">
            <div className="mt-[30px] md:mt-[93px] flex flex-col gap-[50px] max-w-[1180px] justify-center w-full">
              <div className=" flex justify-between items-center">
                <div className="font-Cormorant  text-[30px] md:text-5xl font-bold leading-[58px] tracking-[0.03em]">
                  Hot Drops
                </div>
                <Button
                  label="View More"
                  className="text-xs  font-semibold text-center px-[30px] md:max-w-[166px] md:w-full py-3 border-2 border-[#ECDBBA] rounded-[68px] hover:text-white duration-1000 hover:bg-[#2D4263] hover:border-none"
                />
              </div>
              <div>
                <div className="items-center justify-center flex flex-wrap gap-[30px] md:gap-[50px] lg:gap-[83px] md:px-0 px-[3%] w-full ">
                  {dropsection.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="hover:scale-105 duration-1000 cursor-pointer flex flex-col justify-center items-center md:max-w-[300px] lg:max-w-[338px] w-full py-[4%] lg:py-[2%] max-h-fit xl:h-[410px] border-4 border-[#ECDBBA] rounded-[28px]"
                      >
                        <div className="px-[4%] w-full flex flex-col gap-4 ">
                          <img
                            src={data.img}
                            alt="dropmainback"
                            className="rounded-3xl w-full "
                          />
                          <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-[3px] items-start justify-start">
                                <div className="font-Cormorant text-[28px]  font-bold leading-[34px]">
                                  {data.title1}
                                </div>
                                <div className="font-montserrat text-sm font-normal leading-[17px]">
                                  {data.subtitle}
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <div className="font-montserrat text-sm font-bold leading-[17px]">
                                  3 ETH
                                </div>
                                <div>
                                  <img
                                    src={"/assets/nft/dropicon.svg"}
                                    alt="ethe"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="items-center flex flex-col gap-9 ">
              <div className="font-Cormorant text-[25px] sm:text-5xl  font-bold leading-[58px]">
                Create and sell your NFTs
              </div>
              <div className="cursor-pointer flex flex-wrap justify-center gap-10  xl:gap-[84px] px-[4%] lg:px-0">
                {sellNft.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="px-[17px] hover:border-1 duration-1000 hover:shadow-pupularCard hover:shadow-white w-full lg:max-w-[280px] xl:max-w-[337px] pb-[2%] max-h-fit bg-[#2D4263] border-[4px] border-[#2D4263] rounded-[28px] flex flex-col gap-2.5 items-center justify-center"
                    >
                      <div className="max-w-[200px]">
                        <img src={data.img} alt="img" />
                      </div>
                      <div className="whitespace-nowrap font-Cormorant text-[23px] sm:text-4xl  md:text-[26px] lg:text-4xl font-semibold leading-[44px]">
                        {data.title}
                      </div>
                      <div className="font-montserrat text-[15px] text-center md:text-[22px] lg:text-base  md:leading-[25px] font-normal leading-5  tracking-[0.03em]">
                        {data.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[70px]">
          <div className="text-5xl font-Cormorant leading-[58px] font-bol">
            Top Creators
          </div>
          <div className="flex  ">
            <Marquee gradient={false} pauseOnHover>
              {topcreator.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="max-w-fit flex items-center gap-[22px]"
                  >
                    <div>
                      <img src={data.img} alt="img" />
                    </div>
                    <div className="text-start flex flex-col gap-2.5">
                      <div className="whitespace-nowrap font-Cormorant text-2xl leading-[29px] tracking-[0.03em] font-semibold">
                        {data.name}
                      </div>
                      <div className="flex gap-2.5 items-center font-montserrat text-sm leading-[17px] tracking-[0.03em] font-normal">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="26" height="26" rx="13" fill="#C84B31" />
                          <path
                            d="M13 4.33331L7.94446 13.2114L13 16.3821L18.0556 13.2114L13 4.33331ZM7.94446 14.2683L13 21.6666L18.0556 14.2683L13 17.439L7.94446 14.2683Z"
                            fill="#ECDBBA"
                          />
                        </svg>
                        {data.ethe}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Marquee>
          </div>
          <div className="flex">
            <Marquee gradient={false} speed={20} direction="right" pauseOnHover>
              {topcreator1.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="max-w-fit flex items-center gap-[22px]"
                  >
                    <div>
                      <img src={data.img} alt="imgaes" />
                    </div>
                    <div className="text-start flex flex-col gap-2.5">
                      <div className="whitespace-nowrap font-Cormorant text-2xl leading-[29px] tracking-[0.03em] font-semibold">
                        {data.name}
                      </div>
                      <div className="flex gap-2.5 items-center font-montserrat text-sm leading-[17px] tracking-[0.03em] font-normal">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="26" height="26" rx="13" fill="#C84B31" />
                          <path
                            d="M13 4.33331L7.94446 13.2114L13 16.3821L18.0556 13.2114L13 4.33331ZM7.94446 14.2683L13 21.6666L18.0556 14.2683L13 17.439L7.94446 14.2683Z"
                            fill="#ECDBBA"
                          />
                        </svg>
                        {data.ethe}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Marquee>
          </div>
        </div>
        <div className="px-3 w-full">
          <div className="mb-[70px] flex gap-9 flex-col justify-center items-center w-full bg-[#C84B31] max-h-fit py-[3%] rounded-3xl">
            <div className="flex flex-col text-center items-center gap-[15px]">
              <div className="text-[20px] sm:text-[34px] lg:text-5xl leading-[58px] font-bold font-Cormorant tracking-[0.03em]">
                Join Our Community
              </div>
              <div className="font-montserrat tracking-[0.03em] px-2 text-[15px] md:text-xl leading-[24px] font-normal">
                Meet the company team, artist and collector for platform
                updates, announcements, and more ...
              </div>
            </div>
            <Button
              startIcon={<img src={"/assets/nft/discord.svg"} alt="discord" />}
              label="Launch Discord"
              color="bg-[#2D4263]"
              className="max-w-[252px] text-lg w-full py-3 md:py-3 flex gap-2.5 justify-center items-center rounded-[68px]"
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      {/* <Footer/> */}
    </div>
  );
};
export default Body;