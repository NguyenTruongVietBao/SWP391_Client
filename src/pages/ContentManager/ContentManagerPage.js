import React, { useEffect, useState } from 'react'
import { Button } from '@headlessui/react'
import { listCourses } from '../../services/CourseService/CourseService'
import {Link} from 'react-router-dom'
import Menu from '../../components/ContentManager/Menu';
import Loading from '../../components/Loading/Loading';

export default function ContentManagerPage() {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const coursesPerPage = 8;

    useEffect(() => {
        getCourseAll();
    }, [searchTerm, statusFilter]);

    function getCourseAll() {
        listCourses()
            .then((res) => {
                const allCourses = res.data.data;

                // Filter courses based on search term and status filter
                const filteredCourses = allCourses.filter(course => {
                    const matchesSearchTerm = course.title.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesStatusFilter = statusFilter === 'all' ||
                        (statusFilter === 'approved' && course.status === true) ||
                        (statusFilter === 'rejected' && course.status === false)||
                        (statusFilter === 'progress' && course.status === null);
                    return matchesSearchTerm && matchesStatusFilter;
                });

                setCourses(filteredCourses);
            })
            .catch((error) => {
                console.log('Error fetching courses:', error);
            });
    }

    if (!courses) {
        return <div className='flex flex-col items-center justify-center h-screen'><Loading /></div>;
    }

    // Pagination logic
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="antialiased bg-orange-50 w-full min-h-screen text-black relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <Menu />
                <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
                    <div id="manage-course">
                        <div className='flex items-center justify-between mb-5'>
                            <h1 className="font-bold py-4 uppercase text-xl">Quản lý khóa học</h1>
                            <Button className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-black/60 via-black/80 to-black/60 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                <Link to={'./create'} className='flex'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Tạo khóa học
                                </Link>
                            </Button>
                        </div>
                        <div className='flex items-center mb-4'>
                            <input
                                type="text"
                                placeholder="Tìm theo tên khóa học"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mr-2 p-2 border border-gray-300 rounded"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            >
                                <option value="all">Tất cả</option>
                                <option value="approved">Đã chấp thuân</option>
                                <option value="rejected">Đã từ chối</option>
                                <option value="progress">Đang đợi duyệt</option>
                            </select>
                        </div>
                        <div className="overflow-x-scroll">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-gradient-to-br from-black/80 via-black/60 to-black/70  text-white/90">
                                <tr>
                                    <th className="text-left py-3 px-2 rounded-l-lg">Hình ảnh</th>
                                    <th className="text-center py-3 px-2">Khóa học</th>
                                    <th className="text-center py-3 px-2">Giá gốc</th>
                                    <th className="text-center py-3 px-2">Giá khuyến mãi</th>
                                    <th className="text-center py-3 px-2">Công khai</th>
                                    <th className="text-center py-3 px-2 rounded-r-lg">Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentCourses.map((data, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className="py-3 font-bold">
                                            <div className="inline-flex items-center">
                                                <img className="rounded-lg h-auto" src={data.image} alt="a" width={100} height={100} style={{ objectFit: 'cover', width: '100px', height: '100px' }} />
                                            </div>
                                        </td>
                                        <td className="py-3 px-2 text-center font-bold"><span>{data.title}</span></td>
                                        <td className="py-3 px-2 text-center">{data.original_price}.000 VNĐ</td>
                                        <td className="py-3 px-2 text-center">{data.discount_price}.000 VNĐ</td>
                                        <td className="py-3 px-2 text-center">
                                                <span
                                                    className={'p-2 rounded-xl ' + (data.status === null ? 'bg-yellow-500' : data.status ? 'bg-mathcha-green' : 'bg-red-500') + ' text-white'}>
                                                    {data.status === null ? 'Đang chờ duyệt' : data.status ? 'Đã chấp thuận' : 'Đã từ chối'}
                                                </span>
                                        </td>
                                        <td className="py-3 px-2 text-center">
                                            <div className="inline-flex items-center space-x-3 gap-2">
                                                <Link to={`./update/${data.course_id}`} title="Chỉnh sửa" className="hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <Link to={`./detail/${data.course_id}`} title="Chi tiết" className="hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination mt-4 flex justify-center">
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
