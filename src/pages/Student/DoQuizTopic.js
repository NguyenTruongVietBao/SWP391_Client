import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../config/axios";

function DoQuizTopic(props) {
    const { topicId } = useParams();
    const [quiz, setQuiz] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const fetchQuiz = async () => {
        try {
            const response = await api.post(`/quiz/topic/${topicId}/generate`, {
                "numberOfQuestions": 10,
                "timeLimit": 360
            });
            setQuiz(response.data.data.questions);
        } catch (error) {
            console.error("Error fetching the quiz:", error);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [topicId]);

    const handleOptionChange = (questionIndex, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: option,
        });
    };

    const handleSubmit = () => {
        if (quiz.every((_, index) => selectedAnswers.hasOwnProperty(index))) {
            let score = 0;
            quiz.forEach((question, index) => {
                if (selectedAnswers[index] === question.correctAnswer) {
                    score += 1;
                }
            });
            setScore(score);
            setSubmitted(true);

        } else {
            alert("Please answer all questions before submitting.");
        }
    };
    const handleRedo = () => {
        setSelectedAnswers({});
        setSubmitted(false);
        setScore(0);
        fetchQuiz();
    };
    return (
        <div className="container mx-auto p-4">
            {quiz.length === 0 ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <form
                    className="space-y-6"
                    onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    {quiz.map((question, index) => (
                        <div key={index} className="p-4 bg-white shadow rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">{question.title}</h3>
                            <p className="text-gray-700 mb-4">{question.content}</p>
                            <div className="space-y-2">
                                {question.option.map((option, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            checked={selectedAnswers[index] === option}
                                            onChange={() => handleOptionChange(index, option)}
                                            disabled={submitted}
                                            className="mr-2"
                                        />
                                        <label className="text-gray-700">{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={submitted || quiz.some((_, index) => !selectedAnswers.hasOwnProperty(index))}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition disabled:opacity-50"
                    >
                        Submit
                    </button>
                </form>
            )}
            {submitted && (
                <div className="mt-6 text-center">
                    <h2 className="text-2xl font-bold">Your Score: {score} / {quiz.length}</h2>
                    <button
                        onClick={handleRedo}
                        className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
                    >
                        Làm lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default DoQuizTopic;
