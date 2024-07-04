import {Link, useLocation, useParams} from "react-router-dom";

import {MenuLearning} from "../../components/Student/MenuLearning";
import React, {useEffect, useState} from "react";
import api from "../../config/axios";
export default function CourseDetail() {
  const { courseId} = useParams();
  const [course, setCourse] = useState({});
  // const [lessons, setLessons] = useState([]);
  // const [firstLessonId, setFirstLessonId] = useState(null);

  // get Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/course/${courseId}`);
        setCourse(response.data.data);
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
      }
    };
    fetchCourse();
  }, [courseId]);

  return (
    <div className="bg-mathcha min-h-screen">
      {/* Navbar */}
      <div className=" bg-orange-100 text-blue-800 px-10 z-10 w-full">
        <div className="flex items-center justify-between text-5x1">
          <div className="">
            <Link to={'/learning'}>
              <img src="/assets/Logo-removebg.png" width={150} alt="a" />
            </Link>
          </div>
        </div>
      </div>
      <div className=" border-[5px] border-mathcha-orange w-full "></div>

      {/* Main */}
      <div className="flex flex-row py-12 px-10 ">
        {/* Menu */}
        <div className="w-3/12 mr-10">
          <div className="w-full">
            <MenuLearning/>
            <div className={'flex items-center justify-start my-7'}>
              <Link
                  className={'flex text-lg gap-1 py-1 px-2 rounded-xl bg-pink-300 font-medium border-2 border-black'}
                  to={`/learning`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
                </svg>
                Trang chủ
              </Link>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="w-9/12 ">
          <div
              className="bg-no-repeat bg-blue-50 border-4 border-black rounded-xl w-full h-120 py-3 px-3 flex flex-col items-center justify-center">
            {/* detail */}
            <div className="flex flex-col items-center">
              <p className="text-5xl text-indigo-900 text-center mb-6 mt-3">
                <strong>Khóa: {course.title}</strong>
              </p>
              <img
                  src={course.image}
                  alt="Loading..."
                  className="rounded-3xl"
                  style={{objectFit: 'cover', width: '500px', height: '306px'}}
              />
              <span className="mt-10 mb-5">
                <strong>Mô tả: </strong>
                <p>{course.description}</p>
              </span>
            </div>
            {/* button */}
            {/*<div*/}
            {/*    className="hover:bg-pink-300 bg-no-repeat bg-blue-200 border-2 border-black rounded-xl h-120 py-3 flex flex-col items-center justify-center gap-5">*/}
            {/*  <Link to={`/learning/course/${courseId}/topic/${topicId}/lesson/${firstLessonId}`}*/}
            {/*        className={'font-medium text-xl flex gap-2 justify-center items-center px-2'}*/}
            {/*  >*/}
            {/*    <span>Bắt đầu bài học đầu tiên</span>*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}*/}
            {/*         stroke="currentColor" className="size-6">*/}
            {/*      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>*/}
            {/*    </svg>*/}
            {/*  </Link>*/}
            {/*</div>*/}
            <div className={'flex items-center justify-between gap-16 text-3xl mt-5'}>
              <div>
                <strong>Tổng số chapters</strong>
              </div>
              <div>
                <strong>Tổng số topics</strong>
              </div>
              <div>
                <strong>Tổng số lessons</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// {/*{lessons.map((lesson, index) => (*/}
// {/*    <div*/}
// {/*         className="bg-no-repeat bg-blue-100 border-4 border-black rounded-xl h-120 py-3 flex flex-col items-center justify-center gap-5">*/}
// {/*      <Link to={'/learning/course/'+courseId+'/topic/'+topicId+'/lesson/'+lesson.lesson_id}>Bắt đầu với bài học đầu tiên</Link>*/}
// {/*    </div>*/}
// {/*))}*/}
