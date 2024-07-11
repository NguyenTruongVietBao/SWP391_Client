import React, {useEffect, useState} from 'react'
import Menu from '../../components/Manager/Menu'
import api from "../../config/axios";

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
                        <div className="mt-4">
                            <p className="text-xl font-bold">Số lượng người dùng đã mua: {buyUsersCount}</p>
                            <p className="text-xl font-bold">Tổng thu nhập: {formatCurrency(totalRevenue)}</p>
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
                                            <button onClick={() => handleDialogOpen(user)}>Xem chi tiết</button>
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