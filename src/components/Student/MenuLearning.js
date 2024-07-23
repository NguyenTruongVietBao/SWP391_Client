import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

export const MenuLearning = () => {
    const [chapters, setChapters] = useState([]);
    const [topics, setTopics] = useState({});
    const [lessons, setLessons] = useState({});
    const [completedTopics, setCompletedTopics] = useState({});
    const [completedChapters, setCompletedChapters] = useState({});
    const { courseId } = useParams();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const studentId = user.user_id;
    const [enrollmentId, setEnrollmentId] = useState(null);
    const [isCourseComplete, setIsCourseComplete] = useState(false);

    useEffect(() => {
        const fetchEnrollmentId = async () => {
            try {
                const resEnroll = await api.get(`/enrollment/student/${studentId}/course/${courseId}`);
                const enrollmentArray = resEnroll.data.data;
                const fetchedEnrollmentId = enrollmentArray[0]?.enrollment_id;
                setEnrollmentId(fetchedEnrollmentId);
            } catch (error) {
                console.error('Error fetching enrollment ID:', error);
            }
        };
        fetchEnrollmentId();
    }, [studentId, courseId]);

    useEffect(() => {
        const fetchChapters = async () => {
            const chaptersResponse = await api.get(`/chapter/course/${courseId}`);
            setChapters(chaptersResponse.data.data);
        };
        fetchChapters();
    }, [courseId]);

    useEffect(() => {
        const fetchTopics = async () => {
            const topicsData = await Promise.all(
                chapters.map(async (chapter) => {
                    const topicsResponse = await api.get(`/topic/chapter/${chapter.chapter_id}`);
                    return { chapterId: chapter.chapter_id, topics: topicsResponse.data.data };
                })
            );
            setTopics(Object.fromEntries(topicsData.map(({ chapterId, topics }) => [chapterId, topics])));
        };

        if (chapters.length > 0) {
            fetchTopics();
        }
    }, [chapters]);

    useEffect(() => {
        const fetchLessons = async () => {
            const lessonsData = await Promise.all(
                Object.entries(topics).map(async ([chapterId, topicsArray]) => {
                    const topicsWithLessons = await Promise.all(
                        topicsArray.map(async (topic) => {
                            const lessonsResponse = await api.get(`/lessons/topic/${topic.topic_id}`);
                            return { ...topic, lessons: lessonsResponse.data.data };
                        })
                    );
                    return { chapterId, topics: topicsWithLessons };
                })
            );
            setLessons(Object.fromEntries(lessonsData.map(({ chapterId, topics }) => [chapterId, topics])));
        };
        if (Object.keys(topics).length > 0) {
            fetchLessons();
        }
    }, [topics]);

    useEffect(() => {
        const fetchCompletedTopics = async () => {
            const completedTopicsData = await Promise.all(
                Object.values(topics).flat().map(async (topic) => {
                    const response = await api.get(`/completeTopic/status/${enrollmentId}/${topic.topic_id}`);
                    return { topicId: topic.topic_id, isComplete: response.data.data };
                })
            );
            setCompletedTopics(Object.fromEntries(completedTopicsData.map(({ topicId, isComplete }) => [topicId, isComplete])));
        };
        if (Object.keys(topics).length > 0) {
            fetchCompletedTopics();
        }
    }, [topics]);

    useEffect(() => {
        const fetchCompletedChapters = async () => {
            const completedChaptersData = await Promise.all(
                chapters.map(async (chapter) => {
                    const response = await api.get(`/completeChapter/status/${enrollmentId}/${chapter.chapter_id}`);
                    return { chapterId: chapter.chapter_id, isComplete: response.data.data };
                })
            );
            setCompletedChapters(Object.fromEntries(completedChaptersData.map(({ chapterId, isComplete }) => [chapterId, isComplete])));
        };

        if (chapters.length > 0) {
            fetchCompletedChapters();
        }
    }, [chapters]);

    useEffect(() => {
        const fetchCourseCompletionStatus = async () => {
            if (enrollmentId) {
                try {
                    const response = await api.get(`/completeCourse/status/${enrollmentId}/${courseId}`);
                    setIsCourseComplete(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch course completion status:', error);
                }
            }
        };
        fetchCourseCompletionStatus();
    }, [enrollmentId, courseId]);

    const isChapterCompleted = (chapterId) => {
        const chapterTopics = topics[chapterId];
        if (!chapterTopics) return false;
        return chapterTopics.every(topic => completedTopics[topic.topic_id]);
    };

    const isCourseCompleted = () => {
        return chapters.every(chapter => completedChapters[chapter.chapter_id]);
    };

    const handleTakeQuizChapter = async (chapterId) => {
        try {
            const response = await api.post(`/quiz/chapter/${chapterId}/generate`, {
                "numberOfQuestions": 10,
                "timeLimit": 15
            });
            const quizData = response.data.data;
            navigate(`/learning/course/${courseId}/chapter/${chapterId}/quiz`, { state: { quizData } });
        } catch (error) {
            console.error('Failed to create quiz:', error);
        }
    };

    const handleTakeQuizCourse = async () => {
        try {
            const response = await api.post(`/quiz/course/${courseId}/generate`, {
                "numberOfQuestions": 10,
                "timeLimit": 15
            });
            const quizData = response.data.data;
            navigate(`/learning/course/${courseId}/quiz`, { state: { quizData } });
        } catch (error) {
            console.error('Failed to create course quiz:', error);
        }
    };

    return (
        <div className="mx-auto w-full divide-y divide-black/5 rounded-xl bg-yellow-100 border-4 border-black">
            {chapters.map((chapter, index) => (
                <Disclosure key={index} as="div" className="p-3" defaultOpen={false}>
                    <Disclosure.Button className="group flex w-full items-center justify-between p-2 rounded-xl">
                        <Link to={'./'} className="text-xl font-medium text-black group-hover:text-black/80">
                            {index + 1}. {chapter.title}
                        </Link>
                        <div className="flex gap-3">
                            {completedChapters[chapter.chapter_id] && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor"
                                     className="size-5 bg-mathcha-green rounded-full text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            )}
                            <ChevronDownIcon
                                className="size-5 fill-black/60 group-hover:fill-black/50 group-data-[open]:rotate-180"/>
                        </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className="ml-4 mb-1 text-sm text-black/50 p-1 py-2 rounded-lg bg-white/55">
                        {lessons[chapter.chapter_id]?.map((topic, topicIndex) => (
                            <Disclosure key={topicIndex} as="div" className="px-2 my-3">
                                <Disclosure.Button
                                    className="group flex w-full justify-between items-center"
                                    onClick={() => {
                                        if (topic.lessons && topic.lessons.length > 0) {
                                            const firstLessonId = topic.lessons[0].lesson_id;
                                            navigate(`/learning/course/${courseId}/topic/${topic.topic_id}/lesson/${firstLessonId}`);
                                        }
                                    }}
                                >
                                  <span className="text-base font-medium text-black group-hover:text-black/80">
                                    {topicIndex + 1}. {topic.title}
                                  </span>
                                    {completedTopics[topic.topic_id] && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="size-5 bg-mathcha-green rounded-full text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    )}

                                </Disclosure.Button>
                            </Disclosure>
                        ))}
                        {isChapterCompleted(chapter.chapter_id) && !completedChapters[chapter.chapter_id] &&  (
                            <button
                                onClick={() => handleTakeQuizChapter(chapter.chapter_id)}
                                className="inline-block px-4 py-2 bg-mathcha-green font-bold text-white rounded-md my-2"
                            >
                                Kiểm tra
                            </button>
                        )}
                        {isChapterCompleted(chapter.chapter_id) && completedChapters[chapter.chapter_id] && (
                            <div className={'flex gap-4 ml-1 items-center'}>
                                <button
                                    onClick={() => handleTakeQuizChapter(chapter.chapter_id)}
                                    className="inline-block px-4 py-2 bg-blue-400 font-bold text-white rounded-md my-2 hover:bg-mathcha-green"
                                >
                                    Kiểm tra lại
                                </button>
                                <span
                                    className="font-bold text-base text-mathcha-green">
                                    Đã hoàn thành
                                </span>
                            </div>
                        )}
                    </Disclosure.Panel>
                </Disclosure>
            ))}
            {isCourseCompleted() && !isCourseComplete &&(
                <div className="p-3">
                <button
                        onClick={handleTakeQuizCourse}
                        className="w-full px-4 py-2 bg-mathcha-green font-bold text-white rounded-md hover:bg-blue-400"
                    >
                        Kiểm tra tổng
                    </button>
                </div>
            )}
            {isCourseCompleted() && isCourseComplete && (
                <div className={'px-4 flex flex-col gap-4 ml-1 items-center'}>
                    <button
                        onClick={handleTakeQuizCourse}
                        className="border-2 border-black bg-blue-400 w-full px-4 py-2 hover:bg-mathcha-green font-bold text-white rounded-md hover:bg-blue-400"
                    >
                        Kiểm tra lại
                    </button>
                    <span
                        className="text-center w-full py-4 border border-1 mb-3 font-bold text-base bg-white/90 p-2 text-black rounded-xl">
                        <span>🎊️🎉 <strong>Chúc mừng bạn đã hoàn thành khóa học ️</strong></span>
                    </span>
                </div>
            )}
        </div>
    );
};
