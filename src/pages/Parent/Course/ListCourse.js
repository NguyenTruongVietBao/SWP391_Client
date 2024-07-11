import React, { useEffect, useState } from 'react'
import {listCourses, listCoursesNotBought} from '../../../services/CourseService/CourseService'
import { Link } from 'react-router-dom';
import api from "../../../config/axios";
import {useSelector} from "react-redux";
import {selectUser} from "../../../redux/features/counterSlice";

export default function ListCourse() {
    const [courses, setCourses] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const user = useSelector(selectUser);
    const [userId, setUserId] = useState(null);

    // List all courses
    useEffect(() => {
        if (user === null) {
            getCourseAll();
        }
    }, [user]);

    function getCourseAll() {
        listCourses()
            .then((res) => {
                setCourses(res.data.data);
            });
    }

    // List course not bought - PARENT
    useEffect(() => {
        if (user !== null) {
            setUserId(user.user_id);
        }
    }, [user]);

    useEffect(() => {
        if (userId !== null) {
            getCourseNotBought(userId);
        }
    }, [userId]);

    const getCourseNotBought = async (userId) => {
        try {
            const resCourse = await api.get(`/course/notbought/${userId}`);
            setCourses(resCourse.data.data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        }
    };

    // Filter and paginate courses
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(filterText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="flex text-[#000] flex-col items-center w-full overflow-x-hidden">
            <div className="bg-gradient-to-r from-mathcha via-white to-mathcha flex flex-col gap-[100px] justify-center items-center w-full min-h-screen">
                <div className="max-w-[1180px] flex flex-col gap-[50px] lg:gap-[123px]">
                    <div className="flex flex-col gap-[50px] max-w-[1180px] justify-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="mt-20 text-6xl font-bold leading-[58px] tracking-[0.03em]" style={{ fontFamily: 'monospace, sans-serif' }}>
                                Danh sách các khóa học
                            </div>
                        </div>

                        <div>
                            <div className={'flex mb-10 items-center justify-center'}>
                                <input
                                    type="text"
                                    className="px-4 py-2 text-black border-4 rounded-2xl border-mathcha-green"
                                    placeholder="Tìm kiếm khóa học"
                                    value={filterText}
                                    onChange={(e) => setFilterText(e.target.value)}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                                </svg>
                            </div>
                            <div
                                className="mb-10 items-center justify-center flex flex-wrap gap-[30px] md:gap-[50px] lg:gap-[83px] md:px-0 px-[4%] w-full">
                                {paginatedCourses.filter(course => course.status).map((course, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="hover:scale-105 duration-1000 cursor-pointer flex flex-col justify-center items-center md:max-w-[300px] lg:max-w-[338px] w-full py-[4%] lg:py-[3%] max-h-fit xl:h-[410px] border-4 border-mathcha-orange rounded-[28px]"
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
                                                <div className="w-full flex flex-col gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div
                                                            className="flex flex-col gap-[3px] items-start justify-start">
                                                            <div
                                                                className="from-neutral-950 text-[28px] font-bold leading-[34px]">
                                                                {course.title}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div
                                                                className="font-montserrat text-xl font-bold leading-[17px] text-red-500">
                                                                {course.discount_price}.000 VNĐ
                                                            </div>
                                                            <Link
                                                                to={`/course/${course.course_id}`}
                                                                className="bg-mathcha-orange font-bold text-center border-2 rounded-[68px] p-2 hover:bg-black hover:border-white hover:text-white"
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
                            <div className="flex justify-center my-4">
                                <button
                                    className="px-4 py-2 mx-1 bg-mathcha-orange rounded-md hover:bg-black hover:text-white"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-mathcha-orange'}`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    className="px-4 py-2 mx-1 bg-mathcha-orange rounded-md hover:bg-black hover:text-white"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
