import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import api from "../../config/axios";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/features/counterSlice";
import { toast } from 'react-toastify';

const MenuLesson = () => {
    const user = useSelector(selectUser);
    const {topicId, courseId} = useParams();
    const [lessons, setLessons] = useState([]);
    const [topic, setTopic] = useState({});
    const [completedLessons, setCompletedLessons] = useState([]);
    const studentId = user.user_id;
    const navigate = useNavigate();

    useEffect(() => {
        const getListLesson = async () => {
            try {
                // Get list of lessons and the topic
                const responseTopic = await api.get(`/topic/${topicId}`);
                const response = await api.get(`/lessons/topic/${topicId}`);
                setTopic(responseTopic.data.data);
                setLessons(response.data.data);

                // Get enrollmentId
                const resEnroll = await api.get(`/enrollment/student/${studentId}/course/${courseId}`);
                const enrollmentArray = resEnroll.data.data;
                const enrollmentId = enrollmentArray[0].enrollment_id;

                // Get status of each lesson
                const completionStatusPromises = response.data.data.map(async (lesson) => {
                    const statusResponse = await api.get(`/completeLesson/status/${enrollmentId}/${lesson.lesson_id}`);
                    return statusResponse.data.data;
                });

                const completedStatuses = await Promise.all(completionStatusPromises);
                setCompletedLessons(completedStatuses);
            } catch (error) {
                console.error('Failed to fetch lesson:', error);
            }
        };
        getListLesson();
    }, [topicId, studentId, courseId]);


    // Check if all lessons are completed
    const allLessonsCompleted = completedLessons.every(status => status === true);

    // do quiz
    const handleTakeQuizTopic = async () => {
        try {
            const response = await api.post(`/quiz/topic/${topicId}/generate`, {
                "numberOfQuestions": 2,
                "timeLimit": 10
            });
            console.log(response.data.data)
            const quizData = response.data.data;
            navigate(`/learning/course/${courseId}/topic/${topicId}/quiz`, {state: {quizData}});
        } catch (error) {
            console.error('Failed to create quiz:', error);
        }
    };
    console.log(lessons)
    return (
        <div>
            <div className="mx-auto w-full divide-y divide-black/5 rounded-xl bg-yellow-100 border-4 border-black">
                <Disclosure as="div" className="p-3" defaultOpen={true}>
                    {/* Chapter */}
                    <DisclosureButton className="group flex w-full items-center justify-between p-2 rounded-xl">
                        <Link to={'./'} className="text-xl font-medium text-black group-hover:text-black/80">
                            {topic.title}
                        </Link>
                        <ChevronDownIcon
                            className="size-5 fill-black/60 group-hover:fill-black/50 group-data-[open]:rotate-180"/>
                    </DisclosureButton>
                    <DisclosurePanel className="ml-4 text-sm text-black/50 p-2 rounded-lg bg-white/55">
                        <Disclosure as="div" className="px-2 mb-2">
                            {/* Lessons */}
                            {lessons.map((lesson, index) => (
                                <DisclosureButton key={lesson.lesson_id}
                                                  className="group flex w-full justify-between items-center my-4">
                                    <Link
                                        to={`/learning/course/${courseId}/topic/${topicId}/lesson/${lesson.lesson_id}`}
                                        className="text-base font-medium text-black group-hover:text-black/80"
                                    >
                                        {index + 1}. {lesson.title}
                                    </Link>
                                    {completedLessons[index] && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="size-5 bg-mathcha-green rounded-full text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    )}
                                </DisclosureButton>
                            ))}
                        </Disclosure>
                    </DisclosurePanel>
                </Disclosure>
                {allLessonsCompleted ? (
                    <div className="ml-7 mt-4">
                        <button
                            onClick={handleTakeQuizTopic}
                            className="inline-block px-4 py-2 bg-mathcha-green font-bold text-white rounded-md my-2"
                        >
                            Kiểm tra
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="ml-7 mt-4">
                            <button
                                onClick={()=>{toast.error('Bạn cần hoàn thành hết lesson')}}
                                className="inline-block px-4 py-2 bg-gray-600 font-bold text-white rounded-md my-2"
                            >
                                Kiểm tra
                            </button>
                        </div>
                    </>
                )
                }
            </div>
        </div>
    );
};
export default MenuLesson;