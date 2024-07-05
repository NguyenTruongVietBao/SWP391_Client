import React, { useState } from 'react'
import Menu from '../../components/Admin/Menu'
import api from '../../config/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateForm = (data) => {
        const errors = {};
        if (!data.first_name) errors.first_name = 'First Name is required';
        if (!data.last_name) errors.last_name = 'Last Name is required';
        if (!data.username) errors.username = 'Username is required';
        if (!data.password) errors.password = 'Password is required';
        if (!data.confirm_password) {
            errors.confirm_password = 'Confirm Password is required';
        } else if (data.password !== data.confirm_password) {
            errors.confirm_password = 'Passwords do not match';
        }
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!data.phone) errors.phone = 'Phone is required';
        if (!data.address) errors.address = 'Address is required';
        if (!data.role) errors.role = 'Role is required';
        return errors;
    };

    const handleAddUser = async (e) => {
        e.preventDefault();

        const newUser = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            username: e.target.username.value,
            password: e.target.password.value,
            confirm_password: e.target.confirm_password.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            role: e.target.role.value,
        };

        const errors = validateForm(newUser);

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await api.post('/user/create', newUser);
            toast.success('User added successfully!');
            navigate('/admin');
        } catch (err) {
            console.log(newUser);
            console.error('Error adding user:', err);
            setError('Error adding user data. Please try again later.');
        }
    };

    return (
        <div
            className="antialiased w-full min-h-screen text-slate-100 relative py-4"
            style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}
        >
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                {/* Menu */}
                <Menu />
                {/* Content */}
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-5">
                    <div
                        className="bg-stone-600 flex items-center justify-center p-12"
                        style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}
                    >
                        <div className="mx-auto w-full max-w-[550px]">
                            <div className="text-6xl font-bold text-center mb-7">
                                Add User
                            </div>
                            <form onSubmit={handleAddUser}>
                                <div className={'mb-4'}>
                                    <label htmlFor="username"
                                           className="mb-3 block text-base font-medium text-white">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.username &&
                                        <span className="text-red-500">{formErrors.username}</span>}
                                </div>
                                <div className="flex justify-between mb-5">
                                    <div>
                                        <label htmlFor="first_name"
                                               className="mb-3 block text-base font-medium text-white">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            placeholder="First Name"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {formErrors.first_name &&
                                            <span className="text-red-500">{formErrors.first_name}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="last_name"
                                               className="mb-3 block text-base font-medium text-white">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            placeholder="Last Name"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {formErrors.last_name &&
                                            <span className="text-red-500">{formErrors.last_name}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between mb-5">
                                    <div>
                                        <label htmlFor="password"
                                               className="mb-3 block text-base font-medium text-white">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {formErrors.password &&
                                            <span className="text-red-500">{formErrors.password}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="confirm_password"
                                               className="mb-3 block text-base font-medium text-white">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            id="confirm_password"
                                            placeholder="Confirm Password"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {formErrors.confirm_password &&
                                            <span className="text-red-500">{formErrors.confirm_password}</span>}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="mb-3 block text-base font-medium text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="example@domain.com"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="mb-3 block text-base font-medium text-white">
                                        Phone
                                    </label>
                                    <input
                                        name="phone"
                                        id="phone"
                                        placeholder="123-456-7890"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.phone && <span className="text-red-500">{formErrors.phone}</span>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address" className="mb-3 block text-base font-medium text-white">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Enter your address"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.address && <span className="text-red-500">{formErrors.address}</span>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="role" className="mb-3 block text-base font-medium text-white">
                                        Role
                                    </label>
                                    <div className="flex justify-between mb-5 items-center">
                                        {["CONTENT_MANAGER", "MANAGER", "PARENT"].map((role, index) => (
                                            <div key={index} className="flex">
                                                <input
                                                    type="radio"
                                                    id={`role-${index}`}
                                                    name="role"
                                                    value={role}
                                                    className="peer hidden"
                                                />
                                                <label
                                                    htmlFor={`role-${index}`}
                                                    className="select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-4 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200"
                                                >
                                                    {role}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {formErrors.role && <span className="text-red-500">{formErrors.role}</span>}
                                </div>
                                <div>
                                    <button
                                        className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                        Submit
                                    </button>
                                    {error && <div className="text-red-500 mt-2">{error}</div>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
