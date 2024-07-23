import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import api from "../../config/axios";
import {getCourseById} from "../../services/CourseService/CourseService";
import Menu from "../../components/Manager/Menu";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import Loading from "../../components/Loading/Loading";
import {toast} from "react-toastify";

export const CourseDetailPage = () => {
    const {courseId} = useParams();
    const [chapters, setChapters] = useState([]);
    const [course, setCourse] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await getCourseById(courseId);
                setCourse(res.data.data);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };
        fetchCourse();
    }, [courseId]);

    useEffect(() => {
        const fetchChaptersTopicsAndLessons = async () => {
            try {
                const chaptersResponse = await api.get(`/chapter/course/${courseId}`);
                const chaptersData = chaptersResponse.data.data;
                // Create an array of promises for fetching topics and lessons
                const chaptersWithTopicsAndLessonsPromises = chaptersData.map(async (chapter) => {
                    const topicsResponse = await api.get(`/topic/chapter/${chapter.chapter_id}`);
                    const topicsData = topicsResponse.data.data;
                    const topicsWithLessonsPromises = topicsData.map(async (topic) => {
                        const lessonsResponse = await api.get(`/lessons/topic/${topic.topic_id}`);
                        return { ...topic, lessons: lessonsResponse.data.data };
                    });
                    const topicsWithLessons = await Promise.all(topicsWithLessonsPromises);
                    return { ...chapter, topics: topicsWithLessons };
                });
                const chaptersWithTopicsAndLessons = await Promise.all(chaptersWithTopicsAndLessonsPromises);
                setChapters(chaptersWithTopicsAndLessons);
            } catch (error) {
                console.error('Error fetching chapters, topics, and lessons:', error);
            }
        };
        fetchChaptersTopicsAndLessons();
    }, [courseId]);

    const handleAccept = async () => {
        await api.put(`/course/${courseId}`, {...course, status: true})
        toast.success('Khóa học đã công khai !')
        navigate('/manager/course')
    };
    const handleReject = async () => {
        await api.put(`/course/${courseId}`, {...course, status: false})
        toast.error('Khóa học đã bị từ chối !')
        navigate('/manager/course')
    };

    if (!course) {
        return <div className='flex flex-col items-center justify-center h-screen'><Loading /></div>;
    }
    return (
        <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                <Menu/>
                <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                    <section className="text-gray-700 body-font overflow-hidden bg-orange-50">
                        <div className="container py-6 mx-auto">
                            {/* Top */}
                            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                <img
                                    src={course.image}
                                    alt="img not found"
                                    className="rounded-3xl"
                                    width="306"
                                    height="306"
                                    style={{objectFit: 'cover', width: '306px', height: '306px'}}
                                />
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:mt-0">
                                    <h1 className="text-gray-900 text-4xl title-font font-bold mb-5">{course.title}</h1>
                                    <p className="leading-relaxed">
                                        <strong>Mô tả: </strong>
                                        {course.description}
                                    </p>
                                    <div className="flex justify-between mt-10">
                                        <span
                                            className="flex justify-start text-2xl line-through font-bold py-2 px-4 focus:outline-none hover:bg-red-00 rounded">$ {course.original_price}.000
                                        </span>
                                        <span
                                            className="flex justify-start text-2xl font-bold text-white bg-red-600 border-0 py-2 px-4 focus:outline-none hover:bg-red-00 rounded">$ {course.discount_price}.000
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Bot */}
                            <div className='w-4/5 mx-auto mt-10'>
                                {chapters.map((chapter, index) => (
                                    <Disclosure
                                        key={index}
                                        as="div"
                                        className="p-6"
                                        defaultOpen={true}
                                    >
                                        {/* Chapter */}
                                        <DisclosureButton className="group flex w-full items-center justify-between">
                                    <span className="text-2xl font-medium text-black group-data-[hover]:text-black/80">
                                        {chapter.title}
                                    </span>
                                            <ChevronDownIcon
                                                className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180"/>
                                        </DisclosureButton>

                                        <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
                                            {chapter.topics.map((topic, topicIndex) => (
                                                <Disclosure
                                                    key={topicIndex}
                                                    as="div"
                                                    className="px-6 mb-2"
                                                >
                                                    {/* Topic */}
                                                    <DisclosureButton
                                                        className="group flex w-full items-center justify-between">
                                                        <span
                                                            className="text-lg font-medium mt-2 text-black group-data-[hover]:text-black/80">
                                                        {topicIndex + 1}. {topic.title}
                                                        </span>
                                                        <ChevronDownIcon
                                                            className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180"/>
                                                    </DisclosureButton>
                                                    {/* Lessons */}
                                                    {topic.lessons && topic.lessons.map((lesson, lessonIndex) => (
                                                        <DisclosurePanel key={lessonIndex}
                                                                         className="flex items-center justify-between gap-5 mt-3 mb-5 ml-6 text-sm/5 text-black/70">
                                                            <div>
                                                <span className="text-base">
                                                    <ul>
                                                    <li> - {lesson.title}</li>
                                                    <li>+ <a href={lesson.video_url}>Video_URL</a></li>
                                                    <li>+ <a href={lesson.document}>Document_URL</a></li>
                                                    </ul>
                                                </span>
                                                            </div>
                                                            <div>
                                                            </div>
                                                        </DisclosurePanel>
                                                    ))}
                                                </Disclosure>
                                            ))}
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </div>
                            <div className={'mt-10 mr-2 flex justify-end items-center gap-5'}>
                                <button onClick={handleAccept} className={'border-2 border-black rounded-xl py-2 px-4 bg-mathcha-green text-lg font-medium text-white'}>Duyệt</button>
                                <button onClick={handleReject} className={'border-2 border-black rounded-xl py-2 px-4 bg-red-500 text-lg font-medium text-white'}>Từ chối</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
