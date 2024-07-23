import React, { useEffect, useState } from 'react';
import './DetailCourse.css'
import {useNavigate, useParams} from 'react-router-dom';
import { getCourseById } from '../../../services/CourseService/CourseService';
import { Button, Dialog, DialogPanel, DialogTitle, Disclosure, DisclosureButton, DisclosurePanel, Transition, TransitionChild } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Loading from '../../../components/Loading/Loading';
import api from '../../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/features/counterSlice';
import { toast } from 'react-toastify';

export default function DetailCourse() {
    const [course, setCourse] = useState(null);
    const [chapters, setChapters] = useState([]);
    const { courseId } = useParams();
    const [students, setStudents] = useState([]);
    const user = useSelector(selectUser);
    const [userId, setUserId] = useState(null);
    const [isOpenPayment, setIsOpenPayment] = useState(false);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null); // New state for selected student ID
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [numPayments, setNumPayments] = useState(0);
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        address: '',
        is_deleted: false
    });
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await api.get(`/payment/course/${courseId}`);
                const payments = response.data.data;
                setNumPayments(payments.length);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, [courseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const validateForm = () => {
        let formErrors = {};
        const minLength = 8;
        const maxLength = 32;
        if (!formData.username) {
            formErrors.username = 'Tên đăng nhập is required';
        } else if (formData.username.length < minLength || formData.username.length > maxLength) {
            formErrors.username = `Tên đăng nhập must be between ${minLength} and ${maxLength} characters`;
        }
        if (!formData.first_name) formErrors.first_name = 'Họ is required';
        if (!formData.last_name) formErrors.last_name = 'Tên is required';
        if (!formData.password) {
            formErrors.password = 'Mật khẩu is required';
        } else if (formData.password.length < minLength || formData.password.length > maxLength) {
            formErrors.password = `Mật khẩu must be between ${minLength} and ${maxLength} characters`;
        }

        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = 'Mật khẩu không giống nhau';
        }
        // if (!formData.email) formErrors.email = 'Email is required';
        // if (!formData.phone) formErrors.phone = 'Số điện thoại is required';
        if (!formData.address) formErrors.address = 'Địa chỉ is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

  // Open close dialog            
    function open() {
        setIsOpenPayment(true);
    }
    function close() {
        setIsOpenPayment(false);
    }
    function openCreate() {
        setIsOpenPayment(false);
        setTimeout(() => {
            setIsOpenCreate(true);
        }, 500  );
    }
    function closeCreate() {
        setIsOpenCreate(false);
    }

    useEffect(() => {
        if (user !== null) {
          setUserId(user.user_id);
        }
      }, [user]);

    // Get course by ID
    useEffect(() => {
        getCourseById(courseId)
            .then((res) => { setCourse(res.data.data); })
            .catch(() => console.log("error"));
    }, [courseId]);

    // Get student by parent ID
    useEffect(() => {
        const getStudentByParentId = async (userId) => {
            try {
                const response = await api.get(`user/student/${userId}`);
                return response;
            } catch (err) {
                throw err;
            }
        };
        getStudentByParentId(userId)
            .then((res) => { setStudents(res.data.data); })
            .catch(() => console.log("error"));
    }, [userId]);

    // Get chapter topic lesson by parent ID
    useEffect(() => {
        const fetchChaptersTopicsAndLessons = async () => {
            const chaptersResponse = await api.get(`chapter/course/${courseId}`);
            const chaptersData = chaptersResponse.data.data;
            console.log('chaptersData',chaptersData)
            const chaptersWithTopicsAndLessons = await Promise.all(chaptersData.map(async (chapter) => {
                const topicsResponse = await api.get(`topic/chapter/${chapter.chapter_id}`);
                const topicsData = topicsResponse.data.data;
                console.log('topicsData',topicsData)
                const topicsWithLessons = await Promise.all(topicsData.map(async (topic) => {
                    const lessonsResponse = await api.get(`lessons/topic/${topic.topic_id}`);
                    return { ...topic, lessons: lessonsResponse.data.data };
                }));
                return { ...chapter, topics: topicsWithLessons };
            }));

            setChapters(chaptersWithTopicsAndLessons);
        };
        fetchChaptersTopicsAndLessons();
    }, [courseId]);
    
    // Payment
    const handlePurchase = async () => {
        const amount = course.discount_price*1000; 
        try {
            const response = await api.post('/payment/create', {
                "amount": amount,
                "student_id": selectedStudentId,
                "course_id": courseId
            });
            console.log(amount, selectedStudentId, courseId);
            window.open(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleGetStudentId = (student_id) => {
        setSelectedStudentId(student_id);
    };
    // Create Student
    const handleCreateStudent = async (e) => {
        e.preventDefault();
        console.log(formData)
        if (validateForm()) {
            try {
                await api.post(`/student/user/${userId}`, formData);
                toast.success('Tạo học sinh thành công')
                window.location.reload();
                // closeCreate();
                // close();
            } catch (error) {
                console.error('There was an error creating the student!', error);
            }
        }
    };
    
    // Loading
    if (!course) {
        return <div className='flex justify-center my-60'><Loading /></div>; // Show a loading message while course data is being fetched
    }
    console.log(students)
    return (
    <div className="bg-gradient-to-r from-mathcha via-white to-mathcha pb-10">
        <div className="pt-10 mx-auto max-w-7xl">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                {/* Left*/}
                <div className="ml-10">
                    {/* Description */}
                    <div className="text-base leading-7 text-gray-700">
                        <p className="text-base font-semibold leading-7 text-mathcha-orange">
                            Chi tiết khóa học
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Đến với {course.title}
                        </h1>
                        <div className="max-w-xl">
                            <p className="mt-6">
                                <strong className={'mr-1'}> - Mô tả khóa học: </strong>  {course.description}.
                            </p>
                            <p className="my-5">
                                <strong> - Yêu cầu khóa học: </strong>
                                <ul className={'list-disc'}>
                                    <li className={'ml-10'}> {course.description}.</li>
                                    <li className={'ml-10'}> {course.description}.</li>
                                </ul>
                            </p>
                            <p>
                                <strong> - Kết quả đạt được: </strong>
                                <ul className={'list-disc'}>
                                    <li className={'ml-10'}> {course.description}.</li>
                                    <li className={'ml-10'}> {course.description}.</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                    {/* Accordions */}
                    <div className="py-5 w-full">
                        <div className="mx-auto w-full divide-y divide-black/5 rounded-xl bg-black/5">
                            {chapters.map((chapter, index) => (
                                <Disclosure
                                    key={index}
                                    as="div"
                                    className="p-6"
                                    defaultOpen={false}
                                >
                                    {/* Chapter */}
                                    <DisclosureButton className="group flex w-full items-center justify-between">
                                        <span className="text-2xl font-medium text-black group-data-[hover]:text-black/80">
                                            {chapter.title}
                                        </span>
                                        <ChevronDownIcon className="size-5 fill-black/60  group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 text-sm/5 text-black/50 bg-white/25 p-3 rounded-lg">
                                        {chapter.topics.map((topic, topicIndex) => (
                                            <Disclosure key={topicIndex} as="div"className="px-6 mb-2" >
                                                {/* Topic */}
                                                <DisclosureButton className="group flex w-full items-center justify-between">
                                                    <span className="text-lg font-medium mt-2 text-black group-data-[hover]:text-black/80">
                                                        {topicIndex + 1}. {topic.title}
                                                    </span>
                                                    <ChevronDownIcon className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
                                                </DisclosureButton>
                                                {/* Lessons */}
                                                {topic.lessons && topic.lessons.map((lesson, lessonIndex) => (
                                                    <DisclosurePanel key={lessonIndex} className="flex items-center rounded-xl bg-black/5 justify-between p-3 my-3 ml-6 text-sm/5">
                                                        <div>
                                                            <span className="text-base flex">
                                                                <span className={'font-medium'}>{lessonIndex+1}. </span>
                                                                <ul>
                                                                    <li className={'ml-2 font-medium'}> {lesson.title}</li>
                                                                    {/*<li>- <a href={`https://www.youtube.com/embed/${lesson.video_url}`}>Video bài giảng</a></li>*/}
                                                                    {/*<li>- <a href={lesson.document}>Tài liệu</a></li>*/}
                                                                </ul>
                                                            </span>
                                                        </div>
                                                    </DisclosurePanel>
                                                ))}
                                            </Disclosure>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className="ml-20 lg:pr-4 mt-3">
                    <div className="relative overflow-hidden rounded-3xl px-6 pb-9 pt-10 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                        <div className="absolute inset-0 mix-blend-multiply" />
                        <div
                            className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                            aria-hidden="true"
                        >
                            <div
                                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                                style={{
                                    clipPath:
                                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                                }}
                            />
                            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#E8FFD9] to-[rgba(153,229,219,1)]" />
                        </div>
                        {/*<iframe*/}
                        {/*    className="relative rounded-2xl"*/}
                        {/*    width="420px"*/}
                        {/*    height="237px"*/}
                        {/*    src="https://www.youtube.com/embed/gxOkoMHIgC8"*/}
                        {/*    title="WREN EVANS - LOI CHOI không điểm dừng | Full Album Experience (ft. itsnk)"*/}
                        {/*    frameborder="0"*/}
                        {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                        {/*    referrerpolicy="strict-origin-when-cross-origin"*/}
                        {/*    allowfullscreen*/}
                        {/*></iframe>*/}
                        <img src={course.image} className="relative rounded-2xl" alt={'a'} style={{width:'420px', height:'237px'}}/>
                        <figure className="relative isolate">
                            <svg
                                viewBox="0 0 162 128"
                                fill="none"
                                aria-hidden="true"
                                className="absolute -left-2 -top-4 -z-10 h-32 stroke-white/50"
                            >
                                <path
                                    id="0ef284b8-28c2-426e-9442-8655d393522e"
                                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                                />
                                <use href="#0ef284b8-28c2-426e-9442-8655d393522e" x={86} />
                            </svg>
                            <section className="max-w-7xl flex-col my-10 mx-2">
                                <div className="text-left max-w-2xl lg:max-w-none">
                                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                        {course.title}
                                    </h2>
                                </div>
                            </section>
                            <div className="flex items-center justify-center gap-32 ">
                                <div>
                                    <h1 className="line-through text-lg ">
                                        {course.original_price}.000 VND
                                    </h1>
                                    <h1 className="text-2xl font-bold text-red-500">
                                        {course.discount_price}.000 VND
                                    </h1>
                                </div>
                                <div>
                                    {
                                        user ? (
                                            <button onClick={open} className="button-30">Mua ngay</button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    toast.error('Bạn cần đăng nhập');
                                                    navigate('/login');
                                                }}
                                                className="button-30">
                                                Mua ngay
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </figure>
                    </div>
                    {/* More info */}
                    <dl className="text-center mt-5 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10">
                        <div>
                            <dt className="text-sm font-semibold leading-6 text-gray-600">
                                Đội ngũ giảng viên
                            </dt>
                            <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                                Nhiệt huyết
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-semibold leading-6 text-gray-600">
                                Chất lượng đào tạo
                            </dt>
                            <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                                Chuẩn quốc tế
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-semibold leading-6 text-gray-600">
                                Số lượng học viên
                            </dt>
                            <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                                Lên đến {numPayments} người
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-semibold leading-6 text-gray-600">
                                Khóa học đã bán
                            </dt>
                            <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                                {numPayments} khóa học
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>

        {/* Form chọn học sinh */}
        <Transition appear show={isOpenPayment}>
            <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 transform-[scale(95%)]"
                            enterTo="opacity-100 transform-[scale(100%)]"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 transform-[scale(100%)]"
                            leaveTo="opacity-0 transform-[scale(95%)]"
                        >
                            <DialogPanel className="w-full max-w-xl h-full rounded-xl bg-black/55 p-6 backdrop-blur-3xl">
                        
                        {students && students.length > 0 ? (
                        <>
                            <DialogTitle className="text-4xl font-medium text-center text-white">
                                Chọn học sinh cần học
                            </DialogTitle>
                            <div className='flex items-center justify-evenly my-10'>
                                {students.map((student, index) => (
                                    <label
                                        key={student.student_id}
                                        className="rounded-md bg-gray-200 py-2 px-2 text-lg font-medium text-black shadow-md hover:bg-gray-300 w-36 flex flex-col items-center justify-center"
                                    >
                                        <div className="flex items-center w-full">
                                            <div className="">
                                                {index + 1}/
                                            </div>
                                            <div className="flex-1 flex justify-center">
                                                <input
                                                    type="radio"
                                                    name="selectedStudent"
                                                    value={student.student_id}
                                                    onChange={() => handleGetStudentId(student.student_id)}
                                                    className="mr-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center mb-2">
                                            <img
                                                src={student.image}
                                                alt="not found"
                                                width={80}
                                                height={70}
                                                className="border border-black rounded-xl"
                                                style={{objectFit: 'cover', width: '70px', height: '70px'}}
                                            />
                                        </div>
                                        <div>Bé: {student.last_name}</div>
                                    </label>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div className=" flex justify-start items-center">
                                    <Button
                                        className="gap-2 rounded-md bg-gray-50 py-1 px-2 text-base font-semibold text-mathcha-orange shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:bg-gray-700 focus:outline-1 focus:outline-white"
                                        onClick={openCreate}
                                    >
                                        Thêm tài khoản
                                    </Button>
                                </div>
                                <Button
                                    className="gap-2 rounded-md bg-gray-50 py-3 px-4 text-xl font-semibold text-mathcha-green shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:bg-gray-700 focus:outline-1 focus:outline-white"
                                    onClick={handlePurchase}
                                >
                                    Mua ngay
                                </Button>
                            </div>
                        </>
                        ) : (
                            <>
                                <DialogTitle className="text-4xl font-medium text-center text-white">
                                    Bạn chưa có tài khoản cho học sinh ?
                                </DialogTitle>
                                <div className="flex justify-center my-10">
                                    <Button
                                        className="gap-2 rounded-md bg-gray-50 py-3 px-4 text-xl font-semibold text-mathcha-green shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:bg-gray-700 focus:outline-1 focus:outline-white"
                                        onClick={openCreate}
                                    >
                                        Đăng ký tại đây
                                    </Button>
                                </div>
                            </>
                        )}
                        
                    </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
        {/* Form đăng ký tài khoản cho con */}
        <Transition appear show={isOpenCreate}>
            <Dialog as="div" className="relative z-10 focus:outline-none" onClose={closeCreate}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 transform scale-95"
                            enterTo="opacity-100 transform scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 transform scale-100"
                            leaveTo="opacity-0 transform scale-95"
                        >
                            <DialogPanel className="w-full max-w-xl h-full rounded-xl py-6 bg-black/65 backdrop-blur-3xl">
                                <div className="flex items-center justify-center">
                                    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                                        <h1 className="text-4xl font-semibold text-center text-gray-500">Đăng ký tài khoản</h1>
                                        <form>
                                            <div className="mb-2 mt-4">
                                                <label htmlFor="username" className="block mb-2 text-sm text-gray-600 ">Tên đăng nhập</label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                                            </div>
                                            <div className="flex justify-between mb-2 gap-4">
                                                <div className="">
                                                    <label htmlFor="first_name" className="block mb-2 text-sm text-gray-600">Họ</label>
                                                    <input
                                                        type="text"
                                                        id="first_name"
                                                        name="first_name"
                                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                        value={formData.first_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                                                </div>
                                                <div className="">
                                                    <label htmlFor="last_name" className="block mb-2 text-sm text-gray-600">Tên</label>
                                                    <input
                                                        type="text"
                                                        id="last_name"
                                                        name="last_name"
                                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                        value={formData.last_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                                                </div>
                                            </div>
                                            <div className="flex justify-between mb-2 gap-4">
                                                <div>
                                                    <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Mật khẩu</label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                                </div>
                                                <div>
                                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-600">Xác nhận mật khẩu</label>
                                                    <input
                                                        type="password"
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                                                </div>
                                            </div>
                                            <div className="mb-6">
                                                <label htmlFor="address" className="block mb-2 text-sm text-gray-600 ">Địa chỉ</label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />
                                                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                                            </div>
                                            <button onClick={handleCreateStudent} type="submit" className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">
                                                Đăng ký
                                            </button>
                                        </form>    
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </div>
  );
}