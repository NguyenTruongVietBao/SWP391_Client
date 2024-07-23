import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseById } from '../../services/CourseService/CourseService';
import axios from 'axios';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Menu from '../../components/ContentManager/Menu';
import Loading from '../../components/Loading/Loading';
import api from '../../config/axios';

export default function DetailPage() {
    const [course, setCourse] = useState(null);
    const [chapters, setChapters] = useState([]);
    const { courseId } = useParams();

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

    if (!course) {
        return <div className='flex flex-col items-center justify-center h-screen'><Loading /></div>;
    }

  return (
     <div className="antialiased bg-orange-50 w-full min-h-screen text-black relative py-4">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
            {/* Menu */}
            <Menu/>
            {/* Content */}
            <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
                <section className="text-gray-700 body-font overflow-hidden bg-orange-50">
                    <div className="container py-6 mx-auto">
                        {/* Top */}
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img
                                src={course.image}
                                alt="img not found"
                                className="rounded-3xl"
                                width="330"
                                height="306"
                                style={{ objectFit: 'cover', width: '340px', height: '306px' }}
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:mt-0">
                                <h1 className="text-gray-900 text-4xl title-font font-medium mb-3">{course.title}</h1>

                                <p className="leading-relaxed">{course.description}</p>
                                <div className="flex justify-between mt-10">
                                    <h1 className="flex justify-start text-2xl font-medium line-through text-black border-0 py-2 focus:outline-none hover:bg-red-00 rounded">
                                        {course.original_price}.000
                                    </h1>
                                    <button
                                        className="flex justify-start text-2xl font-bold text-white bg-red-600 border-0 py-2 px-4 focus:outline-none hover:bg-red-00 rounded">$ {course.discount_price}.000
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bot */}
                        <div className='w-4/5 mx-auto mt-10'>
                            {chapters.map((chapter, index) => (
                                <Disclosure
                                    key={index}
                                    as="div"
                                    className="p-4"
                                    defaultOpen={false}
                                >
                                    {/* Chapter */}
                                    <DisclosureButton className="group flex w-full items-center justify-between">
                                    <span className="text-2xl font-medium text-black group-data-[hover]:text-black/80">
                                        {index+1}. {chapter.title}
                                    </span>
                                    <ChevronDownIcon className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
                                    </DisclosureButton>

                                    <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
                                    {chapter.topics.map((topic, topicIndex) => (
                                        <Disclosure
                                        key={topicIndex}
                                        as="div"
                                        className="px-6 mb-2"
                                        >
                                        {/* Topic */}
                                            <DisclosureButton className="group flex w-full items-center justify-between">
                                                <div className={'flex items-center mt-2'}>
                                                      <span className="text-lg font-medium text-black group-hover:text-black/80">
                                                        {topicIndex + 1}. {topic.title}
                                                      </span>
                                                    <Link
                                                        className={'flex items-center bg-mathcha-orange ml-4 py-1 px-3 rounded-xl font-medium text-base text-black hover:bg-black hover:text-white gap-2'}
                                                        to={`/content-manager/display-quiz/${topic.topic_id}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                             strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                                                        </svg>
                                                        Câu hỏi
                                                    </Link>
                                                </div>
                                                <ChevronDownIcon
                                                    className="size-5 fill-black/60 group-hover:fill-black/50  group-data-[open]:rotate-180"/>
                                            </DisclosureButton>
                                        {/* Lessons */}
                                        {topic.lessons && topic.lessons.map((lesson, lessonIndex) => (                           
                                            <DisclosurePanel key={lessonIndex} className="flex items-center justify-between mb-3 mt-1 ml-6 text-sm/5 text-black/70">
                                                <div>
                                                    <span className="text-base">
                                                        <ul>
                                                            <li className={'font-medium'}> - {lesson.title}</li>
                                                            <li className={'ml-3'}>+ <a href={`https://www.youtube.com/embed/${lesson.video_url}`}>Video bài giảng</a></li>
                                                            <li className={'ml-3'}>+ <a href={lesson.document}>Tài liệu</a></li>
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
                </section>
            </div>
        </div>
    </div>
  )
}
