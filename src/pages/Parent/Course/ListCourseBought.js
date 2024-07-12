import React, { useEffect, useState } from 'react'
import { selectUser } from '../../../redux/features/counterSlice';
import { useSelector } from 'react-redux';
import api from '../../../config/axios';

export default function ListCourseBought() {
    const user = useSelector(selectUser);
    const [courses, setCourses] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get(`/payment/user/${user.user_id}`);
                const payments = response.data.data;
                setPayments(payments);
                const extractedCourses = payments.map(payment => payment.course);
                setCourses(extractedCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, [user.user_id]);

    const formatDate = (dateString) => {
        if (dateString.length !== 14) {
            return 'Invalid date';
        }
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${day}/${month}/${year}`;
    };

    console.log('Khóa học đã mua:',courses)
    return (
        <div className="text-[#000] items-center w-full overflow-x-hidden">
            <div
                className="bg-gradient-to-r from-mathcha via-white to-mathcha flex flex-col gap-[100px] justify-center items-center w-full h-full min-h-screen">
                <div className="max-w-[1180px] flex flex-col gap-[50px] lg:gap-[123px] items-center w-full">
                    <div className="justify-between items-center text-center">
                        <div className="text-[30px] md:text-5xl font-bold leading-[58px] tracking-[0.03em] mb-3"
                             style={{fontFamily: 'monospace, sans-serif'}}>
                            Danh sách khóa học đã mua
                        </div>
                    </div>
                    <div
                        className="flex flex-wrap justify-between items-center gap-[30px] md:gap-[50px] lg:gap-[83px] md:px-0 px-[4%] w-full mb-10">
                        {payments.map((payment, index) => (
                            <div
                                key={index}
                                className="flex hover:scale-105 duration-1000 cursor-pointer justify-center items-center md:max-w-[300px] lg:max-w-[338px] w-full lg:py-[3%] max-h-fit xl:h-[450px] border-4 border-mathcha-orange rounded-[28px]"
                            >
                                <div className="px-[4%] w-full flex flex-col gap-4">
                                    <img
                                        src={payment.course.image}
                                        alt="img not found"
                                        className="rounded-3xl"
                                        width="306"
                                        height="264"
                                        style={{objectFit: 'cover', width: '306px', height: '264px'}}
                                    />
                                    <div>
                                        <div className={'flex justify-between items-center'}>
                                            <div
                                                className="from-neutral-950 text-[32px] text-cyan-600 font-bold leading-[34px] mb-3">
                                                {payment.course.title}
                                            </div>
                                            <div
                                                className="from-neutral-950 text-lg font-medium leading-[34px] bg-blue-200 rounded-xl px-1">
                                                {payment.course.category.category_name}
                                            </div>
                                        </div>
                                        <div className={'text-base my-2'}>
                                            <div className={'flex justify-between'}>
                                                <div className="text-gray-700 ">
                                                    <strong>Mã GD:</strong> {payment.orderId}
                                                </div>
                                                <div className="text-gray-700">
                                                    <strong>Thời gian:</strong> {formatDate(payment.payment_date)}
                                                </div>

                                            </div>
                                            <div className="text-gray-700 my-2">
                                                <strong>Số tiền:</strong> {payment.total_money} VNĐ
                                            </div>
                                            <div className="text-gray-700 ">
                                            <strong>Phương thức:</strong> {payment.payment_method}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
