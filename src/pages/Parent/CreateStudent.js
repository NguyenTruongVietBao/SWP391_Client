import React, { useState } from 'react';
import Menu from '../../components/Parent/Body/Menu';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { useNavigate } from 'react-router-dom';

export default function CreateStudent() {
    const user = useSelector(selectUser);
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateForm = (data) => {
        const errors = {};
        if (!data.first_name) errors.first_name = 'First Name is required';
        if (!data.last_name) errors.last_name = 'Last Name is required';
        if (!data.username) errors.username = 'Username is required';
        if (!data.password) errors.password = 'Password is required';
        if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        return errors;
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const newUser = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            username: e.target.username.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value,
            address: e.target.address.value
        };

        const errors = validateForm(newUser);

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        try {
            await api.post(`/student/user/${user.user_id}`, newUser);
            toast.success('Tạo tài khoản thành công!');
            navigate('/profile/students');
        } catch (err) {
            console.log(newUser);
            console.error('Error adding user:', err);
            setError('Error adding user data. Please try again later.');
        }
    };

    return (
        <div className="antialiased w-full min-h-screen text-slate-100 relative py-4 bg-gradient-to-r from-mathcha via-white to-mathcha">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <Menu />
                <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
                    <div className="flex items-center justify-center p-12">
                        <div className="mx-auto w-full ">
                            <div className="text-5xl font-bold text-center text-gray-800 mb-10">
                                Tạo tài khoản cho bé
                            </div>
                            <div className='flex justify-between gap-5'>
                                <div>
                                    <span htmlFor="first_name" className="mb-3 block text-base font-medium text-gray-800">
                                        Ảnh đại diện
                                    </span>
                                </div>
                                <div>
                                    <form onSubmit={handleAddUser}>
                                        {/* Tên đăng nhập */}
                                        <div className="mb-5">
                                            <label htmlFor="username" className="mb-3 block text-base font-medium text-gray-800">
                                                Tên đăng nhập
                                            </label>
                                            <input
                                                type="text" required
                                                name="username"
                                                id="username"
                                                placeholder="Tên đăng nhập"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            {formErrors.username && <span className="text-red-500">{formErrors.username}</span>}
                                        </div>
                                        {/* Họ và tên */}
                                        <div className="flex justify-between mb-5 gap-5">
                                            <div>
                                                <label htmlFor="first_name" className="mb-3 block text-base font-medium text-gray-800">
                                                    Họ
                                                </label>
                                                <input
                                                    type="text" required
                                                    name="first_name"
                                                    id="first_name"
                                                    placeholder="Họ"
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {formErrors.first_name && <span className="text-red-500">{formErrors.first_name}</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="last_name" className="mb-3 block text-base font-medium text-gray-800">
                                                    Tên
                                                </label>
                                                <input
                                                    type="text" required
                                                    name="last_name"
                                                    id="last_name"
                                                    placeholder="Tên"
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {formErrors.last_name && <span className="text-red-500">{formErrors.last_name}</span>}
                                            </div>
                                        </div>
                                        {/* Mật khẩu */}
                                        <div className="flex justify-between mb-5 gap-5">
                                            <div>
                                                <label htmlFor="password" className="mb-3 block text-base font-medium text-gray-800">
                                                    Mật khẩu
                                                </label>
                                                <input
                                                    type="password" required
                                                    name="password"
                                                    id="password"
                                                    placeholder="Password"
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {formErrors.password && <span className="text-red-500">{formErrors.password}</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="confirmPassword" className="mb-3 block text-base font-medium text-gray-800">
                                                    Xác nhận mật khẩu
                                                </label>
                                                <input
                                                    type="password" required
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {formErrors.confirmPassword && <span className="text-red-500">{formErrors.confirmPassword}</span>}
                                            </div>
                                        </div>
                                        {/* Địa chỉ  */}
                                        <div className="mb-5">
                                            <label htmlFor="address" className="mb-3 block text-base font-medium text-gray-800">
                                                Địa chỉ
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                placeholder="Địa chỉ"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            {formErrors.address && <span className="text-red-500">{formErrors.address}</span>}
                                        </div>
                                        <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}