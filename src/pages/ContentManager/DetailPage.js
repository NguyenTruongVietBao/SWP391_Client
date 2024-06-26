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
   const [course, setCourse] = useState(null)
   const [chapters, setChapters] = useState([]);
   const {courseId} = useParams();

  useEffect(()=>{
    getCourseById(courseId)
      .then((res)=>{setCourse(res.data.data)})
      .catch (console.log("error"))
  }, [courseId])

  useEffect(() => {
    const fetchChaptersTopicsAndLessons = async () => {
        const chaptersResponse = await api.get(`/chapter/course/${courseId}`);
        const chaptersData = chaptersResponse.data.data;
        
        const chaptersWithTopicsAndLessons = await Promise.all(chaptersData.map(async (chapter) => {
          const topicsResponse = await api.get(`/topic/chapter/${chapter.chapter_id}`);
          const topicsData = topicsResponse.data.data;

          const topicsWithLessons = await Promise.all(topicsData.map(async (topic) => {
            const lessonsResponse = await api.get(`/lessons/topic/${topic.topic_id}`);
            return { ...topic, lessons: lessonsResponse.data.data };
          }));

          return { ...chapter
            , topics: topicsWithLessons 
          };
        }));
        
        setChapters(chaptersWithTopicsAndLessons);
    };
    fetchChaptersTopicsAndLessons();
  }, [courseId]);

  if (!course) {
    return <div className='flex flex-col items-center justify-center h-screen'><Loading/></div>;
  }
  if (!chapters) {
    return <div className='flex flex-col items-center justify-center h-screen'><Loading/></div>;
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
                            <img alt="a" className="lg:w-1/2 w-full h-fit object-center rounded border border-gray-200" src={`/assets/Class/${course.image}.png`} />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:mt-0">
                                <h1 className="text-gray-900 text-4xl title-font font-medium mb-3">{course.title}</h1>
                                <div className="flex mb-4">
                                <span className="flex items-center">
                                    <b className='mr-2'>Level: </b>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </span>
                                
                                </div>
                                <p className="leading-relaxed">{course.description}</p>
                                <div className="flex mt-10">
                                    <button className="flex justify-start text-2xl font-bold text-white bg-red-600 border-0 py-2 px-4 focus:outline-none hover:bg-red-00 rounded">$ {course.discount_price}.000</button>
                                </div>
                            </div>
                        </div>
                        {/* Bot */}
                        <div className='w-4/5 mx-auto'>
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
                                            <span className="text-lg font-medium mt-2 text-black group-data-[hover]:text-black/80">
                                            {topicIndex+1}. {topic.title}
                                            </span>
                                            <ChevronDownIcon className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
                                        </DisclosureButton>
                                        {/* Lessons */}
                                        {topic.lessons && topic.lessons.map((lesson, lessonIndex) => (                           
                                            <DisclosurePanel key={lessonIndex} className="flex items-center justify-between gap-5 mt-3 mb-5 ml-6 text-sm/5 text-black/70">
                                                <div>
                                                <span className="text-base">
                                                    <ul>
                                                    <li> - {lesson.title}</li>
                                                    <li>+ Num of lesson: {lesson.number}</li>
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
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}
