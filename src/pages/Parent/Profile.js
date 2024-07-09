import React, {useEffect, useState} from 'react'
import { selectUser } from '../../redux/features/counterSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from '../../components/Parent/Body/Menu';
import api from '../../config/axios';
import { toast } from 'react-toastify';
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {imageDb} from "../../config/firebase";
import { v4 } from "uuid";

export default function Profile() {
    const user = useSelector(selectUser);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
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
    // validate
    const validateForm = (data) => {
        const errors = {};
        if (!data.first_name) errors.first_name = 'First Name is required';
        if (!data.last_name) errors.last_name = 'Last Name is required';
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!data.phone) {
            errors.phone = 'Phone is required';
        } else if (!/^09\d{8}$/.test(data.phone)) {
            errors.phone = 'Phone number is invalid. Format: 0912312312';
        }
        if (!data.address) errors.address = 'Address is required';
        return errors;
    };
    // update
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const updatedUser = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            username: user.username,
            role: user.role,
            image: imgUrl
        };
        console.log(updatedUser)
        const errors = validateForm(updatedUser);
        console.log(updatedUser)
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        try {
            const response = await api.put(`/user/${user.user_id}`, updatedUser);
            console.log('User updated:', response.data); // Check response from API
            toast.success('Cập nhật thành công, đăng nhập lại để xem kết quả');
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Error updating user data. Please try again later.');
        }
        console.log(updatedUser, user.user_id);
    };
    //loading
    if (!user) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }
  return (
    <div className="antialiased w-full min-h-screen text-slate-100 relative py-4 bg-gradient-to-r from-mathcha via-white to-mathcha">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
            <Menu />
            <div id="content" className="bg-white/10 col-span-9 rounded-lg">
                <div className="flex items-center justify-between" >
                    <div className="mx-auto w-full">
                        <div className="text-6xl font-bold text-center mb-10 text-black">
                            Cập nhật: {user.last_name}
                        </div>
                        <div className={'flex justify-center gap-16'}>
                            <div className="flex flex-col items-center space-y-4 p-4 border border-gray-200 rounded-lg shadow-md max-w-md mx-auto bg-white">
                                <label className="block text-sm font-medium text-gray-700">
                                   Cập nhật đại diện
                                </label>
                                <div className="flex w-full items-center justify-center bg-grey-lighter">
                                    <label
                                        className="w-64 flex flex-col items-center px-2 py-3 bg-white text-gray-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-black">
                                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
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

                            <form onSubmit={handleUpdateUser}>
                                <div className="flex justify-between mb-5 gap-5">
                                    <div>
                                        <label htmlFor="first_name"
                                               className=" block text-base font-medium text-gray-800">
                                            Họ
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            placeholder="Họ"
                                            defaultValue={user.first_name}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {formErrors.first_name &&
                                            <span className="text-red-500">{formErrors.first_name}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="last_name"
                                               className=" block text-base font-medium text-gray-800">
                                            Tên
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            placeholder="Tên"
                                            defaultValue={user.last_name}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {formErrors.last_name &&
                                            <span className="text-red-500">{formErrors.last_name}</span>}
                                    </div>
                                </div>
                                <div className=' mb-5'>
                                    <label htmlFor="email" className=" block text-base font-medium text-gray-800">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="example@domain.com"
                                        defaultValue={user.email}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}
                                </div>
                                <div className=' mb-5'>
                                    <label htmlFor="phone" className=" block text-base font-medium text-gray-800">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        placeholder="Số điện thoại"
                                        defaultValue={user.phone}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.phone && <span className="text-red-500">{formErrors.phone}</span>}
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="address" className=" block text-base font-medium text-gray-800">
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Địa chỉ"
                                        defaultValue={user.address}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.address && <span className="text-red-500">{formErrors.address}</span>}
                                </div>
                                <div>
                                    <button
                                        className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
