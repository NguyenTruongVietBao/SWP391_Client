import React, {useEffect, useState} from 'react'
import Menu from '../../components/Manager/Menu'
import api from "../../config/axios";
import {listCourses} from "../../services/CourseService/CourseService";

export default function ManagerPage() {
    const [courses, setCourses] = useState([]);
    const [top3Courses, setTop3Courses] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [numUser, setNumUser] = useState(0);
    const [numUserMonth, setNumUserMonth] = useState(0);
    const [numUserYear, setNumUserYear] = useState(0);
    const [users, setUsers] = useState([]);

    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [dailyRevenue, setDailyRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [yearlyRevenue, setYearlyRevenue] = useState(0);
    const handleFetchDailyRevenue = async () => {
        const formattedDate = date.replace(/-/g, ''); // yyyyMMdd
        try {
            const response = await api.get(`/chart/revenue/daily/${formattedDate}`);
            setDailyRevenue(response.data.data.totalRevenue);
            const responseNum = response.data.data.revenue.length;
            setNumUser(responseNum);
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
        } catch (error) {
            console.error('Error fetching monthly revenue:', error);
        }
    };
    const handleFetchYearlyRevenue = async () => {
        const formattedYear = year; // yyyy
        try {
            const response = await api.get(`chart/revenue/yearly/${formattedYear}`);
            setYearlyRevenue(response.data.data.totalRevenue);
            const responseNum = response.data.data.revenue.length;
            setNumUserYear(responseNum);
        } catch (error) {
            console.error('Error fetching yearly revenue:', error);
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
                const revenuePromises = courses.map(async (course) => {
                    const revenueResponse = await api.get(`chart/revenue/course/${course.course_id}`);
                    return {
                        ...course,
                        revenue: revenueResponse.data.data,
                    };
                });

                const coursesWithRevenue = await Promise.all(revenuePromises);

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
                const revenuePromises2 = parentUsers.map(async (user) => {
                    const revenueResponse2 = await api.get(`chart/revenue/user/${user.user_id}`);
                    return {
                        ...user,
                        revenue: revenueResponse2.data.data,
                    };
                });

                const usersWithRevenue = await Promise.all(revenuePromises2);

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
    console.log(top3Users)
  return (
    <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
            {/* Menu */}
            <Menu/>
            {/* Content */}
            <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                {/* Day */}
                <div id="statistic">
                    <h1 className="font-bold py-4 uppercase">Thống kê trong ngày</h1>
                    <div className="mb-4">
                        <label className="block mb-2">Ngày:</label>
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
                        <button className="bg-black/60 p-2 rounded-lg w-40 h-14 flex items-center justify-center">
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
                {/* Top 3 */}
                <div id="manage-money" className="py-12">
                    {/*course*/}
                    <h1 className="font-bold uppercase mb-2">Top 3 khóa học nổi bật</h1>
                    <div id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        {top3Courses.map((course) => (
                            <div className="bg-black/60 to-white/5 rounded-lg" key={course.course_id}>
                                <div className="flex flex-row items-center">
                                    <div className="text-3xl p-4">💰</div>
                                    <div className="p-2">
                                        <p className="text-xl font-bold">${course.revenue}</p>
                                        <p className="text-gray-500 font-medium">{course.title}</p>
                                    </div>
                                </div>
                                <div className="border-t border-white/5 p-4">
                                <a href='/' className="inline-flex space-x-2 items-center text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                                        </svg>
                                        <span>Chi tiết</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/*user*/}
                    <h1 className="font-bold uppercase mt-7 mb-2">Bạn hàng</h1>
                    <div id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        {(top3Users).map((user) => (
                            <div className="bg-black/60 to-white/5 rounded-lg">
                                <div key={user.user_id} className="flex flex-row items-center">
                                    <div className="text-3xl p-4">💰</div>
                                    <div className="p-2">
                                        <p className="text-xl font-bold">${user.revenue}</p>
                                        <p className="text-gray-500 font-medium">{user.username}</p>
                                    </div>
                                </div>
                                <div className="border-t border-white/5 p-4">
                                    <a href='/' className="inline-flex space-x-2 items-center text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                                        </svg>
                                        <span>Chi tiết</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Month  */}
                <div className={'grid grid-cols-1 justify-start gap-20 mb-12'}>
                    {/*Doanh thu*/}
                    <div id="statistic">
                        <h1 className="font-bold py-4 uppercase">Doanh thu tháng này</h1>
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
                                        <p className="text-indigo-300 text-sm font-medium uppercase leading-4">Khóa học
                                            đã
                                            bán</p>
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
                            <button className="bg-black/60 p-2 rounded-lg w-40 h-14 flex items-center justify-center">
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
                            <label className="block mb-2">Năm:</label>
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
                            <button className="bg-black/60 p-2 rounded-lg w-40 h-14 flex items-center justify-center">
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
    </div>
  )
}
