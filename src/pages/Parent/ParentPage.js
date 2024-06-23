import React, { useState, useEffect} from "react";
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import Marquee from "react-fast-marquee";
import "@fontsource/montserrat";
import { listCourses, listCoursesNotBought } from "../../services/CourseService/CourseService";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { toast } from "react-toastify";

const sellNft = [
  {
    img: "/assets/Student/outstanding-student-1.png",
    title: "Chị A",
    desc: "Create your collection, Add social links, a description, profile & banner images, and set a secondary sales fee",
  },
  {
    img: "/assets/Student/outstanding-student-2.png",
    title: "Anh B",
    desc: "Upload your work, add a title and description, and customize your NFTs with properties, stats",
  },
  {
    img: "/assets/Student/outstanding-student-3.png",
    title: "Chị C",
    desc: "Choose between auctions and declining-price listings. You choose how you want to sell your NFTs",
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
const topcreator2 = [
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


export default function ParentPage() {
    const [courses, setCourses] = useState([]);
    const [displayedCourses, setDisplayedCourses] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const user = useSelector(selectUser);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const course_id = searchParams.get('course_id');
    const student_id = searchParams.get('student_id');
    const amount = searchParams.get('vnp_Amount');
    const statusPayment = searchParams.get('vnp_TransactionStatus');
    useEffect(() => {
      if (user !== null) {
        setUserId(user.user_id);
      }
    }, [user]);

    useEffect(() => {
      if (user === null) {
        getCourseAll()
      }
    });
    function getCourseAll(){
      listCourses()
        .then((res)=>{
          setCourses(res.data.data)
          setDisplayedCourses(res.data.data.slice(0, 6));
        })
    }

    useEffect(() => {
      if (userId !== null) {
        getCourseNotBought(userId);
      }
    }, [userId]);
    const getCourseNotBought = async (userId) => {
      try {
        const resCourse = await api.get(`/course/notbought/${userId}`);
        setCourses(resCourse.data.data);
        setDisplayedCourses(resCourse.data.data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    //Payment
    useEffect(() => {
      const createEnrollmentPayment = async () => {
          try {
              const enrollmentResponse = await api.post('/enrollment/create', {
                  "course_id":course_id,
                  "student_id" : student_id
              });
              const enrollmentId = enrollmentResponse.data.data.enrollment_id; 
              console.log(enrollmentId, amount, userId);
              const paymentResponse = await api.post('/payment/callback', {
                  "amount":amount,
                  "enrollment_id":enrollmentId,
                  "user_id": user.user_id
              });
              console.log(enrollmentId, amount, userId);
          } catch (error) {
              console.error('Error creating enrollment or payment:', error);
          }
      };
      if (statusPayment === '00') {
        createEnrollmentPayment();
        navigate('/')
        toast.success('Mua thành công <3')
      }
    }, [course_id, student_id, amount, statusPayment]);

  return (
    <div className="flex text-gray-800 flex-col items-center w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-mathcha via-white to-mathcha flex flex-col gap-[100px] justify-center items-center w-full h-full">
        <div className="flex items-center justify-center w-full h-full">
          <img src={"/assets/trang chu-02.png"} alt="a" className="w-full h-full object-contain" />
        </div>
            {user !== null && (
              <Link to={'/my-course'} className="flex text-lg font-bold text-center px-[30px] py-3 border-2 border-mathcha-orange rounded-[68px] hover:text-white duration-1000 hover:bg-[#2D4263] hover:border-white"
                font="text-white font-normal">
                  Khóa học đã mua
              </Link>
            )} 
        <div className="px-[4%] ">
          <div className="max-w-[1180px] flex flex-col gap-[50px] lg:gap-[123px]">
            {/* Danh sách lớp học */}            
            <div className=" flex flex-col gap-[50px] max-w-[1180px] justify-center w-full ">                
              <div className=" flex justify-between items-center">             
                <div className=" text-[30px] md:text-5xl font-bold leading-[58px] tracking-[0.03em] mb-3" style={{ fontFamily: 'monospace, sans-serif' }}>
                  Danh sách lớp học
                </div>
                {!showAll && courses.length > 6 && (
                  <Link to={'/course'} className="flex text-lg font-bold text-center px-[30px] py-3 border-2 border-mathcha-orange rounded-[68px] hover:text-white duration-1000 hover:bg-[#2D4263] hover:border-white"
                    font="text-white font-normal">
                    Xem thêm
                  </Link>
                )}
              </div>
              <div>
                <div className="items-center justify-center flex flex-wrap gap-[30px] md:gap-[50px] lg:gap-[83px] md:px-0 px-[4%] w-full ">
                  {displayedCourses.map((course, index) => {
                    return (
                      <div
                        key={index}
                        className="hover:scale-105 duration-1000 cursor-pointer flex flex-col justify-center items-center md:max-w-[300px] lg:max-w-[338px] w-full py-[4%] lg:py-[3%] max-h-fit xl:h-[410px] border-4 border-mathcha-orange rounded-[28px]"
                      >
                        <div className="px-[4%] w-full flex flex-col gap-4">
                          <img
                            src={`/assets/Class/${course.image}.png`}
                            alt="img not found :<"
                            className="rounded-3xl" 
                            width={306}
                            height={264}
                          />
                          <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-[3px] items-start justify-start">
                                <div className="from-neutral-950 text-[28px] font-bold leading-[34px]">
                                  {course.title}
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="font-montserrat text-xl font-bold leading-[17px] text-red-500 ">
                                  {course.discount_price}.000 VNĐ
                                </div>
                                <Link
                                  to={`/course/${course.course_id}`}                              
                                  className={"bg-mathcha-orange font-bold text-center border-2 rounded-[68px] p-2 hover:bg-black hover:border-white hover:text-white"}
                                >
                                  Mua ngay
                                 </Link>                                  
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
            {/* Học sinh tiêu biểu */}
            <div className="items-center w-full flex flex-col gap-9 bg-mathcha rounded-3xl py-3">
            {/* <div className="items-center max-w-full flex flex-col gap-9 bg-gradient-to-r from-mathcha  via-white  to-mathcha rounded-3xl"> */}
              <h1 className="text-5xl font-bold">Chương trình giảng dạy</h1>
              <div className="flex items-center justify-between gap-10">
                  <div className="text-center w-1/4">
                    <img src="./assets/uom mam.png" alt="a" width={300}/>
                    <span className="font-bold">CHƯƠNG TRÌNH KHỞI ĐẦU</span>
                    <div className="font-bold mb-5">(3 – 6 TUỔI)</div>                   
                    <p>Chương trình Khởi đầu trang bị cho trẻ nền tảng vững chắc về kiến thức Toán và thúc đẩy quá trình phát triển Tư duy.</p>
                  </div>
                  <div className="text-center w-1/4">
                  <img src="./assets/tieu hoc 1.png" alt="a" width={300}/>
                    <span className="font-bold">CHƯƠNG TRÌNH TIỂU HỌC</span>
                    <div className="font-bold mb-5">(6 – 11 TUỔI)</div>
                    <p>Chương trình Khởi đầu trang bị cho trẻ nền tảng vững chắc về kiến thức Toán và thúc đẩy quá trình phát triển Tư duy.</p>
                  </div>
                  <div className="text-center w-1/4">
                  <img src="./assets/tieu hoc 2.png" alt="a" width={300}/>
                    <span className="font-bold">CHƯƠNG TRÌNH TRUNG HỌC</span>
                    <div className="font-bold mb-5">(11 – 15 TUỔI)</div>
                    <p>Chương trình Khởi đầu trang bị cho trẻ nền tảng vững chắc về kiến thức Toán và thúc đẩy quá trình phát triển Tư duy.</p>
                  </div>
                  <div className="text-center w-1/4">
                  <img src="./assets/tieu hoc 3.png" alt="a" width={300}/>
                    <span className="font-bold">CHƯƠNG TRÌNH TRUNG HỌC</span>
                    <div className="font-bold mb-5">(11 – 15 TUỔI)</div>
                    <p>Chương trình Khởi đầu trang bị cho trẻ nền tảng vững chắc về kiến thức Toán và thúc đẩy quá trình phát triển Tư duy.</p>
                  </div>           
              </div> 
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="flex flex-col items-center gap-[70px] my-6 bg-mathcha py-2">
          <div className="text-5xl leading-[58px] font-bold ">
            Đánh giá khóa học
          </div>
          <div className="flex">
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
              {topcreator2.map((data, index) => {
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

        {/* Liên hệ  */}
        <div className="flex flex-col items-center justify-center p-12 backdrop-blur-sm bg-mathcha-green/30  rounded-2xl mb-10">
          <div className="text-5xl font-Cormorant leading-[58px] font-bold mb-5">            
            Đăng ký tư vấn
          </div>
          <div className="w-128 mx-auto">
            <form action="https://formbold.com/s/FORM_ID" method="POST">
              <div className="mb-5 w-full">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                  Họ và tên
                </label>
                <input type="text" name="name" id="name" placeholder="Họ và tên" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                  Số điện thoại
                </label>
                <input type="email" name="email" id="email" placeholder="Số điện thoại" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>
              <div className="mb-5">
                <label htmlFor="message" className="mb-3 block text-base font-medium text-[#07074D]">
                  Thắc mắc
                </label>
                <textarea rows={4} name="message" id="message" placeholder="Thắc mắc" className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" defaultValue={""} />
              </div>
              <div>
                <button className="hover:shadow-form rounded-md bg-mathcha-orange py-3 px-8 text-base font-semibold  outline-none">
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
