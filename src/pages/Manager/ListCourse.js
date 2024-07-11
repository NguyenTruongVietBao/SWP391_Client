import React, {useEffect, useState} from 'react'
import Menu from '../../components/Manager/Menu'
import api from "../../config/axios";
import {Link, useNavigate} from "react-router-dom";

export default function ListCourse(props) {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 5; // Set courses per page to 5
    const [top3Courses, setTop3Courses] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [soldCoursesCount, setSoldCoursesCount] = useState(0); // New state variable
    const [selectedCourse, setSelectedCourse] = useState(null); // State for selected course payments
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

    function formatCurrency(value) {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    }

    useEffect(() => {
        const fetchTop3CoursesWithRevenue = async () => {
            try {
                const coursesResponse = await api.get('course/get');
                const courses = coursesResponse.data.data;

                const coursesWithRevenueAndPayments = await Promise.all(
                    courses.map(async (course) => {
                        const [revenueResponse, paymentResponse] = await Promise.all([
                            api.get(`chart/revenue/course/${course.course_id}`),
                            api.get(`/payment/course/${course.course_id}`)
                        ]);
                        return {
                            ...course,
                            revenue: revenueResponse.data.data,
                            payments: paymentResponse.data.data,
                            paymentCount: paymentResponse.data.data.length,
                        };
                    })
                );

                const sortedCourses = coursesWithRevenueAndPayments.sort((a, b) => b.revenue - a.revenue);

                const top3Courses = sortedCourses.slice(0, 3);
                const totalRevenue = sortedCourses.reduce((acc, course) => acc + course.revenue, 0);
                const totalPaymentCount = sortedCourses.reduce((acc, course) => acc + course.paymentCount, 0);

                setTop3Courses(top3Courses);
                setTotalRevenue(totalRevenue);
                setCourses(sortedCourses);
                setSoldCoursesCount(totalPaymentCount);
            } catch (error) {
                console.error('Error fetching courses or revenue:', error);
            }
        };

        fetchTop3CoursesWithRevenue();
    }, []);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDialogOpen = (course) => {
        setSelectedCourse(course);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedCourse(null);
    };

    return (
        <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <Menu />
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                    <div id="manage-money" className="pb-12 pt-5">
                        <div className="flex items-center justify-between mb-5">
                            <h1 className="font-bold uppercase">Top 3 khóa học nổi bật</h1>
                        </div>
                        <div id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {top3Courses.map((course) => (
                                <div className="bg-black/60 to-white/5 rounded-lg" key={course.course_id}>
                                    <div className="flex flex-row items-center">
                                        <div className="text-3xl p-4">💰</div>
                                        <div className="p-2">
                                            <p className="text-xl font-bold">{course.revenue === null ? "0 VNĐ" : `${formatCurrency(course.revenue)}`}</p>
                                            <p className="text-gray-400 font-medium">{course.title}</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-white/5 p-4">
                                        <span className="inline-flex space-x-2 items-center text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                                            </svg>
                                            <span className="py-3 px-2 text-center">
                                                <button onClick={() => handleDialogOpen(course)}>Chi tiết</button>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <p className="text-xl font-bold">Số lượng khóa học đã bán: {soldCoursesCount} </p>
                            <p className="text-xl font-bold">Tổng thu nhập: {formatCurrency(totalRevenue)}</p>
                        </div>
                        <div className="overflow-x-scroll mt-10">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                                <tr>
                                    <th className="text-center py-3 px-2 rounded-l-lg">Thông tin</th>
                                    <th className="text-left py-3 px-2">Đã bán</th>
                                    <th className="text-left py-3 px-2">Tổng tiền</th>
                                    <th className="text-center py-3 px-2 rounded-r-lg">Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentCourses.filter(data => data.status === true).map((data) => (
                                    <tr key={data.course_id} className="border-b border-gray-700">
                                        <td className="py-3 pl-2 font-bold">
                                            <Link to={`./${data.course_id}`}>
                                                <div className="inline-flex space-x-3 items-center ">
                                                        <span>
                                                            <img className="rounded-lg w-16 h-16" alt="a"
                                                                 src={data.image}/>
                                                        </span>
                                                    <span>{data.title}</span>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="py-3 px-2">{data.paymentCount} khóa</td>
                                        <td className="py-3 px-2">{data.revenue === null ? "0 VNĐ" : `${formatCurrency(data.revenue)}`}</td>
                                        <td className="py-3 px-2 text-center">
                                            <button onClick={() => handleDialogOpen(data)}>Xem chi tiết</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination flex justify-center mt-4">
                            {Array.from({length: totalPages}, (_, index) => (
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

            {/* Dialog for payment details */}
            {isDialogOpen && selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Chi tiết thanh toán</h2>
                        {selectedCourse.payments.map((payment) => (
                            <div key={payment.payment_id} className="mb-4">
                                <p><strong>Họ tên:</strong> {payment.user.last_name}</p>
                                <p><strong>Tổng tiền:</strong> {payment.total_money}</p>
                                <p><strong>Ngày thanh toán:</strong> {payment.payment_date}</p>
                                <p><strong>Mã đơn hàng:</strong> {payment.orderId}</p>
                                <p><strong>Phương thức thanh toán:</strong> {payment.payment_method}</p>
                            </div>
                        ))}
                        <button onClick={handleDialogClose} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
}