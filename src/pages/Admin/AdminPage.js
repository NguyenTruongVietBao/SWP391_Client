import React, { useEffect, useState } from 'react';
import { deleteUser, listUsers } from '../../services/UserService/UserService';
import { Button, Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Admin/Menu';
import { toast } from 'react-toastify';
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/features/counterSlice";
import api from "../../config/axios";

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const user = useSelector(selectUser);
    const userId = user.user_id;
    console.log('userId', userId);
    const USERS_PER_PAGE = 8;

    // Get all users
    useEffect(() => {
        const getAllUsers = () => {
            listUsers()
                .then((res) => {
                    setUsers(res.data.data);
                })
                .catch((error) => {
                    toast.error('Error fetching users:', error);
                });
        };
        getAllUsers();
    }, []);

    // open close Dialog
    const openDialog = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };
    const closeDialog = () => {
        setIsOpen(false);
        setSelectedUser(null);
    };

    // Delete user
    // const handleDelete = async () => {
    //     try {
    //         if (selectedUser) {
    //             if (selectedUser.user_id === userId) {
    //                 toast.error("Không thể xóa người dùng đang đăng nhập");
    //                 return;
    //             }
    //             if (selectedUser.role === 'ADMIN') {
    //                 toast.error("You cannot delete an admin account.");
    //                 return;
    //             }
    //             setUsers(users.filter(user => user.user_id !== selectedUser.user_id));
    //             closeDialog();
    //             const response = await deleteUser(selectedUser.user_id);
    //             console.log(response);
    //         }
    //     } catch (e) {
    //         toast.error(e.response.data);
    //     }
    // };
    const handleDelete = async () => {
        try {
            if (selectedUser) {
                if (selectedUser.user_id === userId) {
                    toast.error("Không thể xóa người dùng này");
                    closeDialog();
                    return;
                }
                const updatedUser = { ...selectedUser, delete: true };
                const response = await api.put(`/user/${selectedUser.user_id}`, updatedUser);
                console.log('user deleted: ',response.data.data)
                closeDialog();
                toast.success("User successfully deleted.");
            }
        } catch (e) {
            toast.error(e.response?.data || e.message);
        }
    };

    // Filtered users
    const filteredUsers = users.filter(user =>
        `${user.last_name} ${user.first_name}`.toLowerCase().includes(filterText.toLowerCase())
    );

    // Pagination
    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div
            className="antialiased w-full min-h-screen text-slate-100 relative py-4"
            style={{backgroundImage: 'url("/assets/admin-wallpaper.png")'}}
        >
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                {/* Menu */}
                <Menu/>
                {/* Content */}
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                    {/* Manage Course */}
                    <div id="manage-course">
                        <div className='flex items-center justify-between mb-2'>
                            <h1 className="font-bold text-xl py-4 uppercase">Danh sách người dùng</h1>

                        </div>
                        <div className="mb-4 flex justify-between items-center gap-3">
                            <div className={'flex items-center'}>
                                <input
                                    type="text"
                                    className="w-full max-w-60 px-4 py-2 mr-2 rounded-md text-black"
                                    placeholder="Tìm theo tên"
                                    value={filterText}
                                    onChange={(e) => setFilterText(e.target.value)}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                                </svg>
                            </div>
                            <div>
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-black/60 via-black/80 to-black/60 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                    <Link to={'./create'} className='flex'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 ">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                        Tạo người dùng
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-scroll">
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-black/60">
                                <tr>
                                    <th className="text-left py-3 px-2 rounded-l-lg">Họ và tên</th>
                                    <th className="text-left py-3 px-2">Email</th>
                                    <th className="text-left py-3 px-2">Số điện thoại</th>
                                    <th className="text-left py-3 px-2">Chức năng</th>
                                    <th className="text-left py-3 px-2 rounded-r-lg">Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentUsers
                                    .filter(user => !user.delete)  // Filter out deleted users
                                    .map((user, index) => (
                                        <tr key={index} className="border-b border-gray-800">
                                            <td className="py-3 px-2 font-bold">
                                                <div className="inline-flex space-x-3 items-center">
                                                    <span>
                                                        <img className="rounded-full min-w-8 h-8" src="/assets/admin-avatar.png" alt="s"/>
                                                    </span>
                                                    <span>{user.last_name} {user.first_name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2">{user.email}</td>
                                            <td className="py-3 px-2">{user.phone}</td>
                                            <td className="py-3 px-2">{user.role}</td>
                                            <td className="py-3 px-2">
                                                <div className="flex items-center justify-evenly space-x-3">
                                                    <button onClick={() => openDialog(user)} title="Delete"
                                                            className="hover:text-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                             className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                        <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage}/>
                    </div>
                </div>
            </div>
            {/* Dialog */}
            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={closeDialog}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <Dialog.Panel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                                    <Dialog.Title as="h3" className="text-base/7 font-medium text-white">
                                        Xác nhận xóa người dùng
                                    </Dialog.Title>
                                    <p className="mt-2 text-sm/6 text-white/90">
                                        Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể được hoàn tác
                                    </p>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                            onClick={handleDelete}
                                        >
                                            Xóa
                                        </Button>
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                            onClick={closeDialog}
                                        >
                                            Hủy
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

function Pagination({ totalPages, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4 flex justify-center">
            <ul className="flex items-center space-x-2">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-gray-700 text-white' : 'bg-gray-500 text-gray-100'}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}