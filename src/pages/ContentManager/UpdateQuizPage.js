import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import api from "../../config/axios";
import Menu from "../../components/ContentManager/Menu";
import {toast} from "react-toastify";

function UpdateQuizPage() {
    const { topicId } = useParams();
    const [topic, setTopic] = useState({});
    const [quizs, setQuizs] = useState([]);
    const [questionContent, setQuestionContent] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [editableIndex, setEditableIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;
    const [loadingTopic, setLoadingTopic] = useState(null);

    useEffect(() => {
        if (topicId) {
            getAllQuestion(topicId);
            getTopicById(topicId);
        }
    }, [topicId]);

    const getAllQuestion = async (topicId) => {
        const resQuizs = await api.get(`/questions/topic/${topicId}`);
        setQuizs(resQuizs.data.data);
    };

    const getTopicById = async (topicId) => {
        const resTopic = await api.get(`/topic/${topicId}`);
        setTopic(resTopic.data.data);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate correctAnswer is one of the options
        if (!options.includes(correctAnswer)) {
            alert('Correct answer must be one of the provided options.');
            return;
        }
        const questionData = {
            content: questionContent,
            option: options,
            correctAnswer: correctAnswer,
        };
        try {
            const response = await api.post(`/questions/${topicId}`, questionData);
            console.log('Question created:', response.data.data);
            toast.success('Tạo câu hỏi thành công');
            getAllQuestion(topicId);
            // Clear the form fields after submission
            setQuestionContent('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
        } catch (error) {
            console.error('Error creating question:', error);
            // Handle error: show error message
        }
    };

    const handleUpdateClick = (index) => {
        setEditableIndex(index);
    };

    const handleSaveClick = async (index) => {
        const updatedQuiz = quizs[index];
        try {
            const response = await api.put(`/questions/${updatedQuiz.question_id}`, updatedQuiz);
            console.log('Question updated:', response.data.data);
            toast.success('Cập nhật câu hỏi thành công');
            setEditableIndex(null);
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const handleQuizChange = (index, field, value) => {
        const newQuizs = [...quizs];
        newQuizs[index][field] = value;
        setQuizs(newQuizs);
    };

    const handleDeleteClick = async (questionId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
            try {
                await api.delete(`/questions/${questionId}`);
                console.log('questionId delete', questionId)
                toast.success('Xóa câu hỏi thành công');
                getAllQuestion(topicId);
            } catch (error) {
                console.error('Error deleting question:', error);
                toast.error('Xóa câu hỏi thất bại');
            }
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = quizs.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(quizs.length / questionsPerPage); i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`p-2 ${currentPage === i ? 'bg-blue-500 text-white rounded-lg mx-1' : 'bg-white text-blue-500 rounded-lg mx-1'}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    const downloadTemplate = (url) => {
        const fileName = url.split('/').pop()
        const aTag = document.createElement('a');
        aTag.href = url
        aTag.setAttribute('download', fileName);
        document.body.appendChild(aTag);
        aTag.click();
    }

    const importFile = async (topicId) => {
        setLoadingTopic(topicId);
        // Create a file input element programmatically
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xlsx,.xls'; // Accept Excel files
        fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                try {
                    await api.post(`/questions/upload/${topicId}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    toast.success("Nhập dữ liệu thành công!");
                    getAllQuestion(topicId);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    toast.error("Error occurred while importing file");
                } finally {
                    // Reset the loading state
                    setLoadingTopic(null);
                }
            }
        };

        // Trigger the file input dialog
        fileInput.click();
    };

    const exportToExcel = async (topicId) => {
        try {
            const response = await api.get(`/questions/export/${topicId}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Question_Topic-${topicId}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting file:', error);
            toast.error("Error occurred while exporting file");
        }
    };
    return (
        <div className="antialiased bg-orange-50 w-full min-h-screen text-black relative py-4">
            <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
                {/* Menu */}
                <Menu />
                {/* Content */}
                <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
                    <section className="text-gray-700 body-font overflow-hidden bg-orange-50">
                        <div className="mx-auto">
                            <div>
                                <div className={'text-5xl font-bold text-center my-8'}>Chủ đề: {topic.title}</div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border-y border-gray-100 bg-gray-50/50 p-2">STT</th>
                                            <th className="border-y border-gray-100 bg-gray-50/50 p-2">Câu hỏi</th>
                                            <th className="border-y border-gray-100 bg-gray-50/50 py-2">Lựa chọn</th>
                                            <th className="border-y border-gray-100 bg-gray-50/50 p-2">Đáp án</th>
                                            <th className="border-y border-gray-100 bg-gray-50/50 p-2"></th>
                                        </tr>
                                        </thead>
                                        <tbody id="attendees-list">
                                        {currentQuestions.map((quiz, index) => (
                                            <tr key={indexOfFirstQuestion + index}>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {indexOfFirstQuestion + index + 1}
                                                </td>
                                                <td className="border border-gray-300 px-2 py-2">
                                                    {editableIndex === indexOfFirstQuestion + index ? (
                                                        <input
                                                            type="text"
                                                            value={quiz.content}
                                                            onChange={(e) => handleQuizChange(indexOfFirstQuestion + index, 'content', e.target.value)}
                                                            className="p-2 rounded border attendees-count w-72"
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            defaultValue={quiz.content}
                                                            className="p-2 rounded border attendees-count w-72"
                                                            readOnly
                                                        />
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 text-center">
                                                    {quiz.option.map((option, optIndex) => (
                                                        <span key={optIndex}>
                                                            {editableIndex === indexOfFirstQuestion + index ? (
                                                                <input
                                                                    type="text"
                                                                    value={quiz.option[optIndex]}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...quiz.option];
                                                                        newOptions[optIndex] = e.target.value;
                                                                        handleQuizChange(indexOfFirstQuestion + index, 'option', newOptions);
                                                                    }}
                                                                    className="p-1 rounded border attendees-count w-32 m-1"
                                                                />
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    defaultValue={option}
                                                                    className="p-1 rounded border attendees-count w-32 m-1"
                                                                    readOnly
                                                                />
                                                            )}
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {editableIndex === indexOfFirstQuestion + index ? (
                                                        <select
                                                            value={quiz.correctAnswer}
                                                            onChange={(e) => handleQuizChange(indexOfFirstQuestion + index, 'correctAnswer', e.target.value)}
                                                            className="p-2 rounded border bg-white w-28"
                                                        >
                                                            {quiz.option.map((option, optIndex) => (
                                                                <option key={optIndex} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <select
                                                            defaultValue={quiz.correctAnswer}
                                                            className="p-2 rounded border bg-white w-28"
                                                            readOnly
                                                        >
                                                            {quiz.option.map((option, optIndex) => (
                                                                <option key={optIndex} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 px-2 text-center">
                                                    {editableIndex === index ? (
                                                        <button onClick={() => handleSaveClick(index)}
                                                                className="text-green-600 flex gap-1 items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                 stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/>
                                                            </svg>
                                                            Save
                                                        </button>
                                                    ) : (
                                                        <div className={'flex items-center justify-center gap-2'}>
                                                            <button onClick={() => handleUpdateClick(index)}
                                                                    className="text-blue-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                                                     stroke="currentColor"
                                                                     className="size-6 text-blue-400">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(quiz.question_id)}
                                                                className=" text-red-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                                                     stroke="currentColor"
                                                                     className="size-6 text-red-700">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <div className="flex justify-center mt-4">
                                        {renderPageNumbers()}
                                    </div>
                                </div>
                            </div>
                            {/*Create question*/}
                            <span className={'text-3xl font-bold flex justify-center mb-2 mt-8'}>Tạo câu hỏi mới</span>
                            <form onSubmit={handleSubmit} className="container w-2/3 mx-auto flex flex-col space-y-4">
                                <div className="flex flex-col">
                                    <label className="font-bold mb-2">Câu hỏi:</label>
                                    <input
                                        type="text"
                                        value={questionContent}
                                        onChange={(e) => setQuestionContent(e.target.value)}
                                        required
                                        className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="font-bold text-gray-700">Lựa chọn đáp án:</label>
                                    <div className="flex flex-wrap justify-between gap-2">
                                        <div className="flex space-x-4">
                                            {[0, 1, 2, 3].map((index) => (
                                                <div key={index} className="flex items-center space-x-1">
                                                    <label
                                                        className="font-bold text-gray-500">{String.fromCharCode(65 + index)}</label>
                                                    <input
                                                        type="text"
                                                        value={options[index]}
                                                        className="border border-gray-300 rounded-md p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold mb-2">Đáp án:</label>
                                    <select
                                        value={correctAnswer}
                                        onChange={(e) => setCorrectAnswer(e.target.value)}
                                        required
                                        className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Chọn đáp án đúng</option>
                                        {options.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit"
                                        className="bg-mathcha-green text-white font-bold py-2 px-4 rounded-md hover:bg-mathcha-orange">
                                    Tạo câu hỏi
                                </button>
                            </form>
                        </div>
                        {/*Excel*/}
                        <div className={'flex justify-between mt-14'}>
                            <div>
                                <button
                                    className={'bg-mathcha-orange m-1 ml-4 py-1 px-3 rounded-xl font-medium text-base text-black hover:bg-black hover:text-white'}
                                    onClick={() => {
                                        downloadTemplate('/assets/QuizTemplate.xlsx')
                                    }}>Tải mẫu câu hỏi
                                </button>
                            </div>
                            <div className={'flex gap-1 m-1'}>
                                <button
                                    className={'flex gap-1 bg-mathcha-orange ml-4 py-1 px-3 rounded-xl font-medium text-base text-black hover:bg-black hover:text-white'}
                                    onClick={() => importFile(topicId)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"/>
                                    </svg>

                                    {loadingTopic === topicId ? "Importing..." : "Nhập từ Excel"}
                                </button>
                                <button
                                    className={'flex gap-1 bg-mathcha-orange ml-4 py-1 px-3 rounded-xl font-medium text-base text-black hover:bg-black hover:text-white'}
                                    onClick={() => exportToExcel(topicId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                                    </svg>
                                    Xuất ra Excel
                                </button>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default UpdateQuizPage;