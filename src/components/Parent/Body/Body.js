// import React, { useState, useEffect} from "react";
// import {Link} from 'react-router-dom'
// import Marquee from "react-fast-marquee";
// import { listCourses} from '../../../services/CourseService/CourseService'
// import "@fontsource/montserrat";


// const sellNft = [
//   {
//     img: "/assets/Student/outstanding-student-1.png",
//     title: "Chị A",
//     desc: "Create your collection, Add social links, a description, profile & banner images, and set a secondary sales fee",
//   },
//   {
//     img: "/assets/Student/outstanding-student-2.png",
//     title: "Anh B",
//     desc: "Upload your work, add a title and description, and customize your NFTs with properties, stats",
//   },
//   {
//     img: "/assets/Student/outstanding-student-3.png",
//     title: "Chị C",
//     desc: "Choose between auctions and declining-price listings. You choose how you want to sell your NFTs",
//   },
// ];
// const topcreator = [
//   {
//     img: "/assets/nft/creator1.png",
//     name: "Axio Sun",
//     ethe: "80224",
//   },
//   {
//     img: "/assets/nft/creator2.png",
//     name: "Gloria Wolff MD",
//     ethe: "29369",
//   },
//   {
//     img: "/assets/nft/creator3.png",
//     name: "Albert Trantow",
//     ethe: "53808",
//   },
//   {
//     img: "/assets/nft/creator4.png",
//     name: "Alexis Mante",
//     ethe: "20123",
//   },
//   {
//     img: "/assets/nft/creator5.png",
//     name: "Cary Goldner",
//     ethe: "16548",
//   },
// ];
// const topcreator2 = [
//   {
//     img: "/assets/nft/creator6.png",
//     name: "Gregg Prosacco V",
//     ethe: "24507",
//   },
//   {
//     img: "/assets/nft/creator7.png",
//     name: "Angelina Koss",
//     ethe: "91031",
//   },
//   {
//     img: "/assets/nft/creator8.png",
//     name: "Axio Sun",
//     ethe: "80224",
//   },
//   {
//     img: "/assets/nft/creator2.png",
//     name: "Gloria Wolff MD",
//     ethe: "29369",
//   },
//   {
//     img: "/assets/nft/creator3.png",
//     name: "Albert Trantow",
//     ethe: "53808",
//   },
// ];


// export default function Body() {
//   const [courses, setCourses] = useState([]);

//     // fetch data
//     useEffect(()=>{
//       getCourseAll()
//     })
//     //Get All Course
//     function getCourseAll(){
//       listCourses().then((res)=>{
//         setCourses(res.data)
//       })
//     }

    
//   return (
//     <div className="flex text-[#000] flex-col items-center w-full overflow-x-hidden ">
//       <div className="bg-white w-full flex flex-col  gap-[100px] justify-center items-center ">    
//       <img src={"/assets/trang chu-02.png"} alt="bubble" />  
//         <div className="px-[4%]">
//           <div className="max-w-[1180px] flex flex-col gap-[50px]  lg:gap-[123px]">
//             {/* Danh sách lớp học */}
//             <div className="mt-[30px] md:mt-[93px] flex flex-col gap-[50px] max-w-[1180px] justify-center w-full ">
//               <div className=" flex justify-between items-center">
//                 <div className="font-Cormorant  text-[30px] md:text-5xl font-bold leading-[58px] tracking-[0.03em] mb-3">
//                   Danh sách lớp học
//                 </div>
//                 <Link className="flex text-lg font-bold text-center px-[30px] py-3 border-2 border-mathcha-orange rounded-[68px] hover:text-white duration-1000 hover:bg-[#2D4263] hover:border-white"
//                   font="text-white font-normal">
//                   Xem thêm
//                 </Link>
//               </div>
//               <div>
//                 <div className="items-center justify-center flex flex-wrap gap-[30px] md:gap-[50px] lg:gap-[83px] md:px-0 px-[3%] w-full ">
//                   {courses.map((data, index) => {
//                     return (
//                       <div
//                         key={index}
//                         className="hover:scale-105 duration-1000 cursor-pointer flex flex-col justify-center items-center md:max-w-[300px] lg:max-w-[338px] w-full py-[4%] lg:py-[2%] max-h-fit xl:h-[410px] border-4 border-mathcha-orange rounded-[28px]"
//                       >
//                         <div className="px-[4%] w-full flex flex-col gap-4">
//                           <img
//                             src={`/assets/Class/${data.image}`}
//                             alt="a"
//                             className="rounded-3xl w-full "
//                           />
//                           <div className="w-full flex flex-col gap-4">
//                             <div className="flex flex-col gap-4">
//                               <div className="flex flex-col gap-[3px] items-start justify-start">
//                                 <div className="from-neutral-950 text-[28px] font-bold leading-[34px]">
//                                   {data.title}
//                                 </div>
//                               </div>
//                               <div className="flex justify-between items-center">
//                                 <div className="font-montserrat text-xl font-bold leading-[17px] text-red-500 ">
//                                   {data.discount_price}.000 VNĐ
//                                 </div>
//                                 <Link
//                                   to={`/course/${data.course_id}`}
//                                   // onClick={()=>getCourseById(data.course_id)}
//                                   className={"bg-mathcha-orange font-bold text-center border-2 rounded-[68px] p-2 hover:bg-black hover:border-white hover:text-white"}
//                                 >
//                                   Mua ngay
//                                  </Link>                                  
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
            
//             {/* Học sinh tiêu biểu */}
//             <div className="items-center flex flex-col gap-9 ">
//               <div className="font-Cormorant text-[25px] sm:text-5xl  font-bold leading-[58px]">
//                 Học sinh tiêu biểu
//               </div>
//               <div className="cursor-pointer flex flex-wrap justify-center gap-10  xl:gap-[84px] px-[4%] lg:px-0">
//                 {sellNft.map((data, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="px-[17px] hover:border-1 duration-1000 hover:shadow-pupularCard hover:shadow-white w-full lg:max-w-[280px] xl:max-w-[337px] pb-[2%] max-h-fit bg-white border-[4px] border-black rounded-[28px] flex flex-col gap-2.5 items-center justify-center"
//                     >
//                       <div className="max-w-[200px]">
//                         <img src={data.img} alt="img" />
//                       </div>
//                       <div className="bg-blue-50 rounded-lg ">
//                         <div className="bg-blue-100 rounded-lg whitespace-nowrap font-Cormorant text-[23px] sm:text-4xl text-center md:text-[26px] lg:text-4xl font-semibold leading-[44px]">
//                           {data.title}
//                         </div>
//                         <div className="font-montserrat rounded-lg text-[15px] text-center md:text-[22px] lg:text-base  md:leading-[25px] font-normal leading-5  tracking-[0.03em]">
//                           {data.desc}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Feedback */}
//         <div className="flex flex-col items-center gap-[70px]">
//           <div className="text-5xl font-Cormorant leading-[58px] font-bold">
//             Đánh giá khóa học
//           </div>
//           <div className="flex  ">
//             <Marquee gradient={false} pauseOnHover>
//               {topcreator.map((data, index) => {
//                 return (
//                   <div
//                     key={index}
//                     className="max-w-fit flex items-center gap-[22px]"
//                   >
//                     <div>
//                       <img src={data.img} alt="img" />
//                     </div>
//                     <div className="text-start flex flex-col gap-2.5">
//                       <div className="whitespace-nowrap font-Cormorant text-2xl leading-[29px] tracking-[0.03em] font-semibold">
//                         {data.name}
//                       </div>
//                       <div className="flex gap-2.5 items-center font-montserrat text-sm leading-[17px] tracking-[0.03em] font-normal">
//                         <svg
//                           width="26"
//                           height="26"
//                           viewBox="0 0 26 26"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <rect width="26" height="26" rx="13" fill="#C84B31" />
//                           <path
//                             d="M13 4.33331L7.94446 13.2114L13 16.3821L18.0556 13.2114L13 4.33331ZM7.94446 14.2683L13 21.6666L18.0556 14.2683L13 17.439L7.94446 14.2683Z"
//                             fill="#ECDBBA"
//                           />
//                         </svg>
//                         {data.ethe}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </Marquee>
//           </div>
//           <div className="flex">
//             <Marquee gradient={false} speed={20} direction="right" pauseOnHover>
//               {topcreator2.map((data, index) => {
//                 return (
//                   <div
//                     key={index}
//                     className="max-w-fit flex items-center gap-[22px]"
//                   >
//                     <div>
//                       <img src={data.img} alt="imgaes" />
//                     </div>
//                     <div className="text-start flex flex-col gap-2.5">
//                       <div className="whitespace-nowrap font-Cormorant text-2xl leading-[29px] tracking-[0.03em] font-semibold">
//                         {data.name}
//                       </div>
//                       <div className="flex gap-2.5 items-center font-montserrat text-sm leading-[17px] tracking-[0.03em] font-normal">
//                         <svg
//                           width="26"
//                           height="26"
//                           viewBox="0 0 26 26"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <rect width="26" height="26" rx="13" fill="#C84B31" />
//                           <path
//                             d="M13 4.33331L7.94446 13.2114L13 16.3821L18.0556 13.2114L13 4.33331ZM7.94446 14.2683L13 21.6666L18.0556 14.2683L13 17.439L7.94446 14.2683Z"
//                             fill="#ECDBBA"
//                           />
//                         </svg>
//                         {data.ethe}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </Marquee>
//           </div>
//         </div>

//         {/* Liên hệ  */}
//         <div className="flex flex-col items-center justify-center p-12 bg-mathcha-orange rounded-2xl mb-10">
//           <div className="text-5xl font-Cormorant leading-[58px] font-bold">            Liên hệ
//           </div>
//           <div className="w-128 mx-auto">
//             <form action="https://formbold.com/s/FORM_ID" method="POST">
//               <div className="mb-5 w-full">
//                 <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
//                   Họ và tên
//                 </label>
//                 <input type="text" name="name" id="name" placeholder="Họ và tên" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
//               </div>
//               <div className="mb-5">
//                 <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
//                   Số điện thoại
//                 </label>
//                 <input type="email" name="email" id="email" placeholder="Số điện thoại" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
//               </div>
//               <div className="mb-5">
//                 <label htmlFor="message" className="mb-3 block text-base font-medium text-[#07074D]">
//                   Thắc mắc
//                 </label>
//                 <textarea rows={4} name="message" id="message" placeholder="Thắc mắc" className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" defaultValue={""} />
//               </div>
//               <div>
//                 <button className="hover:shadow-form rounded-md bg-mathcha-green py-3 px-8 text-base font-semibold text-white outline-none">
//                   Gửi
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
