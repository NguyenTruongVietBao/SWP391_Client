import React, {useEffect, useState} from 'react';
import Menu from "../../components/Manager/Menu";
import api from "../../config/axios";
import {Link} from "react-router-dom";

function CoursePage(props) {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await api.get(`/course/get`);
            setCourses(response.data.data);
        };
        fetchCourse();
    });


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
                        <h1 className="font-bold pb-4 uppercase">Manage Course</h1>
                        <div className="overflow-x-scroll">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                                <tr>
                                    <th className="text-center py-3 px-2 rounded-l-lg">Thông tin</th>
                                    <th className="text-left py-3 pr-2">Chapter</th>
                                    <th className="text-left py-3 px-2">Topic</th>
                                    <th className="text-left py-3 px-2">Lesson</th>
                                    <th className="text-left py-3 px-2">Giá gốc</th>
                                    <th className="text-left py-3 px-2">Khuyến mãi</th>
                                    <th className="text-center py-3 px-2 rounded-r-lg">Công khai</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentCourses.map((data) => (
                                    <tr key={data.course_id} className="border-b border-gray-700">
                                        <td className="py-3 pl-2 font-bold">
                                            <Link to={`./${data.course_id}`}>
                                                <div className="inline-flex space-x-3 items-center ">
                                                        <span>
                                                            <img
                                                                className="rounded-lg w-16 h-16"
                                                                alt="a"
                                                                src={data.image}
                                                            />
                                                        </span>
                                                    <span>{data.title}</span>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="py-3 pr-2">10</td>
                                        <td className="py-3 px-2">20</td>
                                        <td className="py-3 px-2">40</td>
                                        <td className="py-3 px-2">200</td>
                                        <td className="py-3 px-2">100</td>
                                        <td className="py-3 px-2">
                                            <div className="flex items-center justify-center space-x-3 ">
                                                {data.status === null ? (
                                                    <div>
                                                        {/*<button className={'p-2 rounded-xl bg-mathcha-green mr-2 text-white'}>*/}
                                                        {/*    Chấp thuận*/}
                                                        {/*</button>*/}
                                                        {/*<button className={'p-2 rounded-xl bg-red-500 text-white'}>*/}
                                                        {/*    Từ chối*/}
                                                        {/*</button>*/}
                                                        <span className={'p-2 rounded-xl bg-mathcha-orange text-white'}>
                                                            <span>Đang đợi duyệt</span>
                                                        </span>
                                                    </div>
                                                ) : data.status ? (
                                                    <span className={'p-2 rounded-xl bg-mathcha-green text-white'}>
                                                        <span>Đã chấp thuận</span>
                                                    </span>
                                                ) : (
                                                    <span className={'p-2 rounded-xl bg-red-500 text-white'}>
                                                        <span>Đã từ chối</span>
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 mx-1 ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
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