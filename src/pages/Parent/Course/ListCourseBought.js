import React, { useEffect, useState } from 'react'
import { listCourses } from '../../../services/CourseService/CourseService';
import { selectUser } from '../../../redux/features/counterSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../../config/axios';

export default function ListCourseBought() {
    const user = useSelector(selectUser);
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
      if(user !== null){
        getCourseAll()
      }
    })
    function getCourseAll(){
      api.get(`/course/bought/${user.user_id}`)
        .then((res)=>{
          setCourses(res.data.data)
        })
    }
    return (
      <div className="flex text-[#000] flex-col items-center w-full overflow-x-hidden">
        <div className="bg-gradient-to-r from-mathcha via-white to-mathcha flex flex-col gap-[100px] justify-center items-center w-full h-full">
          <div className="max-w-[1180px] flex flex-col gap-[50px] lg:gap-[123px]">
          <div className=" flex flex-col gap-[50px] max-w-[1180px] justify-center w-full ">
                <div className=" flex justify-between items-center mt-24">
                  <div className=" text-[30px] md:text-5xl font-bold leading-[58px] tracking-[0.03em] mb-3" style={{ fontFamily: 'monospace, sans-serif' }}>
                    Danh sách khóa học đã mua
                  </div>
                </div>
                <div>
                  <div className="items-center justify-center flex flex-wrap gap-[30px] md:gap-[50px] lg:gap-[83px] md:px-0 px-[4%] w-full mb-10">
                    {courses.map((course, index) => {
                      return (
                        <div
                          key={index}
                          className="flex hover:scale-105 duration-1000 cursor-pointer justify-center items-center md:max-w-[300px] lg:max-w-[338px] w-full lg:py-[3%] max-h-fit xl:h-[410px] border-4 border-mathcha-orange rounded-[28px]"
                        >
                            <div className="px-[4%] w-full flex flex-col gap-4">
                                <img
                                    src={course.image}
                                    alt="img not found"
                                    className="rounded-3xl"
                                    width="306"
                                    height="264"
                                    style={{objectFit: 'cover', width: '306px', height: '264px'}}
                                />
                                <div className="flex flex-col gap-[3px] items-center justify-between">
                                    <div className="from-neutral-950 text-[28px] font-bold leading-[34px]">
                                        {course.title}
                                    </div>
                                </div>
                            </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
          </div>
          </div>
        </div>
      </div>
    )
}
