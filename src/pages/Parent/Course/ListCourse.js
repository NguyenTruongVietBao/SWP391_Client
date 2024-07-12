import React, { useEffect, useState } from 'react'
import {listCourses} from '../../../services/CourseService/CourseService'
import { Link } from 'react-router-dom';
import api from "../../../config/axios";
import {useSelector} from "react-redux";
import {selectUser} from "../../../redux/features/counterSlice";

export default function ListCourse() {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const user = useSelector(selectUser);
    const [userId, setUserId] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    //popup detail course
    const handleImageClick = (course) => {
        setSelectedCourse(course);
    };
    const handleClosePopup = () => {
        setSelectedCourse(null);
    };

    // Fetch all categories
    useEffect(() => {
        getAllCategories();
    }, []);
    const getAllCategories = async () => {
        try {
            const res = await api.get('/category/get/all');
            setCategories(res.data.data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

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
        course.title.toLowerCase().includes(filterText.toLowerCase()) &&
        (selectedCategory === '' || course.category_id === parseInt(selectedCategory))
    );
    console.log(filteredCourses)
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
                            <div className={'flex items-center justify-center'}>
                                <div>
                                    <select
                                        className="px-4 py-2 text-black border-2 mr-2"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Tất cả danh mục</option>
                                        {categories.map(category => (
                                            <option key={category.category_id} value={category.category_id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center justify-center">
                                    <input
                                        type="text"
                                        className="px-4 py-2 text-black border-2 rounded-2xl border-mathcha-green"
                                        placeholder="Tìm kiếm theo tên"
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div
                                className="my-10 items-center justify-center flex flex-wrap gap-[30px] md:gap-[50px] lg:gap-[83px] md:px-0 px-[4%] w-full">
                                {paginatedCourses.filter(course => course.status).map((course, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="hover:scale-105 duration-1000 cursor-pointer flex flex-col justify-center items-center md:max-w-[300px] lg:max-w-[338px] w-full py-[4%] lg:py-[3%] max-h-fit xl:h-[450px] border-4 border-mathcha-orange rounded-[28px]"
                                        >
                                            <div className="px-[4%] w-full flex flex-col gap-4">
                                                <img
                                                    src={course.image}
                                                    alt="img not found"
                                                    className="rounded-3xl"
                                                    width="306"
                                                    height="264"
                                                    style={{objectFit: 'cover', width: '306px', height: '264px'}}
                                                    onClick={() => handleImageClick(course)}
                                                />
                                                <div className="w-full flex flex-col gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex gap-[3px] items-center justify-between">
                                                            <div
                                                                className="font-montserrat-950 text-3xl text-cyan-600 font-bold leading-[34px]">
                                                                {course.title}
                                                            </div>
                                                            <div
                                                                className="from-neutral-950 text-lg font-medium leading-[34px] bg-blue-200 rounded-xl px-1">
                                                                Lớp {course.category_id}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center my-2">
                                                            <div
                                                                className="line-through font-montserrat text-lg font-medium leading-[17px]">
                                                                {course.original_price}.000 VNĐ
                                                            </div>
                                                            <div
                                                                className="font-montserrat text-2xl font-bold leading-[17px] text-red-500 ">
                                                                {course.discount_price}.000 VNĐ
                                                            </div>
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
                                    );
                                })}
                                {selectedCourse && (
                                    <div
                                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                        <div
                                            className="bg-white p-6 rounded-lg max-w-lg w-full flex flex-col items-center">
                                            <button onClick={handleClosePopup} className="text-black text-right w-full text-4xl">
                                                &times;
                                            </button>
                                            <h2 className="text-4xl text-cyan-600 font-bold">{selectedCourse.title}</h2>
                                            <img
                                                src={selectedCourse.image}
                                                alt="img not found"
                                                className="rounded-3xl my-5"
                                                width="306"
                                                height="264"
                                                style={{objectFit: 'cover', width: '306px', height: '264px'}}
                                            />
                                            <p><strong>Mô tả: </strong>{selectedCourse.description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center my-4">
                                <button
                                    className="px-4 py-2 mx-1 bg-mathcha-orange rounded-md hover:bg-black hover:text-white"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Trước
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
                                    Sau
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}