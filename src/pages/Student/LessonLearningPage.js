import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../config/axios";
import {toast} from "react-toastify";
import MenuLesson from "../../components/Student/MenuLesson";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/features/counterSlice";

export const LessonLearningPage = () => {
    const { lessonId, courseId, topicId } = useParams();
    const [lesson, setLesson] = useState({});
    const user = useSelector(selectUser);
    const studentId = user.user_id;
    const [enrollmentId, setEnrollmentId] = useState(null);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await api.get(`/lessons/${lessonId}`);
                setLesson(response.data.data);
            } catch (error) {
                console.error('Failed to fetch lesson:', error);
            }
        };
        if (lessonId) {
            fetchLesson();
        }
    }, [lessonId]);

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

    const handleFinishLesson =  () => {
        try {
            api.post(`/completeLesson/create/${enrollmentId}/${lessonId}`);
            toast.success('Học thành công');
            // window.location.reload();
        } catch (error) {
            console.error('Failed to finish lesson:', error);
            toast.error('Có lỗi xảy ra khi hoàn thành khóa học');
        }
    };
    console.log('studentId',user.user_id)
    return (
        <div className="bg-mathcha min-h-screen">
            {/* Navbar */}
            <div className=" bg-orange-100 text-blue-800 px-10 z-10 w-full">
                <div className="flex items-center justify-between text-5x1">
                    <div className="">
                        <Link to={'/learning'}>
                            <img src="/assets/Logo-removebg.png" width={150} alt="a"/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className=" border-[5px] border-mathcha-orange w-full "></div>
            {/* Main */}
            <div className="flex flex-row py-12 px-10">
                {/* Menu */}
                <div className="w-3/12 mr-10">
                    <div className="w-full">
                        <MenuLesson/>
                        <div className={'flex items-center justify-start my-7'}>
                            <Link
                                className={'flex text-lg gap-1 py-1 px-2 rounded-xl bg-pink-300 font-medium border-2 border-black'}
                                to={`/learning/course/${courseId}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
                                </svg>
                                Học chủ đề khác
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Body */}
                <div className="w-9/12">
                    <div
                        className="bg-no-repeat bg-blue-50 border-4 border-black rounded-xl w-full h-120 py-3 flex flex-col items-center ">
                        <p className="text-5xl text-indigo-900 text-center mb-6">
                            <strong>{lesson.title}</strong>
                        </p>
                        {lesson.video_url && (
                            <iframe
                                className="item-center"
                                width="918"
                                height="517"
                                src={`https://www.youtube.com/embed/${lesson.video_url}`}
                                title="Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        )}
                        <p className="my-6">
                            <strong>Tài liệu bài giảng: </strong>
                            <span>{lesson.document}</span>
                        </p>
                        <div className="">
                            <button
                                className={'py-1 px-2 rounded-xl bg-blue-500 text-white border-2 border-black flex items-center justify-end gap-2'}
                                onClick={handleFinishLesson}>
                                Hoàn thành bài học
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
};