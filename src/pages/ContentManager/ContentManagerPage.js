import React, { useEffect, useState } from 'react'
import { Button } from '@headlessui/react'
import { listCourses } from '../../services/CourseService/CourseService'
import {Link} from 'react-router-dom'
import Menu from '../../components/ContentManager/Menu';
import Loading from '../../components/Loading/Loading';

export default function ContentManagerPage() {
    const [courses, setCourses] = useState([]);

    // Fetch data
    useEffect(() => {
        getCourseAll();
    }, []); 

    // Get All Course
    function getCourseAll() {
        listCourses()
            .then((res) => {
                setCourses(res.data.data);
            })
            .catch((error) => {
                console.log('Error fetching courses:', error);
            });
    }
    if (!courses) {
        return <div className='flex flex-col items-center justify-center h-screen'><Loading/></div>;
    }
    return (
        <div className="antialiased bg-orange-50 w-full min-h-screen text-black relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                {/* Menu */}
                <Menu/>
                {/* Content */}
                <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
                    {/* Manage Course */}
                    <div id="manage-course">
                        <div className='flex items-center justify-between'>
                            <h1 className="font-bold py-4 uppercase">Manage Course</h1>
                            <Button className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-black/60 via-black/80 to-black/60 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                <Link to={'./create'} className='flex'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Add course
                                </Link>
                            </Button>
                        </div>
                        <div className="overflow-x-scroll">                                       
                            <table className="w-full whitespace-nowrap">
                                <thead className="bg-gradient-to-br from-black/80 via-black/60 to-black/70  text-white/90">
                                    <tr>
                                        <th className="text-left py-3 px-2 rounded-l-lg">Image</th>
                                        <th className="text-center py-3 px-2">Title</th>
                                        <th className="text-center py-3 px-2">Chapter</th>
                                        <th className="text-center py-3 px-2">Topic</th>
                                        <th className="text-center py-3 px-2">Lesson</th>
                                        <th className="text-center py-3 px-2">Price</th>
                                        <th className="text-center py-3 px-2 rounded-r-lg">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {courses.map((data, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className="py-3 font-bold">
                                            <div className="inline-flex items-center">
                                                <span><img className="rounded-lg w-16 h-auto" src={`/assets/Class/${data.image}.png`} alt="a" /></span>                             
                                            </div>
                                        </td>
                                        <td className="py-3 px-2 text-center font-bold"><span>{data.title}</span></td>
                                        <td className="py-3 px-2 text-center">30</td>
                                        <td className="py-3 px-2 text-center">20</td>
                                        <td className="py-3 px-2 text-center">40</td>
                                        <td className="py-3 px-2 text-center">100.000 VNĐ</td>
                                        <td className="py-3 px-2 text-center">
                                        <div className="inline-flex items-center space-x-3">
                                            <Link to={`./update/${data.course_id}`} title="Edit" className="hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </Link>
                                            <a href="/content-manager" title="Delete" className="hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </a>
                                            <Link to={`./detail/${data.course_id}`} title="Detail" className="hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </Link>
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
