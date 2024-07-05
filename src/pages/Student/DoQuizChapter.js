import React, { useState, useEffect } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import api from "../../config/axios";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/features/counterSlice";
import {toast} from "react-toastify";

const DoQuizChapter = () => {
    const location = useLocation();
    const {chapterId, courseId} = useParams();
    const user = useSelector(selectUser);
    const { quizData } = location.state;
    const [answers, setAnswers] = useState(Array(quizData.questions.length).fill(null));
    const [score, setScore] = useState(null);
    const studentId= user.user_id;
    const [enrollmentId, setEnrollmentId] = useState(null);

    //get answer
    const handleAnswerChange = (questionIndex, option) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = option;
        setAnswers(newAnswers);
    };
    console.log(answers)

    //get enrollment_id
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
    console.log(enrollmentId)

    //handle submit
    const handleSubmit = async () => {
        let newScore = 0;
        try {
            quizData.questions.forEach((question, index) => {
                if (question.correctAnswer === answers[index]) {
                    newScore += 1;
                }
            });
            setScore(newScore);
            console.log('newScore',score)
            if(newScore >= 0){
                const res = await api.post(`/completeChapter/create/${enrollmentId}/${chapterId}`);
                console.log('create topic data',res.data.data)
                toast.success('Hoàn thành topic');
            }
        }catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Quiz</h1>
            {quizData.questions.map((question, index) => (
                <div key={question.questionId} className="mb-6 border-b-2 pb-4">
                    <h2 className="text-xl font-semibold mb-2">{index + 1}. {question.title}</h2>
                    <p className="mb-2">{question.content}</p>
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
                        Submit Quiz
                    </button>
                </div>
            ) : (
                <div className="text-xl font-semibold mt-4 text-center">
                    Your score: {score} / {quizData.questions.length}
                </div>
            )}
        </div>
    );
};

export default DoQuizChapter;
