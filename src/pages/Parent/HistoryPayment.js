import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Parent/Body/Menu';
import { Button } from '@headlessui/react';
import { selectUser } from '../../redux/features/counterSlice';
import { useSelector } from 'react-redux';
import { getStudentsByParentId, deleteStudentById } from '../../services/UserService/UserService'; // Assuming you have a delete function in UserService
import api from '../../config/axios';
import { toast } from 'react-toastify';


export default function HistoryPayment() {
    const user = useSelector(selectUser);
    const [buyCourse, setBuyCourse] = useState([]);

    useEffect(() => {
        api.get(`/payment/user/${user.user_id}`)
          .then((res)=>{
                setBuyCourse(res.data.data)
          })
          .catch(error => console.error('Error fetching courses:', error));
      }, [user.user_id]);

    return (
        <div className="antialiased bg-gradient-to-r from-mathcha via-white to-mathcha w-full min-h-screen text-black relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                {/* Menu */}
                <Menu />
                {/* Content */}
                <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
                    {/* Manage Course */}
                    <div id="manage-course">
                        <div className='flex items-center justify-between'>
                            <h1 className="font-bold py-4 uppercase">Danh sách học sinh</h1>
                        </div>
                        <div className="overflow-x-scroll">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-gradient-to-br from-black/80 via-black/60 to-black/70 text-white/90">
                                    <tr>
                                        <th className="text-left py-3 px-2 rounded-l-lg">Mua cho bé</th>
                                        <th className="text-center py-3 px-2">Khóa học</th>
                                        <th className="text-center py-3 px-2">Số tiền</th>
                                        <th className="text-center py-3 px-2">Thời gian</th>
                                        <th className="text-center py-3 px-2">Phương thức</th>
                                        <th className="text-center py-3 px-2 rounded-r-lg"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {buyCourse.map((data, index) => (
                                        <tr key={index} className="border-b border-gray-700">
                                            <td className="py-3 px-2 text-left font-bold">{data.payment_id}</td>
                                            <td className="py-3 px-2 text-center">{data.payment_method}</td>
                                            <td className="py-3 px-2 text-center">{data.total_money} VNĐ</td>
                                            <td className="py-3 px-2 text-center">{data.payment_date}</td>
                                            <td className="py-3 px-2 text-center">{data.payment_method}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    );
}
