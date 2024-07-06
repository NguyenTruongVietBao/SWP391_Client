import React, {useEffect, useState} from 'react';
import Menu from '../../components/Parent/Body/Menu';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { useNavigate } from 'react-router-dom';
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {imageDb} from "../../config/firebase";
import { v4 } from "uuid";

export default function CreateStudent() {
    const user = useSelector(selectUser);
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    const handleClick = () => {
        if (img !== null) {
            const imgRef = ref(imageDb, `avatarImg/${v4()}`);
            uploadBytes(imgRef, img).then(value => {
                getDownloadURL(value.ref).then(url => {
                    setImgUrl(url);
                });
            });
        }
    };
    useEffect(() => {
        listAll(ref(imageDb, "files")).then(imgs => {
            console.log(imgs);
            imgs.items.forEach(val => {
                getDownloadURL(val).then(url => {
                    setImgUrl(url);
                });
            });
        });
    }, []);

    console.log(imgUrl);
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
            address: e.target.address.value,
            image: imgUrl
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
                                    <div
                                        className="flex flex-col items-center space-y-4 p-4 border border-gray-200 rounded-lg shadow-md max-w-md mx-auto bg-white">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tải ảnh đại diện
                                        </label>
                                        <div className="flex w-full items-center justify-center bg-grey-lighter">
                                            <label
                                                className="w-64 flex flex-col items-center px-2 py-3 bg-white text-gray-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-black">
                                                <svg className="w-8 h-8" fill="currentColor"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20">
                                                    <path
                                                        d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                                                </svg>
                                                <span className="mt-2 text-base leading-normal">Chọn tệp</span>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setImg(e.target.files[0])}
                                                    className="mt-1 w-full text-sm text-gray-500
                                                     file:rounded-full file:border-0
                                                     file:text-sm
                                                     file:bg-white file:text-white
                                                     file:flex"
                                                />
                                            </label>
                                        </div>
                                        <button
                                            onClick={handleClick}
                                            className="mt-4 px-4 py-2 bg-mathcha-green text-white rounded-lg hover:bg-black transition duration-200"
                                        >
                                            Chọn ảnh này
                                        </button>
                                        {imgUrl && (
                                            <div className="mt-4">
                                                <img
                                                    src={imgUrl}
                                                    alt="Selected"
                                                    className="rounded-lg shadow-md"
                                                    style={{height: '200px', width: '200px', objectFit: 'cover'}}
                                                />
                                            </div>
                                        )}

                                    </div>

                                </div>
                                <div>

                                    <form onSubmit={handleAddUser}>
                                        {/* Tên đăng nhập */}
                                        <div className="mb-5">
                                            <label htmlFor="username"
                                                   className="mb-3 block text-base font-medium text-gray-800">
                                                Tên đăng nhập
                                            </label>
                                            <input
                                                type="text" required
                                                name="username"
                                                id="username"
                                                placeholder="Tên đăng nhập"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            {formErrors.username &&
                                                <span className="text-red-500">{formErrors.username}</span>}
                                        </div>
                                        {/* Họ và tên */}
                                        <div className="flex justify-between mb-5 gap-5">
                                            <div>
                                            <label htmlFor="first_name"
                                                       className="mb-3 block text-base font-medium text-gray-800">
                                                    Họ
                                                </label>
                                                <input
                                                    type="text" required
                                                    name="first_name"
                                                    id="first_name"
                                                    placeholder="Họ"
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {formErrors.first_name &&
                                                    <span className="text-red-500">{formErrors.first_name}</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="last_name"
                                                       className="mb-3 block text-base font-medium text-gray-800">
                                                    Tên
                                                </label>
                                                <input
                                                    type="text" required
                                                    name="last_name"
                                                    id="last_name"
                                                    placeholder="Tên"
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {formErrors.last_name &&
                                                    <span className="text-red-500">{formErrors.last_name}</span>}
                                            </div>
                                        </div>
                                        {/* Mật khẩu */}
                                        <div className="flex justify-between mb-5 gap-5">
                                            <div>
                                                <label htmlFor="password"
                                                       className="mb-3 block text-base font-medium text-gray-800">
                                                    Mật khẩu
                                                </label>
                                                <input
                                                    type="password" required
                                                    name="password"
                                                    id="password"
                                                    placeholder="Password"
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {formErrors.password &&
                                                    <span className="text-red-500">{formErrors.password}</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="confirmPassword"
                                                       className="mb-3 block text-base font-medium text-gray-800">
                                                    Xác nhận mật khẩu
                                                </label>
                                                <input
                                                    type="password" required
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {formErrors.confirmPassword &&
                                                    <span className="text-red-500">{formErrors.confirmPassword}</span>}
                                            </div>
                                        </div>
                                        {/* Địa chỉ  */}
                                        <div className="mb-5">
                                            <label htmlFor="address"
                                                   className="mb-3 block text-base font-medium text-gray-800">
                                                Địa chỉ
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                placeholder="Địa chỉ"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            {formErrors.address &&
                                                <span className="text-red-500">{formErrors.address}</span>}
                                        </div>
                                        <button
                                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
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