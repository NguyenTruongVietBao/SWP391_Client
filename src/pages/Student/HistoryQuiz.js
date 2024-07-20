import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/features/counterSlice";
import {Link} from "react-router-dom";
import api from "../../config/axios";
import Menu from "../../components/Student/Menu";

function HistoryQuiz(props) {
    const user = useSelector(selectUser);
    const studentId = user.user_id;
    const [courses, setCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizResults, setQuizResults] = useState([]);

    useEffect(() => {
        api.get(`/student/${studentId}/courses`)
            .then((res) => {
                setCourses(res.data.data);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, [studentId]);

    useEffect(() => {
        const fetchCompletedCourses = async () => {
            const completed = [];
            for (const course of courses) {
                try {
                    const enrollmentRes = await api.get(`/enrollment/student/${studentId}/course/${course.course_id}`);
                    const enrollmentId = enrollmentRes.data.data[0]?.enrollment_id;
                    console.log('enrollmentId',enrollmentId)
                    if (enrollmentId) {
                        const statusRes = await api.get(`/completeCourse/status/${enrollmentId}/${course.course_id}`);
                        if (statusRes.data.data === true) {
                            completed.push(course);
                        }
                    }
                } catch (error) {
                    console.error(`Error fetching completion status for course ${course.course_id}:`, error);
                }
            }

            setCompletedCourses(completed);
        };

        if (courses.length > 0) {
            fetchCompletedCourses();
        }
    }, [courses, studentId]);

    const handleDetailClick = async (courseId) => {
        try {
            const enrollmentRes = await api.get(`/enrollment/student/${studentId}/course/${courseId}`);
            const enrollmentId = enrollmentRes.data.data[0]?.enrollment_id;
            console.log('enrollmentId',enrollmentId)
            if (enrollmentId) {
                const resultsRes = await api.get(`/quiz/results/${enrollmentId}`);
                setQuizResults(resultsRes.data.data);
                setIsModalOpen(true);
                console.log('quizResults',quizResults)
            }
        } catch (error) {
            console.error('Error fetching quiz results:', error);
        }
    };
    const Modal = ({ isOpen, onClose, children }) => {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-5 rounded relative">
                    <button className="absolute top-0 right-0 m-2" onClick={onClose}>
                        Đóng
                    </button>
                    {children}
                </div>
            </div>
        );
    };
    return (
        <div className="bg-cover min-h-screen" style={{ backgroundImage: 'url("/assets/wallpaper-learning-student.png")' }}>
            {/* Navbar */}
            <div className="bg-orange-100 text-blue-800 px-10 z-10 w-full">
                <div className="flex items-center justify-between text-5x1">
                    <div>
                        <Link to={'/learning'}>
                            <img src="/assets/Logo-removebg.png" width={150} alt="a" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="border-[5px] border-mathcha-orange w-full"></div>
            {/* Main */}
            <div className="flex flex-row py-12 px-10">
                {/* Menu */}
                <Menu />
                {/* Body */}
                <div className="w-10/12">
                    <div className="w-full">
                        {/* List course student */}
                        <div
                            className="bg-no-repeat bg-blue-100 border-4 border-black rounded-xl h-120 py-3 flex flex-col items-center justify-center gap-5">
                            <h1 className={'text-5xl font-bold '}>Lịch sử làm bài</h1>

                            <div className="grid grid-cols-3 gap-10">
                            {/* List course student */}
                            {completedCourses.map(course => (
                                <div key={course.course_id}
                                     className="bg-no-repeat bg-pink-100 px-2 border-4 border-black rounded-xl h-120 py-3 flex flex-col items-center justify-center gap-5">
                                    <img
                                        src={course.image}
                                        alt="img not found"
                                        className="rounded-3xl"
                                        width="306"
                                        height="264"
                                        style={{objectFit: 'cover', width: '306px', height: '264px'}}
                                    />
                                    <p className="text-5xl text-indigo-900"><strong>{course.title}</strong></p>

                                    <button
                                        className="bg-orange-300 text-xl text-white rounded-full px-8 py-2 border-2 border-black"
                                        onClick={() => handleDetailClick(course.course_id)}>Xem chi tiết
                                    </button>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>

                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">Kết quả</h2>
                {/*{quizResults.map((result) => (*/}
                {/*    <div key={result.quizResult_id}>*/}
                {/*        <div>Id: {result.quizResult_id}</div>*/}
                {/*        <div>Điểm: {result.score}</div>*/}
                {/*        <div>Thời gian: {new Date(result.date).toLocaleString()}</div>*/}
                {/*    </div>*/}
                {/*))}*/}
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gradient-to-br from-black/80 via-black/50 to-black/70">
                    <tr>
                        <th className="text-center py-3 pl-2 pr-4 rounded-l-lg">ID</th>
                        <th className="text-center py-3 px-3">Bài học</th>
                        <th className="text-center py-3 px-3">Số điểm</th>
                        <th className="text-center py-3 px-5 rounded-r-lg">Thời gian</th>
                    </tr>
                    </thead>
                    <tbody>
                    {quizResults.map((result) => (
                        <tr key={result.quizResult_id} className="border-b border-gray-700">
                            <td className="py-3 text-center"> {result.quizResult_id}</td>
                            <td className="py-3  pl-4 font-bold">{result.quiz_name}</td>
                            <td className="py-3  pl-4 text-center font-bold">{result.score}.0 đ</td>
                            <td className="py-3 pl-6 mr-2 font-bold">{new Date(result.date).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Modal>
        </div>
    );
}

export default HistoryQuiz;