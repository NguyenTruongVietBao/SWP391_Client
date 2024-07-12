import React, {useEffect, useState} from 'react'
import Menu from '../../components/Manager/Menu'
import api from "../../config/axios";
import {Link} from "react-router-dom";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement
);

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
    // chartData
    const chartData = {
        labels: courses.filter(course => course.revenue > 0).map(course => course.title),
        datasets: [
            {
                label: 'Doanh thu',
                data: courses.filter(course => course.revenue > 0).map(course => course.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Số khóa học đã bán',
                data: courses.filter(course => course.revenue > 0 || course.paymentCount > 0).map(course => course.paymentCount),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh thu và số lượng thanh toán các khóa học',
            }
        },
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
                        {/*top 3*/}
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
                                            <button onClick={() => handleDialogOpen(course)}>Chi tiết</button>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/*total*/}
                        <div id="stats" className="flex gap-16 mt-10">
                            <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                                <div className="flex flex-row space-x-4 items-center">
                                    <div id="stats-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
                                        </svg>
                                    </div>
                                    <div className={'px-2'}>
                                        <p className="text-indigo-300 text-sm font-medium uppercase leading-4">Khóa học
                                            đã bán</p>
                                        <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                            <span>+{soldCoursesCount}</span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
                                                </svg>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black/60 p-6 rounded-lg w-80 max-w-full">
                                <div className="flex flex-row space-x-4 items-center">
                                    <div id="stats-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-teal-300 text-sm font-medium uppercase w-full leading-4">Tổng
                                            doanh thu</p>
                                        <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                            <span>{formatCurrency(totalRevenue)}</span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
                                                </svg>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*table*/}
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
                                            <button onClick={() => handleDialogOpen(data)}
                                                    className={'bg-amber-100 py-1 px-2 text-black rounded-xl font-medium hover:bg-mathcha-orange'}
                                            >
                                                Xem chi tiết
                                            </button>
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
                    <Bar data={chartData} options={chartOptions} />
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
                        <button onClick={handleDialogClose}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg">Đóng
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}