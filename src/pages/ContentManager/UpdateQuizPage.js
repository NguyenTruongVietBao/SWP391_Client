import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import api from "../../config/axios";

function UpdateQuizPage() {
    const { topicId } = useParams();
    const [quizs, setQuizs] = useState([]);

    useEffect(() => {
        if (topicId) {
            getAllQuestion(topicId);
        }
    }, [topicId]);

    const getAllQuestion = async (topicId) => {
        try {
            const resCourse = await api.get(`/questions/topic/${topicId}`);
                setQuizs(resCourse.data.data);
        } catch (error) {
            console.error("Failed to fetch questions", error);
        }
    };

    console.log(quizs);

    return (
        <div>
            {
                quizs.map((quiz, index) => (
                    <ul key={index}>
                        <li> Content: {quiz.content}</li>
                        <li>Option: {
                            quiz.option
                        }</li>
                        <li>Answer: {quiz.correctAnswer}</li>
                    </ul>
                ))
            }
        </div>
    );
}

export default UpdateQuizPage;