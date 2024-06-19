import React from 'react'
import classNames from "classnames";
import { Link } from 'react-router-dom';

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
export default function Footer() {
  return (
    <div className="flex text-mathcha-orange flex-col items-center w-full overflow-x-hidden ">
      <div className=" bg-[#191919] w-full flex justify-center pb-[30px] flex-col items-center gap-[50px]">
        <div className=" border-[5px] border-mathcha-orange w-full "></div>
        <div className="px-[5%] xl:px-0   flex-col flex gap-5 md:flex-row  md:gap-5  md:flex items-start justify-between max-w-[1180px] w-full">
          <div className="text-start -mt-[25px] max-w-[464px] w-full flex flex-col  gap-[11px] ">
            <a href="/" className="text-[64px] leading-[78px] font-extrabold font-montserratAlter">
              <img src='/assets/Logo-removebg.png' width={150}/>
            </a>
            <div className="text-base leading-5 tracking-[0.03em] font-normal font-montserrat ">
            Nếu Gymnasium là nơi tập luyện để phát triển thể lực thì Mathcha là nơi học sinh rèn luyện để phát triển Tư duy, trí thông minh thông qua Toán học
            </div>
          </div>
          <div className=" items-center  flex flex-col gap-2 md:gap-[21px]">
            <div className="font-Cormorant whitespace-nowrap  sm:text-2xl leading-[29px] tracking-[0.03em] font-bold">
              Liên kết nhanh
            </div>
            <div className="text-center font-montserrat text-base leading-5 tracking-[0.03em] flex flex-col gap-2.5 font-medium">
              <a href="#_"> Ưu đãi</a>
              <a href="#_"> Liên hệ</a>
              <a href="#_"> Hỏi đáp</a>
            </div>
          </div>
          <div className="items-start  flex flex-col gap-2 md:gap-[21px]">
            <div className="font-Cormorant text-2xl leading-[29px] tracking-[0.03em] font-bold">
              Hệ thống trung tâm
            </div>
            <div className="text-start font-montserrat text-base leading-5 tracking-[0.03em] flex flex-col gap-2.5 font-medium">
              <a href="#_">S7.01 Vinhome GrandPark</a>
              <a href="#_">0982 123 234</a>
              <a href="#_">mathcha88@fpt.edu.com</a>
            </div>
          </div>
          <div className="items-start flex flex-col gap-2 md:gap-[21px]">
            <div className="font-montserrat text-base leading-5 tracking-[0.03em] flex flex-col gap-2.5 font-medium">
              <Button
                label="Học ngay"
                className="border whitespace-nowrap flex justify-center items-center gap-2.5 px-[24px] border-[#ECDBBA] max-w-[221px] py-[8px] rounded-[68px]"
                endIcon={
                  <img src={"/assets/nft/rightarrow.svg"} alt="get nft" />
                }
                font="font-montserrat text-base leading-5 tracking-[0.03em] font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
