import React, { useEffect, useState } from 'react'
import Menu from '../../components/Admin/Menu'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
// import { getUserById } from '../../services/UserService/UserService';
import axios from 'axios';
import api from '../../config/axios';
import { toast } from 'react-toastify';

// export default function UpdatePage() {
//     const [user, setUser] = useState(null);
//     const [error, setError] = useState(null);
//     const { userId } = useParams();

//     useEffect(() => {
//         if (!userId) {
//             setError('User ID is not provided.');
//             return;
//         }
//         getUserById(userId)
//             .then((res) => {
//                 setUser(res.data.data);
//             })
//             .catch((err) => {
//                 console.error('Error fetching user:', err);
//                 setError('Error fetching user data. Please try again later.');
//             });
//     }, [userId]);

//     const handleUpdateUser = async (e) => {
//         e.preventDefault();
//         const updatedUser = {
//             first_name: e.target.first_name.value,
//             last_name: e.target.last_name.value,
//             username: e.target.username.value,
//             password: e.target.password.value,
//             email: e.target.email.value,
//             phone: e.target.phone.value,
//             address: e.target.address.value,
//             role: e.target.role.value,
//         };
        
//         try {
//             await api.put(`http://localhost:8080/user/${userId}`, updatedUser);
//             alert('User updated successfully!');
//         } catch (err) {
//             console.error('Error updating user:', err);
//             setError('Error updating user data. Please try again later.');
//         }
//     };

//     if (!user) {
//         return <div className="text-red-500 text-center mt-10">{error}</div>;
//     }

//     return (
//       <div
//         className="antialiased w-full min-h-screen text-slate-100 relative py-4"
//         style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}
//       >
//         <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
//           {/* Menu */}
//           <Menu />
//           {/* Content */}
//           <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
//             <div
//               className="bg-stone-600 flex items-center justify-center p-12 "
//               style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}
//             >
//               <div className="mx-auto w-full max-w-[550px]">
//                 <div className="text-6xl font-bold text-center mb-10">
//                   Update {user.last_name}
//                 </div>
//                 <form onSubmit={handleUpdateUser}>
//                   <div className="flex justify-between mb-5">
//                     <div>
//                       <label
//                         htmlFor="first_name"
//                         className="mb-3 block text-base font-medium text-white"
//                       >
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         name="first_name"
//                         id="first_name"
//                         placeholder="First Name"
//                         defaultValue={user.first_name}
//                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="last_name"
//                         className="mb-3 block text-base font-medium text-white"
//                       >
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         name="last_name"
//                         id="last_name"
//                         placeholder="Last Name"
//                         defaultValue={user.last_name}
//                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-between mb-5">
//                     <div>
//                       <label
//                         htmlFor="username"
//                         className="mb-3 block text-base font-medium text-white"
//                       >
//                         Username
//                       </label>
//                       <input
//                         type="text"
//                         name="username"
//                         id="username"
//                         placeholder="Username"
//                         defaultValue={user.username}
//                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="password"
//                         className="mb-3 block text-base font-medium text-white"
//                       >
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         name="password"
//                         id="password"
//                         placeholder="Password"
//                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                       />
//                     </div>
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="email"
//                       className="mb-3 block text-base font-medium text-white"
//                     >
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       id="email"
//                       placeholder="example@domain.com"
//                       defaultValue={user.email}
//                       className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="phone"
//                       className="mb-3 block text-base font-medium text-white"
//                     >
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       id="phone"
//                       placeholder="123-456-7890"
//                       defaultValue={user.phone}
//                       className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="address"
//                       className="mb-3 block text-base font-medium text-white"
//                     >
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       name="address"
//                       id="address"
//                       placeholder="Enter your address"
//                       defaultValue={user.address}
//                       className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                     />
//                   </div>
//                   <label
//                     htmlFor="role"
//                     className="mb-3 block text-base font-medium text-white"
//                   >
//                     Role
//                   </label>
//                   <div className="flex justify-between mb-5 items-center">
//                     {["CONTENT MANAGER", "MANAGER", "PARENT", "STUDENT"].map(
//                       (role, index) => (
//                         <div key={index} className="flex">
//                           <input
//                             type="radio"
//                             id={`role-${index}`}
//                             className="peer hidden"
//                             name="role"
//                             defaultChecked={user.role === role}
//                           />
//                           <label
//                             htmlFor={`role-${index}`}
//                             className="select-none cursor-pointer rounded-lg border-2 border-gray-200
//                                                 py-3 px-4 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200"
//                           >
//                             {role}
//                           </label>
//                         </div>
//                       )
//                     )}
//                   </div>
//                   <div>
//                     <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// }

// export default function UpdatePage() {
//     const [user, setUser] = useState(null);
//     const [error, setError] = useState(null);
//     const { userId } = useParams();

//     useEffect(() => {
//         if (!userId) {
//             setError('User ID is not provided.');
//             return;
//         }
//         getUserById(userId)
//             .then((res) => {
//                 setUser(res.data.data);
//             })
//             .catch((err) => {
//                 console.error('Error fetching user:', err);
//                 setError('Error fetching user data. Please try again later.');
//             });
//     }, [userId]);

//     const getUserById = async (id) => {
//         try {
//             const response = await api.get(`http://localhost:8080/user/get/${id}`);
//             return response;
//         } catch (err) {
//             throw err;
//         }
//     };

//     const handleUpdateUser = async (e) => {
//         e.preventDefault();
//         const updatedUser = {
//             first_name: e.target.first_name.value,
//             last_name: e.target.last_name.value,
//             username: e.target.username.value,
//             password: e.target.password.value,
//             email: e.target.email.value,
//             phone: e.target.phone.value,
//             address: e.target.address.value,
//             role: e.target.role.value,
//         };
        
//         try {
//             await api.put(`http://localhost:8080/user/${userId}`, updatedUser);
//             toast.success('User updated successfully!')
//         } catch (err) {
//             console.error('Error updating user:', err);
//             setError('Error updating user data. Please try again later.');
//         }
//     };

//     if (!user) {
//         return <div className="text-red-500 text-center mt-10">{error}</div>;
//     }

//     return (
//         <div
//             className="antialiased w-full min-h-screen text-slate-100 relative py-4"
//             style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}
//         >
//             <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
//                 <Menu />
//                 <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
//                     <div
//                         className="bg-stone-600 flex items-center justify-center p-12"
//                         style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}
//                     >
//                         <div className="mx-auto w-full max-w-[550px]">
//                             <div className="text-6xl font-bold text-center mb-10">
//                                 Update {user.last_name}
//                             </div>
//                             <form onSubmit={handleUpdateUser}>
//                                 <div className="flex justify-between mb-5">
//                                     <div>
//                                         <label htmlFor="first_name" className="mb-3 block text-base font-medium text-white">
//                                             First Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="first_name"
//                                             id="first_name"
//                                             placeholder="First Name"
//                                             defaultValue={user.first_name}
//                                             className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="last_name" className="mb-3 block text-base font-medium text-white">
//                                             Last Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="last_name"
//                                             id="last_name"
//                                             placeholder="Last Name"
//                                             defaultValue={user.last_name}
//                                             className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="flex justify-between mb-5">
//                                     <div>
//                                         <label htmlFor="username" className="mb-3 block text-base font-medium text-white">
//                                             Username
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="username"
//                                             id="username"
//                                             placeholder="Username"
//                                             defaultValue={user.username}
//                                             className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="password" className="mb-3 block text-base font-medium text-white">
//                                             Password
//                                         </label>
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             id="password"
//                                             placeholder="Password"
//                                             className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="mb-5">
//                                     <label htmlFor="email" className="mb-3 block text-base font-medium text-white">
//                                         Email
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         id="email"
//                                         placeholder="example@domain.com"
//                                         defaultValue={user.email}
//                                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                                     />
//                                 </div>
//                                 <div className="mb-5">
//                                     <label htmlFor="phone" className="mb-3 block text-base font-medium text-white">
//                                         Phone
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="phone"
//                                         id="phone"
//                                         placeholder="123-456-7890"
//                                         defaultValue={user.phone}
//                                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                                     />
//                                 </div>
//                                 <div className="mb-5">
//                                     <label htmlFor="address" className="mb-3 block text-base font-medium text-white">
//                                         Address
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="address"
//                                         id="address"
//                                         placeholder="Enter your address"
//                                         defaultValue={user.address}
//                                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                                     />
//                                 </div>
//                                 <label htmlFor="role" className="mb-3 block text-base font-medium text-white">
//                                     Role
//                                 </label>
//                                 <div className="bg-gray-200 py-3 px-4 rounded-lg text-gray-900 font-bold">
//                                     {user.role}
//                                 </div>
//                                 <div>
//                                     <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
//                                         Submit
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function UpdatePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const { userId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userId) {
            setError('User ID is not provided.');
            return;
        }
        getUserById(userId)
            .then((res) => {
                setUser(res.data.data);
            })
            .catch((err) => {
                console.error('Error fetching user:', err);
                setError('Error fetching user data. Please try again later.');
            });
    }, [userId]);

    const getUserById = async (id) => {
        try {
            const response = await api.get(`/user/get/${id}`);
            return response;
        } catch (err) {
            throw err;
        }
    };
    console.log(user);

    const validateForm = (data) => {
        const errors = {};
        if (!data.first_name) errors.first_name = 'First Name is required';
        if (!data.last_name) errors.last_name = 'Last Name is required';
        if (!data.username) errors.username = 'Username is required';
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!data.phone) {
            errors.phone = 'Phone is required';
        } else if (!/^09\d{8}$/.test(data.phone)) {
            errors.phone = 'Phone number is invalid. Format: 123-456-7890';
        }
        if (!data.address) errors.address = 'Address is required';
        return errors;
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const updatedUser = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            username: e.target.username.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            role: user.role,
        };

        const errors = validateForm(updatedUser);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await api.put(`/user/${userId}`, updatedUser);
            toast.success('User updated successfully!');
            navigate('/admin')
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Error updating user data. Please try again later.');
        }
    };

    if (!user) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div
            className="antialiased w-full min-h-screen text-slate-100 relative py-4"
            style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}
        >
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <Menu />
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                    <div
                        className="bg-stone-600 flex items-center justify-center p-12"
                        style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}
                    >
                        <div className="mx-auto w-full max-w-[550px]">
                            <div className="text-6xl font-bold text-center mb-10">
                                Update {user.last_name}
                            </div>
                            <form onSubmit={handleUpdateUser}>
                                <div className="flex justify-between mb-5">
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
                                <div className="flex justify-between mb-5">
                                    <div>
                                        <label htmlFor="username" className="mb-3 block text-base font-medium text-white">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="Username"
                                            defaultValue={user.username}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        {formErrors.username && <span className="text-red-500">{formErrors.username}</span>}
                                    </div>
                                    {/* <div>
                                        <label htmlFor="password" className="mb-3 block text-base font-medium text-white">
                                            Password
                                        </label>
                                        <input
                                            readOnly
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div> */}
                                </div>
                                <div className="mb-5">
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
                                <div className="mb-5">
                                    <label htmlFor="phone" className="mb-3 block text-base font-medium text-white">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        placeholder="123-456-7890"
                                        defaultValue={user.phone}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {formErrors.phone && <span className="text-red-500">{formErrors.phone}</span>}
                                </div>
                                <div className="mb-5">
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
                                <div className="mb-5">
                                    <label htmlFor="role" className="mb-3 block text-base font-medium text-white">
                                        Role
                                    </label>
                                    <div className="bg-gray-200 py-3 px-4 rounded-lg text-gray-900 font-bold">
                                        {user.role}
                                    </div>  
                                </div>
                                <div>
                                    <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                        Cập nhật
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
