import React, {useEffect, useState} from 'react';
import api from "../../config/axios";
import Menu from "../../components/Manager/Menu";
import {useLocation} from "react-router-dom";
import {Button, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function DetailYearPage() {
    const [year, setYear] = useState('');
    const [yearRevenue, setYearRevenue] = useState(0);
    const [numUserYear, setNumUserYear] = useState(0);
    const [dataUser, setDataUser] = useState({ users: [], revenue: [] });
    const location = useLocation();
    const { navigateYear} = location.state;
    const [userPaymentDetails, setUserPaymentDetails] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [dateDetail, setDateDetail] = useState('');

    const formatTime = (navigateDay) => {
        const year = navigateDay.substring(0, 4);
        const month = navigateDay.substring(4, 6);
        const day = navigateDay.substring(6, 8);
        const gio = navigateDay.substring(8, 10);
        const phut = navigateDay.substring(10, 12);
        const giay = navigateDay.substring(12, 14);
        return `${gio}:${phut}:${giay}  ${day}/${month}/${year}`;
    };
    function formatCurrency(value) {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    }
    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }
    useEffect(() => {
        setYear(navigateYear);
        setDateDetail(navigateYear);
        fetchMonthlyRevenue(navigateYear);
    }, []);
    const formatDate = (navigateDay) => {
        const year = navigateDay.substring(0, 4);
        const month = navigateDay.substring(4, 6);
        const day = navigateDay.substring(6, 8);
        return `${year}-${month}-${day}`;   //   yyyy-MM-dd
    };
    const fetchMonthlyRevenue = async (selectedYear) => {
        try {
            const response = await api.get(`/chart/revenue/yearly/${selectedYear}`);
            setYearRevenue(response.data.data.totalRevenue);
            setNumUserYear(response.data.data.revenue.length);
            setDataUser({ users: response.data.data.users, revenue: response.data.data.revenue });
        } catch (error) {
            console.error('Error fetching monthly revenue:', error);
        }
    };
    const handleFetchYearRevenue = async () => {
        try {
            const response = await api.get(`/chart/revenue/daily/${year}`);
            setYearRevenue(response.data.data.totalRevenue);
            setNumUserYear(response.data.data.revenue.length);
            setDataUser({ users: response.data.data.users, revenue: response.data.data.revenue });
            setDateDetail(navigateYear);
        } catch (error) {
            console.error('Error fetching daily revenue:', error);
        }
    };
    const fetchUserPaymentDetails = async (userId, paymentDate) => {
        try {
            const response = await api.get(`/payment/user/${userId}/year/${paymentDate}`);
            setUserPaymentDetails(response.data.data);
            console.log(userPaymentDetails)
        } catch (error) {
            console.error('Error fetching user payment details:', error);
        }
    };
    const handleViewDetailsClick = (userId) => {
        fetchUserPaymentDetails(userId, dateDetail);
        open();
    };
    // Chart data
    const chartData = {
        labels: dataUser.users.map(user => user.last_name),
        datasets: [
            {
                label: 'Doanh thu',
                data: dataUser.users.map(user => {
                    const userPaymentsForDate = user.payments.filter(payment => payment.payment_date.startsWith(year));
                    return userPaymentsForDate.reduce((sum, payment) => sum + payment.total_money, 0);
                }),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Số khóa học bán ra',
                data: dataUser.users.map(user => {
                    const userPaymentsForDate = user.payments.filter(payment => payment.payment_date.startsWith(year.replace(/-/g, '')));
                    const numOfCourses = userPaymentsForDate.length;
                    return numOfCourses;
                }),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh thu theo khách hàng',
            },
        },
    };
    return (
        <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                {/* Menu */}
                <Menu/>
                {/* Content */}
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                    {/* Biểu đồ */}
                    <div id="statistic">
                        <h1 className="font-bold py-4 uppercase">Doanh thu trong năm</h1>
                        <div className="mb-4">
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="border p-2 rounded w-40 text-gray-500"
                                placeholder="yyyy"
                                min="1900"
                                max={new Date().getFullYear()}
                            />
                            <button onClick={handleFetchYearRevenue}
                                    className="bg-blue-500 text-white p-2 rounded ml-2">
                                Thống kê
                            </button>
                        </div>
                        <div id="stats" className="flex gap-16">
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
                                            đã
                                            bán</p>
                                        <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                            <span>+{numUserYear}</span>
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
                            <div className="bg-black/60 p-6 rounded-lg w-82">
                                <div className="flex flex-row space-x-4 items-center">
                                    <div id="stats-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-teal-300 text-sm font-medium uppercase leading-4">Doanh
                                            thu</p>
                                        <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                            <span>{formatCurrency(yearRevenue) !== null &&
                                                <div>$ {formatCurrency(yearRevenue)}</div>}</span>
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
                    </div>
                    {/* Bảng */}
                    <div className={'mt-10'}>
                        <h1 className="font-bold pb-4 uppercase">Danh sách khách hàng: {year}</h1>
                        <div className="overflow-x-scroll">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                                <tr>
                                    <th className="text-center py-3 pl-2 pr-4 rounded-l-lg">STT</th>
                                    <th className="text-left py-3 px-3">Khách hàng</th>
                                    <th className="text-left py-3 px-3">Đã mua</th>
                                    <th className="text-left py-3 px-3">Tổng số tiền</th>
                                    <th className="text-left py-3"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {dataUser.users.map((user, index) => {
                                    // Filter payments to match the specified date
                                    const userPaymentsForDate = user.payments.filter(payment => payment.payment_date.startsWith(year.replace(/-/g, '')));

                                    // Count the number of payments for the user (i.e., number of courses)
                                    const numOfCourses = userPaymentsForDate.length;

                                    // Sum the total money for each user where payment_date matches the formatted date
                                    const totalRevenue = userPaymentsForDate.reduce((sum, payment) => sum + payment.total_money, 0);

                                    return (
                                        <tr key={index} className="border-b border-gray-700">
                                            <td className="py-3 text-center">{index + 1}</td>
                                            <td className="py-3 pl-4 font-bold">{user.last_name}</td>
                                            <td className="py-3 pl-4 font-bold">{numOfCourses} khóa học</td>
                                            <td className="py-3 pl-4">{formatCurrency(totalRevenue)}</td>
                                            <td className="py-3">
                                                <Button
                                                    onClick={() => handleViewDetailsClick(user.user_id)}
                                                    className="text-white p-2 bg-mathcha-green font-bold rounded-lg hover:bg-mathcha-green"
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="max-w-[1180px] rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-3xl font-medium text-center text-white">
                                Lịch sử
                            </DialogTitle>
                            <table className="w-full whitespace-nowrap mt-2">
                                <thead
                                    className="text-white/90 bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                                <tr>
                                    <th className="text-center p-3 rounded-l-lg">Khóa học</th>
                                    <th className="text-left p-3">Lớp</th>
                                    <th className="text-left p-3">Mua cho</th>
                                    <th className="text-left p-3">Số tiền</th>
                                    <th className="text-left p-3">Mã GD</th>
                                    <th className="text-center p-3 rounded-r-lg">Thời gian</th>
                                </tr>
                                </thead>
                                <tbody className={'text-white/80'}>
                                {userPaymentDetails.map((data) => (
                                    <tr key={data.course_id} className="border-b border-gray-700">
                                        <td className="py-3 pl-2 font-bold flex items-center">
                                            <img src={data.course.image} alt={'detail course'}
                                                 className={'w-16 rounded-lg h-auto'}/>
                                            <span className="p-3"> {data.course.title}</span>
                                        </td>
                                        <td className="p-3">{data.course.category.category_name}</td>
                                        <td className="p-3">{data.student.username}</td>
                                        <td className="p-3">{formatCurrency(data.total_money)}</td>
                                        <td className="p-3">{data.orderId}</td>
                                        <td className="p-3">{formatTime(data.payment_date)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center text-end gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={close}
                                >
                                    Thoát
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
