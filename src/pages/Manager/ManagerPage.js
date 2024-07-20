import React, {useEffect, useState} from 'react'
import Menu from '../../components/Manager/Menu'
import api from "../../config/axios";
import {Link, useNavigate} from "react-router-dom";

export default function ManagerPage() {
    const [top3Courses, setTop3Courses] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState(null); // State for selected course payments
    const [selectedUser, setSelectedUser] = useState(null); // State for selected course payments
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
    const [isDialogOpenUser, setIsDialogOpenUser] = useState(false); // State for dialog visibility

    const [date, setDate] = useState('');
    const [dailyRevenue, setDailyRevenue] = useState(0);
    const [navigateDay, setNavigateDay] = useState('');
    const [numUser, setNumUser] = useState(0);

    const [month, setMonth] = useState('');
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [navigateMonth, setNavigateMonth] = useState('');
    const [numUserMonth, setNumUserMonth] = useState(0);

    const [year, setYear] = useState('');
    const [yearlyRevenue, setYearlyRevenue] = useState(0);
    const [navigateYear, setNavigateYear] = useState('');
    const [numUserYear, setNumUserYear] = useState(0);

    function formatCurrency(value) {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    }
    const formatDate = (navigateDay) => {
        const year = navigateDay.substring(0, 4);
        const month = navigateDay.substring(4, 6);
        const day = navigateDay.substring(6, 8);
        return `${year}-${month}-${day}`;   //   yyyy-MM-dd
    };
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        const currentMonth = new Date().toISOString().slice(0, 7);
        const currentYear = new Date().getFullYear().toString();
        setDate(currentDate);
        setMonth(currentMonth);
        setYear(currentYear);
        setNavigateDay(currentDate.replace(/-/g, ''));
        setNavigateMonth(currentMonth.replace(/-/g, ''));
        setNavigateYear(currentYear.replace(/-/g, ''));

        const fetchDailyRevenue = async (selectedDate) => {
            const formattedDate = selectedDate.replace(/-/g, ''); // yyyyMMdd
            try {
                const response = await api.get(`/chart/revenue/daily/${formattedDate}`);
                setDailyRevenue(response.data.data.totalRevenue);
                const responseNum = response.data.data.revenue.length;
                setNumUser(responseNum);
            } catch (error) {
                console.error('Error fetching daily revenue:', error);
            }
        };

        const fetchMonthlyRevenue = async (selectedMonth) => {
            const formattedMonth = selectedMonth.replace(/-/g, ''); // yyyyMM
            try {
                const response = await api.get(`/chart/revenue/monthly/${formattedMonth}`);
                setMonthlyRevenue(response.data.data.totalRevenue);
                const responseNum = response.data.data.revenue.length;
                setNumUserMonth(responseNum);
            } catch (error) {
                console.error('Error fetching monthly revenue:', error);
            }
        };

        const fetchYearlyRevenue = async (selectedYear) => {
            try {
                const response = await api.get(`/chart/revenue/yearly/${selectedYear}`);
                setYearlyRevenue(response.data.data.totalRevenue);
                const responseNum = response.data.data.revenue.length;
                setNumUserYear(responseNum);
            } catch (error) {
                console.error('Error fetching yearly revenue:', error);
            }
        };

        fetchDailyRevenue(currentDate);
        fetchMonthlyRevenue(currentMonth);
        fetchYearlyRevenue(currentYear);
    }, []);
    console.log('navigate date:',navigateDay, 'month',navigateMonth, 'year',navigateYear);

    const handleFetchDailyRevenue = async () => {
        const formattedDate = date.replace(/-/g, ''); // yyyyMMdd
        try {
            const response = await api.get(`/chart/revenue/daily/${formattedDate}`);
            setDailyRevenue(response.data.data.totalRevenue);
            const responseNum = response.data.data.revenue.length;
            setNumUser(responseNum);
            setNavigateDay(formattedDate);
            console.log(navigateDay)
        } catch (error) {
            console.error('Error fetching daily revenue:', error);
        }
    };
    const handleDetailDay = async () => {
        try {
            navigate(`/manager/day`, {state: {navigateDay}});
        } catch (error) {
            console.error('Error fetching daily revenue:', error);
        }
    };

    const handleFetchMonthlyRevenue = async () => {
        const formattedMonth = month.replace(/-/g, ''); // yyyyMM
        try {
            const response = await api.get(`chart/revenue/monthly/${formattedMonth}`);
            setMonthlyRevenue(response.data.data.totalRevenue);
            const responseNum = response.data.data.revenue.length;
            setNumUserMonth(responseNum);
            setNavigateMonth(formattedMonth);
            console.log(navigateMonth)
        } catch (error) {
            console.error('Error fetching monthly revenue:', error);
        }
    };
    const handleDetailMonth = async () => {
        try {
            navigate(`/manager/month`, {state: {navigateMonth}});
        } catch (error) {
            console.error('Error fetching daily revenue:', error);
        }
    };

    const handleFetchYearlyRevenue = async () => {
        try {
            const response = await api.get(`chart/revenue/yearly/${year}`);
            setYearlyRevenue(response.data.data.totalRevenue);
            setNumUserYear(response.data.data.revenue.length);
            setNavigateYear(year);
        } catch (error) {
            console.error('Error fetching yearly revenue:', error);
        }
    };
    const handleDetailYear = async () => {
        try {
            navigate(`/manager/year`, {state: {navigateYear}});
        } catch (error) {
            console.error('Error fetching daily revenue:', error);
        }
    };

    //get all course
    useEffect(() => {
        const fetchTop3CoursesWithRevenue = async () => {
            try {
                // Step 1: Fetch all courses
                const coursesResponse = await api.get('course/get');
                const courses = coursesResponse.data.data;
                // Step 2: Fetch revenue for each course
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
                const coursesWithRevenue = await Promise.all(coursesWithRevenueAndPayments);
                // Step 3: Sort courses by revenue in descending order
                const sortedCourses = coursesWithRevenue.sort((a, b) => b.revenue - a.revenue);
                // Step 4: Get the top 3 courses
                const top3Courses = sortedCourses.slice(0, 3);
                // Step 5: Calculate the total revenue of the top 3 courses
                const totalRevenue = top3Courses.reduce((acc, course) => acc + course.revenue, 0);
                setTop3Courses(top3Courses);
                setTotalRevenue(totalRevenue);


                // Step 1: Fetch all users
                const usersResponse = await api.get('user/get/all');
                const users = usersResponse.data.data;
                const allUsers = usersResponse.data.data;
                // Step 2: Filter users by role 'PARENT'
                const parentUsers = allUsers.filter(user => user.role === 'PARENT');
                // Step 3: Fetch total revenue for each user
                const usersWithRevenueAndPayments = await Promise.all(
                    parentUsers.map(async (user) => {
                        const [revenueResponse, paymentResponse] = await Promise.all([
                            api.get(`chart/revenue/user/${user.user_id}`),
                            api.get(`/payment/user/${user.user_id}`)
                        ]);
                        console.log('payments',paymentResponse.data.data)
                        return {
                            ...user,
                            revenue: revenueResponse.data.data,
                            payments: paymentResponse.data.data,
                            paymentCount: paymentResponse.data.data.length,
                        };
                    })
                );
                const usersWithRevenue = await Promise.all(usersWithRevenueAndPayments);
                // Step 4: Sort users by revenue in descending order
                const sortedUsers = usersWithRevenue.sort((a, b) => b.revenue - a.revenue);
                setUsers(sortedUsers);
            } catch (error) {
                console.error('Error fetching courses or revenue:', error);
            }
        };

        fetchTop3CoursesWithRevenue();
    }, []);

    //get all user
    const top3Users = users.slice(0, 3);

    const handleDialogOpen = (course) => {
        setSelectedCourse(course);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedCourse(null);
    };
    const handleDialogOpenUser = (user) => {
        setSelectedUser(user);
        setIsDialogOpenUser(true);
    };

    const handleDialogCloseUser = () => {
        setIsDialogOpenUser(false);
        setSelectedUser(null);
    };
  return (
    <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
            {/* Menu */}
            <Menu/>
            {/* Content */}
            <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                {/* Day */}
                <div id="statistic">
                    <h1 className="font-bold py-4 uppercase">Thống kê 24h qua</h1>
                    <div className="mb-4">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border p-2 rounded text-gray-500"
                        />
                        <button onClick={handleFetchDailyRevenue} className="bg-blue-500 text-white p-2 rounded ml-2">
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
                                    <p className="text-indigo-300 text-sm font-medium uppercase leading-4">Khóa học đã
                                        bán</p>
                                    <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                        <span>+{numUser}</span>
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
                        <div className="bg-black/60 p-6 rounded-lg w-64">
                            <div className="flex flex-row space-x-4 items-center">
                                <div id="stats-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-teal-300 text-sm font-medium uppercase w-full leading-4">Doanh
                                        thu</p>
                                    <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                        <span>{dailyRevenue !== null && <div>$ {dailyRevenue}</div>}</span>
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
                        <button onClick={handleDetailDay} className="bg-black/60 p-2 rounded-lg  w-32 h-12 flex items-center justify-center">
                            <div className="flex items-center justify-center space-x-2">
                                <div id="stats-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-mathcha-orange font-medium text-xl">
                                        Chi tiết
                                    </span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                {/* Top 3 */}
                <div id="manage-money" className="py-12">
                    {/*course*/}
                    <div className={'flex items-center justify-between mb-2'}>
                        <h1 className="font-bold uppercase">Top 3 khóa học nổi bật</h1>
                        <Link to={'/manager/courses'}
                              className="bg-black/60 p-2 rounded-lg  w-32 h-10 flex items-center justify-center">
                            <div className="flex items-center justify-center space-x-2">
                                <div id="stats-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-mathcha-orange font-medium text-base">
                                        Xem tất cả
                                    </span>
                                </div>
                            </div>
                        </Link>
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
                                        <span><button onClick={() => handleDialogOpen(course)}>Chi tiết</button></span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/*user*/}
                    <div className={'flex items-center justify-between mt-10 mb-2'}>
                        <h1 className="font-bold uppercase">Khách hàng thân thiết</h1>
                        <Link to={'/manager/users'}
                              className="bg-black/60 p-2 rounded-lg  w-32 h-10 flex items-center justify-center">
                            <div className="flex items-center justify-center space-x-2">
                                <div id="stats-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-mathcha-orange font-medium text-base">
                                        Xem tất cả
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        {(top3Users).map((user) => (
                            <div className="bg-black/60 to-white/5 rounded-lg">
                                <div key={user.user_id} className="flex flex-row items-center">
                                    <div className="text-3xl p-4">💰</div>
                                    <div className="p-2">
                                        <p className="text-xl font-bold">{user.revenue === null ? "0 VNĐ" : `${formatCurrency(user.revenue)}`}</p>
                                        <p className="text-gray-500 font-medium">{user.first_name} {user.last_name}</p>
                                    </div>
                                </div>
                                <div className="border-t border-white/5 p-4">
                                    <span className="inline-flex space-x-2 items-center text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                                        </svg>
                                        <span><button onClick={() => handleDialogOpenUser(user)}>Chi tiết</button></span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Month  */}
                <div className={'grid grid-cols-1 justify-start gap-20 mb-12'}>
                    {/*Doanh thu*/}
                    <div id="statistic">
                        <h1 className="font-bold py-4 uppercase">Doanh thu trong tháng</h1>
                        <div className="mb-4">
                            <input
                                type="month"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="border p-2 rounded w-40 text-gray-500"
                            />
                            <button onClick={handleFetchMonthlyRevenue}
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
                                        <p className="text-indigo-300 text-sm font-medium uppercase leading-4">Khóa học đã bán</p>
                                        <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                            <span>+{numUserMonth}</span>
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
                            <div className="bg-black/60 p-6 rounded-lg w-64">
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
                                            <span>{monthlyRevenue !== null && <div>$ {monthlyRevenue}</div>}</span>
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
                            <button onClick={handleDetailMonth} className="bg-black/60 p-2 rounded-lg w-32 h-12 flex items-center justify-center">
                                <div className="flex items-center justify-center space-x-2">
                                    <div id="stats-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-mathcha-orange font-medium text-xl">
                                            Chi tiết
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Year */}
                <div className={'grid grid-cols-1 justify-start gap-20 mb-12'}>
                    {/* Số lượng đã bán */}
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
                            <button onClick={handleFetchYearlyRevenue}
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
                            <div className="bg-black/60 p-6 rounded-lg w-64">
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
                                            <span>{yearlyRevenue !== null && <div>$ {yearlyRevenue}</div>}</span>
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
                            <button onClick={handleDetailYear} className="bg-black/60 p-2 rounded-lg  w-32 h-12 flex items-center justify-center">
                                <div className="flex items-center justify-center space-x-2">
                                    <div id="stats-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-mathcha-orange font-medium text-xl">
                                            Chi tiết
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Dialog for payment details */}
        {isDialogOpen && selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-black rounded-lg p-4 max-w-[750px] w-full">
                    <h2 className="text-xl font-bold mb-4">Chi tiết thanh toán</h2>
                    <table className="w-full whitespace-nowrap mt-2">
                        <thead
                            className="text-white/90 bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                        <tr>
                            {/*<th className="text-left p-3 rounded-l-lg">Khóa học</th>*/}
                            <th className="text-left p-3 rounded-l-lg">Mua bởi</th>
                            {/*<th className="text-left p-3 ">Mua bởi</th>*/}
                            <th className="text-left p-3">Mua cho</th>
                            <th className="text-left p-3">Tổng tiền</th>
                            <th className="text-left p-3">Ngày thanh toán</th>
                            <th className="text-left p-3">Mã GD</th>
                            <th className="text-center p-3 rounded-r-lg">Phương thức</th>
                        </tr>
                        </thead>
                        <tbody className={'text-white/80'}>
                        {selectedCourse.payments.map((payment) => (
                            <tr className="border-b border-gray-700">
                                {/*<td className="p-3 font-bold">*/}
                                {/*    <div className={'flex '}>*/}
                                {/*        <img src={payment.course.image} alt={'detail course'}*/}
                                {/*             className={'w-16 rounded-lg h-auto'}/>*/}
                                {/*        <span className="p-3"> {payment.course.title}</span>*/}
                                {/*    </div>*/}
                                {/*</td>*/}
                                <td className="py-3 font-bold flex items-center">
                                    <span className="p-3"> {payment.user.last_name} {payment.user.first_name}</span>
                                </td>
                                <td className="p-3">{payment.user.user_id}</td>
                                {/*<td className="p-3">{payment.course.category.category_id}</td>*/}
                                <td className="p-3">{payment.total_money}</td>
                                <td className="p-3">{formatDate(payment.payment_date)}</td>
                                <td className="p-3">{payment.orderId}</td>
                                <td className="p-3 text-center">{payment.payment_method}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <button onClick={handleDialogClose} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Đóng
                    </button>
                </div>
            </div>
        )}
        {isDialogOpenUser && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg p-4 max-w-[900px] w-full">
                    <h2 className="text-xl font-bold mb-4">Chi tiết thanh toán</h2>
                    <table className="w-full whitespace-nowrap mt-2">
                        <thead
                            className="text-white/90 bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                        <tr>
                            <th className="text-left p-3 rounded-r-lg">Mua cho</th>
                            <th className="text-left p-3">Khóa học</th>
                            <th className="text-left p-3">Lớp</th>
                            <th className="text-left p-3">Tổng tiền</th>
                            <th className="text-left p-3">Ngày thanh toán</th>
                            <th className="text-left p-3">Mã GD</th>
                            <th className="text-center p-3 rounded-r-lg">Phương thức</th>
                        </tr>
                        </thead>
                        <tbody className={'text-white/80'}>
                        {selectedUser.payments.map((payment) => (
                            <tr className="border-b border-gray-700">
                                <td className="p-3 font-bold">
                                    {payment.student.first_name} {payment.student.last_name}
                                </td>
                                <td className="p-3 font-bold">
                                    <div className={'flex '}>
                                        <img src={payment.course.image} alt={'detail course'}
                                             className={'w-16 rounded-lg h-auto'}/>
                                        <span className="p-3"> {payment.course.title}</span>
                                    </div>
                                </td>
                                <td className="p-3">{payment.course.category.categoryName}</td>
                                <td className="p-3">{formatCurrency(payment.total_money)}</td>
                                <td className="p-3">{formatDate(payment.payment_date)}</td>
                                <td className="p-3">{payment.orderId}</td>
                                <td className="p-3 text-center">{payment.payment_method}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <button onClick={handleDialogCloseUser}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Đóng
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}
