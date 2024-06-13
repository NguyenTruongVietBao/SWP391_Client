import React, { useEffect, useState } from 'react'
import Menu from '../../components/Admin/Menu'
import { useParams } from 'react-router-dom';
import { getUserById } from '../../services/UserService/UserService';

export default function UpdatePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            setError('User ID is not provided.');
            return;
        }
        getUserById(userId)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error('Error fetching user:', err);
                setError('Error fetching user data. Please try again later.');
            });
    }, [userId]);

    if (!user) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div className="antialiased w-full min-h-screen text-slate-100 relative py-4" style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}>
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                {/* Menu */}
                <Menu />
                {/* Content */}
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                    <div className="bg-stone-600 flex items-center justify-center p-12 " style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}>
                        <div className="mx-auto w-full max-w-[550px]">
                            <div className='text-6xl font-bold text-center mb-10'>Update {user.last_name}</div>
                            <form action="https://formbold.com/s/FORM_ID" method="POST">
                                <div className="flex justify-between mb-5">
                                    <div>
                                        <label htmlFor="first_name" className="mb-3 block text-base font-medium text-white">
                                            First Name
                                        </label>
                                        <input type="text" name="first_name" id="first_name" placeholder="First Name" defaultValue={user.first_name} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                    <div>
                                        <label htmlFor="last_name" className="mb-3 block text-base font-medium text-white">
                                            Last Name
                                        </label>
                                        <input type="text" name="last_name" id="last_name" placeholder="Last Name" defaultValue={user.last_name} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                                <div className="flex justify-between mb-5">
                                    <div>
                                        <label htmlFor="username" className="mb-3 block text-base font-medium text-white">
                                            Username
                                        </label>
                                        <input type="text" name="username" id="username" placeholder="Username" defaultValue={user.username} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="mb-3 block text-base font-medium text-white">
                                            Password
                                        </label>
                                        <input type="password" name="password" id="password" placeholder="Password" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="mb-3 block text-base font-medium text-white">
                                        Email 
                                    </label>
                                    <input type="email" name="email" id="email" placeholder="example@domain.com" defaultValue={user.email} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="phone" className="mb-3 block text-base font-medium text-white">
                                        Phone 
                                    </label>
                                    <input type="tel" name="phone" id="phone" placeholder="123-456-7890" defaultValue={user.phone} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="address" className="mb-3 block text-base font-medium text-white">
                                        Address
                                    </label>
                                    <input type="text" name="address" id="address" placeholder="Enter your address" defaultValue={user.address} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <label htmlFor="role" className="mb-3 block text-base font-medium text-white">
                                    Role
                                </label>
                                <div className='flex justify-between mb-5 items-center'>
                                    {['CONTENT MANAGER', 'MANAGER', 'PARENT', 'STUDENT'].map((role, index) => (
                                        <div key={index} className="flex">
                                            <input type="radio" id={`role-${index}`} className="peer hidden" name="role" defaultChecked={user.role === role} />
                                            <label htmlFor={`role-${index}`} className="select-none cursor-pointer rounded-lg border-2 border-gray-200
                                                py-3 px-4 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200">
                                                {role}
                                            </label>
                                        </div>
                                    ))}
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
    );
}
