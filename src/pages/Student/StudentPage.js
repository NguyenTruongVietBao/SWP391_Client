import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Menu from '../../components/Student/Menu';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import api from '../../config/axios';

export default function StudentPage() {
    const user = useSelector(selectUser);
    const studentId = user.user_id;
    console.log(studentId);
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      api.get(`/student/${studentId}/courses`)
        .then((res)=>{
            setCourses(res.data.data)
        })
        .catch(error => console.error('Error fetching courses:', error));
    }, [studentId]);

    console.log(courses);
    return (
      <div className="bg-cover min-h-screen" style={{ backgroundImage: 'url("/assets/wallpaper-learning-student.png")' }}>
        {/* Navbar */}
        <div className="bg-orange-100 text-blue-800 px-10 z-10 w-full">
          <div className="flex items-center justify-between text-5x1">
            <div>
              <img src="/assets/Logo-removebg.png" width={150} alt="Logo" />
            </div>
            <div className="flex justify-start text-gray-700">
              <div className="relative w-full">
                <input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 px-10 rounded-lg focus:outline-none border-2 border-gray-950 focus:border-violet-300 transition-colors duration-300" placeholder="Tìm kiếm khóa học" />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[5px] border-mathcha-orange w-full"></div>
        {/* Main */}
        <div className="flex flex-row py-12 px-10">
          {/* Menu */}
          <Menu />
          {/* Body */}
          <div className="w-10/12">
            <div className="grid grid-cols-3 gap-10">
              {/* List course student */}
              {courses.map(course => (
                <div key={course.course_id} className="bg-no-repeat bg-blue-100 border-4 border-black rounded-xl h-120 py-3 flex flex-col items-center justify-center gap-5">
                  <img src={course.iamge} alt={`image_course_${course.course_id}`} className="rounded-xl" />
                  <p className="text-5xl text-indigo-900"><strong>{course.title}</strong></p>
                  <Link to={`/course/${course.course_id}`} className="bg-orange-300 text-xl text-white rounded-full px-8 py-2 border-2 border-black"><strong>Học</strong></Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
