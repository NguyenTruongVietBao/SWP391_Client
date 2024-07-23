import React, {useEffect, useState} from 'react';
import Menu from "../../components/Manager/Menu";
import api from "../../config/axios";
import {Link} from "react-router-dom";

function CoursePage(props) {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('all'); // New state for filter
    const coursesPerPage = 8;

    useEffect(() => {
        const fetchCoursesWithPayments = async () => {
            try {
                const courseResponse = await api.get('/course/get');
                const coursesData = courseResponse.data.data;

                const coursesWithPayments = await Promise.all(
                    coursesData.map(async (course) => {
                        // Fetch payment data for each course
                        const paymentResponse = await api.get(`/payment/course/${course.course_id}`);
                        return {
                            ...course,
                            paymentCount: paymentResponse.data.data.length,
                        };
                    })
                );

                // Filter courses based on the selected filter
                const filteredCourses = coursesWithPayments.filter(course => {
                    if (filter === 'all') return true;
                    if (filter === 'approved') return course.status === true;
                    if (filter === 'pending') return course.status === null;
                    if (filter === 'rejected') return course.status === false;
                });

                setCourses(filteredCourses);
            } catch (error) {
                console.error("Error fetching courses or payments:", error);
            }
        };

        fetchCoursesWithPayments();
    }, [filter]); // Add filter as a dependency to re-fetch when filter changes

    // Pagination logic
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <Menu />
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                    <div id="manage-course">
                        <h1 className="font-bold pb-4 uppercase">Quản lý khóa học</h1>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex space-x-2">
                                <button
                                    className={`px-4 py-2 ${filter === 'all' ? 'p-2 rounded-xl bg-mathcha-orange text-white' : 'p-2 rounded-xl bg-gray-200 text-gray-800'}`}
                                    onClick={() => setFilter('all')}>
                                    Tất cả
                                </button>
                                <button
                                    className={`px-4 py-2 ${filter === 'approved' ? 'p-2 rounded-xl bg-mathcha-green text-white' : 'p-2 rounded-xl bg-gray-200 text-gray-800'}`}
                                    onClick={() => setFilter('approved')}>
                                    Đã chấp thuận
                                </button>
                                <button
                                    className={`px-4 py-2 ${filter === 'pending' ? 'p-2 rounded-xl bg-mathcha-orange text-white' : 'p-2 rounded-xl bg-gray-200 text-gray-800'}`}
                                    onClick={() => setFilter('pending')}>
                                    Đang đợi duyệt
                                </button>
                                <button
                                    className={`px-4 py-2 ${filter === 'rejected' ? 'p-2 rounded-xl bg-red-500 text-white' : 'p-2 rounded-xl bg-gray-200 text-gray-800'}`}
                                    onClick={() => setFilter('rejected')}>
                                    Đã từ chối
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-scroll">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                                <tr>
                                    <th className="text-center py-3 px-2 rounded-l-lg">Thông tin</th>
                                    <th className="text-left py-3 px-2">Giá gốc</th>
                                    <th className="text-left py-3 px-2">Khuyến mãi</th>
                                    <th className="text-left py-3 px-2">Đã bán</th>
                                    <th className="text-center py-3 px-2 rounded-r-lg">Trạng thái</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentCourses.map((data) => (
                                    <tr key={data.course_id} className="border-b border-gray-700">
                                        <td className="py-3 pl-2 font-bold">
                                            <Link to={`./${data.course_id}`}>
                                                <div className="inline-flex space-x-3 items-center ">
                                                        <span>
                                                            <img className="rounded-lg w-16 h-16" alt="a" src={data.image} />
                                                        </span>
                                                    <span>{data.title}</span>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="py-3 px-2">{data.original_price}.000 VNĐ</td>
                                        <td className="py-3 px-2">{data.discount_price}.000 VNĐ</td>
                                        <td className="py-3 px-2">{data.paymentCount} khóa</td>
                                        <td className="py-3 px-2">
                                            <div className="flex items-center justify-center space-x-3 ">
                                                {data.status === null ? (
                                                    <span className={'p-2 rounded-xl bg-mathcha-orange text-white'}>
                                                            Đang đợi duyệt
                                                        </span>
                                                ) : data.status ? (
                                                    <span className={'p-2 rounded-xl bg-mathcha-green text-white'}>
                                                            Đã chấp thuận
                                                        </span>
                                                ) : (
                                                    <span className={'p-2 rounded-xl bg-red-500 text-white'}>
                                                            Đã từ chối
                                                        </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination flex justify-center mt-4">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 mx-1 ${index + 1 === currentPage ? 'bg-mathcha-orange rounded-lg text-black font-bold' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:bg-gray-300 focus:text-gray-900'}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursePage;