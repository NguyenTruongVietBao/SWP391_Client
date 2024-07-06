import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import api from "../../config/axios";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/features/counterSlice";
import {toast} from "react-toastify";

const DoQuizChapter = () => {
    const location = useLocation();
    const {chapterId, courseId} = useParams();
    const [chapter, setChapter] = useState({});
    const user = useSelector(selectUser);
    const { quizData } = location.state;
    const [answers, setAnswers] = useState(Array(quizData.questions.length).fill(null));
    const [score, setScore] = useState(null);
    const studentId= user.user_id;
    const [enrollmentId, setEnrollmentId] = useState(null);
    const [retake, setRetake] = useState(false);
    const [timeLeft, setTimeLeft] = useState(quizData.timeLimit * 60); // assuming timeLimit is in minutes
    const timerRef = useRef(null);

    const handleAnswerChange = (questionIndex, option) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = option;
        setAnswers(newAnswers);
    };

    useEffect(() => {
        const fetchEnrollmentId = async () => {
            try {
                const resEnroll = await api.get(`/enrollment/student/${studentId}/course/${courseId}`);
                const resChapter = await api.get(`/chapter/${chapterId}`);
                const enrollmentArray = resEnroll.data.data;
                const fetchedEnrollmentId = enrollmentArray[0]?.enrollment_id;
                setEnrollmentId(fetchedEnrollmentId);
                setChapter(resChapter.data.data)
            } catch (error) {
                console.error('Error fetching enrollment ID:', error);
            }
        };
        fetchEnrollmentId();
    }, [studentId, courseId]);

    useEffect(() => {
        if (timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
            handleSubmit();
        }
        return () => clearInterval(timerRef.current);
    }, [timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSubmit = async () => {
        clearInterval(timerRef.current); // Stop the timer
        let newScore = 0;
        try {
            quizData.questions.forEach((question, index) => {
                if (question.correctAnswer === answers[index]) {
                    newScore += 1;
                }
            });
            setScore(newScore);
            if (newScore >= 5) {
                const res = await api.post(`/completeChapter/create/${enrollmentId}/${chapterId}`);
                console.log('create chapterId data', res.data.data);
                toast.success('Chúc mừng bạn đã hoàn thành chương');
            }
            if (newScore < 5) {

                toast.error('Rớt môn');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleRetake = () => {
        clearInterval(timerRef.current); // Stop any existing timer
        setAnswers(Array(quizData.questions.length).fill(null));
        setScore(null);
        setTimeLeft(quizData.timeLimit * 60);
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
    };

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
                        <div className="mx-auto w-full rounded-xl bg-yellow-100 border-4 border-black">
                            <h1 className="text-4xl my-4 font-bold text-center">BÀI KIỂM TRA </h1>
                            <h1 className="text-2xl my-4 font-bold text-center">Chủ đề: {chapter.title}</h1>
                            <div className="text-center my-4">
                            <span className="font-medium text-lg">
                                Thời gian còn lại: <span
                                className={'border-2 border-black rounded-lg bg-blue-200 px-2 py-1'}>{formatTime(timeLeft)}</span>
                            </span>
                            </div>
                        </div>
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
                                Quay lại bài học
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Body */}
                <div className="w-9/12">
                    <div
                        className="bg-no-repeat bg-blue-50 border-4 border-black rounded-xl w-full h-120 py-3 flex flex-col items-center ">
                        <div className="container mx-auto p-4">
                            {quizData.questions.map((question, index) => (
                                <div key={question.questionId} className="m-10 ml-16 border-b-2 pb-4 ">
                                    <h2 className="text-xl font-semibold mb-2">Câu {index + 1}. {question.content}</h2>
                                    <ul className="space-y-2">
                                        {question.option.map((option, i) => (
                                            <li key={i} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={option}
                                                    checked={answers[index] === option}
                                                    onChange={() => handleAnswerChange(index, option)}
                                                    className="mr-2"
                                                />
                                                <label className="text-base">{option}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            {score === null ? (
                                <div className="text-center mt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Nộp bài
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="text-xl font-semibold mt-4 text-center">
                                        Your score: {score} / {quizData.questions.length}
                                    </div>
                                    {score < 5 && (
                                        <div className="text-center mt-4">
                                            <button
                                                onClick={handleRetake}
                                                className="inline-block px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Làm lại
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
};

export default DoQuizChapter;
