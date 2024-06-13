import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseById } from '../../services/CourseService/CourseService';
import axios from 'axios';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Menu from '../../components/ContentManager/Menu';

export default function DetailPage() {
   const [course, setCourse] = useState(null)
   const [chapters, setChapters] = useState([]);
   const {courseId} = useParams();
  
  // useEffect(() => {
  //   const fetchChapters = async () => {
  //     const response = await axios.get(`http://localhost:8080/course/${id}/chapters`);
  //     setChapters(response.data);
  //   };
  //   fetchChapters();
  // }, [id]);

    useEffect(()=>{
      getCourseById(courseId)
        .then((res)=>{setCourse(res.data)})
        .catch (console.log("error"))
    }, [courseId])

    useEffect(() => {
      const fetchChaptersTopicsAndLessons = async () => {
          const chaptersResponse = await axios.get(`http://localhost:8080/course/${courseId}/chapters`);
          const chaptersData = chaptersResponse.data;
          
          const chaptersWithTopicsAndLessons = await Promise.all(chaptersData.map(async (chapter) => {
            const topicsResponse = await axios.get(`http://localhost:8080/chapters/${chapter.chapter_id}/topics`);
            const topicsData = topicsResponse.data;
  
            const topicsWithLessons = await Promise.all(topicsData.map(async (topic) => {
              const lessonsResponse = await axios.get(`http://localhost:8080/topics/${topic.topic_id}/lessons`);
              return { ...topic, lessons: lessonsResponse.data };
            }));
  
            return { ...chapter, topics: topicsWithLessons };
          }));
          
          setChapters(chaptersWithTopicsAndLessons);
      };
  
      fetchChaptersTopicsAndLessons();
    }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
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
                            <img alt="a" className="lg:w-1/2 w-full h-fit object-center rounded border border-gray-200" src={`/assets/Class/${course.image}`} />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{course.title}</h1>
                                <div className="flex mb-4">
                                <span className="flex items-center">
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
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                    <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                    </a>
                                    <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                    </a>
                                    <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                    </svg>
                                    </a>
                                </span>
                                </div>
                                <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn.</p>
                                <div className="flex mt-10">
                                    <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                                    <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Button</button>
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
