import React, { useState } from 'react'
import { selectUser } from '../../redux/features/counterSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from '../../components/Parent/Body/Menu';
import api from '../../config/axios';
import { toast } from 'react-toastify';

export default function Profile() {
    const user = useSelector(selectUser);
    console.log(user);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

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
            address: e.target.address.value
        };

        const errors = validateForm(updatedUser);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await api.put(`/user/`+user.user_id, updatedUser);
            toast.success('User updated successfully!');
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Error updating user data. Please try again later.');
        }
        console.log(updatedUser);

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
                <div className="flex items-center justify-center" >
                    <div className="mx-auto w-full max-w-[550px]">
                        <div className="text-6xl font-bold text-center mb-10 text-black">
                            Update {user.last_name}
                        </div>
                        <form onSubmit={handleUpdateUser}>
                            <div className="flex justify-between">
                                <div>
                                    <label htmlFor="first_name" className="mb-3 block text-base font-medium text-white">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        placeholder="First Name"
                                        defaultValue={user.first_name}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.first_name && <span className="text-red-500">{formErrors.first_name}</span>}
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="mb-3 block text-base font-medium text-white">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        placeholder="Last Name"
                                        defaultValue={user.last_name}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.last_name && <span className="text-red-500">{formErrors.last_name}</span>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-3 block text-base font-medium text-white">
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
                            <div>
                                <label htmlFor="phone" className="mb-3 block text-base font-medium text-white">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder="0912312312"
                                    defaultValue={user.phone}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {formErrors.phone && <span className="text-red-500">{formErrors.phone}</span>}
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="address" className="mb-3 block text-base font-medium text-white">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Enter your address"
                                    defaultValue={user.address}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {formErrors.address && <span className="text-red-500">{formErrors.address}</span>}
                            </div>
                            <div>
                                <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
