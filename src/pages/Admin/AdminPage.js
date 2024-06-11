import React, { useEffect, useState } from 'react'
import { listUsers } from '../../services/UserService/UserService';
import { Button } from '@headlessui/react';
import { PencilIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import Menu from '../../components/Admin/Menu';

export default function AdminPage() {
    const [users, setUsers] = useState([]);

    // Fetch data
    useEffect(() => {
        getUserAll();
    }, []); // Adding an empty dependency array to run the effect only once

    // Get All Users
    function getUserAll() {
        listUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                console.log('Error fetching users:', error);
            });
    }
    // Set Role Name by role_id
    const getRoleName = (role_id) => {
        switch (role_id) {
            case 1: return 'Admin';
            case 2: return 'Parent';
            case 3: return 'Content Manager';
            case 4: return 'Manager';
            default: return 'Unknown';
        }
    };
    
    return (
        <div className="antialiased w-full min-h-screen text-white relative py-4" style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}>
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                {/* Menu */}
                <Menu/>
                {/* Content */}
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                    {/* Manage Course */}
                    <div id="manage-course">
                        <div className='flex items-center justify-between mb-2'>
                            <h1 className="font-bold py-4 uppercase">List of users</h1>
                            <Button className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-black/60 via-black/80 to-black/60 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                <Link to={'./create'} className='flex'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Add user
                                </Link>
                            </Button>
                        </div>
                        <div className="overflow-x-scroll">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-black/60">
                                    <tr>
                                        <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                                        <th className="text-left py-3 px-2">Email</th>
                                        <th className="text-left py-3 px-2">Phone</th>
                                        <th className="text-left py-3 px-2">Address</th>
                                        <th className="text-left py-3 px-2">Role</th>
                                        <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index} className="border-b border-gray-800">
                                            <td className="py-3 px-2 font-bold">
                                                <div className="inline-flex space-x-3 items-center">
                                                    <span><img className="rounded-full w-8 h-8" src="/assets/admin-avatar.png" alt="s" /></span>
                                                    <span>{user.last_name} {user.first_name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2">{user.email}</td>
                                            <td className="py-3 px-2">{user.phone}</td>
                                            <td className="py-3 px-2">{user.address}</td>
                                            <td className="py-3 px-2">{getRoleName(user.role_id)}</td>
                                            <td className="py-3 px-2">
                                                <div className="inline-flex items-center space-x-3">
                                                    <Link to={`./update/${user.user_id}`} className="hover:text-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </Link>
                                                    <a href="/content-manager" title="Delete" className="hover:text-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
