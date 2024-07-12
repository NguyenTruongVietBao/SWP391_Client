import React, {useEffect, useState} from 'react'
import Menu from '../../components/Manager/Menu'
import api from "../../config/axios";
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
    Title,
    BarElement,
    Tooltip,
    Legend
);
export default function ListUser(props) {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Set users per page to 5
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [buyUsersCount, setBuyUsersCount] = useState(0); // New state variable
    const [selectedUser, setSelectedUser] = useState(null); // State for selected user payments
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

    function formatCurrency(value) {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    }

    useEffect(() => {
        const fetchUsersWithRevenue = async () => {
            try {
                // Step 1: Fetch all users
                const usersResponse = await api.get('user/get/all');
                const users = usersResponse.data.data;

                // Step 2: Filter users by role 'PARENT'
                const parentUsers = users.filter(user => user.role === 'PARENT');

                // Step 3: Fetch total revenue for each user
                const usersWithRevenueAndPayments = await Promise.all(
                    parentUsers.map(async (user) => {
                        const [revenueResponse, paymentResponse] = await Promise.all([
                            api.get(`chart/revenue/user/${user.user_id}`),
                            api.get(`/payment/user/${user.user_id}`)
                        ]);
                        return {
                            ...user,
                            revenue: revenueResponse.data.data,
                            payments: paymentResponse.data.data,
                            paymentCount: paymentResponse.data.data.length,
                        };
                    })
                );

                const sortedUsers = usersWithRevenueAndPayments.sort((a, b) => b.revenue - a.revenue);
                setUsers(sortedUsers);

                // Calculate total revenue and buy users count
                const totalRevenue = sortedUsers.reduce((acc, user) => acc + user.revenue, 0);
                const buyUsersCount = sortedUsers.length;

                setTotalRevenue(totalRevenue);
                setBuyUsersCount(buyUsersCount);
            } catch (error) {
                console.error('Error fetching users or revenue:', error);
            }
        };

        fetchUsersWithRevenue();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDialogOpen = (user) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedUser(null);
    };

    // chartData
    const chartData = {
        labels: users.filter(course => course.revenue > 0).map(course => course.last_name ),
        datasets: [
            {
                label: 'Đã chi',
                data: users.filter(course => course.revenue > 0).map(course => course.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
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
                text: 'Doanh thu các khóa học',
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
                            <h1 className="font-bold uppercase">Top 3 người dùng có doanh thu cao nhất</h1>
                        </div>
                        {/* Top 3 */}
                        <div id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {users.slice(0, 3).map((user) => (
                                <div className="bg-black/60 to-white/5 rounded-lg" key={user.user_id}>
                                    <div className="flex flex-row items-center">
                                        <div className="text-3xl p-4">💰</div>
                                        <div className="p-2">
                                            <p className="text-xl font-bold">{user.revenue === null ? "0 VNĐ" : `${formatCurrency(user.revenue)}`}</p>
                                            <p className="text-gray-500 font-medium">{user.first_name} {user.last_name}</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-white/5 p-4">
                                        <span className="inline-flex space-x-2 items-center text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                            </svg>
                                            <span><button onClick={() => handleDialogOpen(user)}>Chi tiết</button></span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Total */}
                        <div id="stats" className="flex gap-16 mt-10">
                            <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                                <div className="flex flex-row space-x-4 items-center">
                                    <div id="stats-1">

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
                                        </svg>

                                    </div>
                                    <div className={'px-2'}>
                                        <p className="text-indigo-300 text-sm font-medium uppercase leading-4">Tổng số
                                            khách hàng</p>
                                        <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                            <span>+{buyUsersCount}</span>
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
                                        <p className="text-teal-300 text-sm font-medium uppercase w-full leading-4">Số tiền đã chi</p>
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
                        {/* Table */}
                        <div className="overflow-x-scroll mt-10">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                                <tr>
                                    <th className="text-center py-3 px-2 pr-5 rounded-l-lg">STT</th>
                                    <th className="text-left py-3 px-2">Họ và tên</th>
                                    <th className="text-left py-3 px-2">Đã mua</th>
                                    <th className="text-left py-3 px-2">Tổng tiền</th>
                                    <th className="text-center py-3 px-2 rounded-r-lg">Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentUsers.map((user, index) => (
                                    <tr key={user.user_id} className="border-b border-gray-700 my-2">
                                        <td className="py-3 px-2 pr-5 font-bold text-center">
                                            <span>{index + 1 + (currentPage - 1) * usersPerPage}</span>
                                        </td>
                                        <td className="py-3 pl-2 font-bold">
                                            <span>{user.last_name} {user.first_name}</span>
                                        </td>
                                        <td className="py-3 px-2">{user.paymentCount} khóa học</td>
                                        <td className="py-3 px-2">{user.revenue === null ? "0 VNĐ" : `${formatCurrency(user.revenue)}`}</td>
                                        <td className="py-3 px-2 text-center">
                                            <button onClick={() => handleDialogOpen(user)}
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
                        {/* Pagination */}
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
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* Dialog for payment details */}
            {isDialogOpen && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Chi tiết thanh toán</h2>
                        {selectedUser.payments.map((payment) => (
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