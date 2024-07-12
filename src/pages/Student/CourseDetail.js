import { Link, useParams } from "react-router-dom";
import { MenuLearning } from "../../components/Student/MenuLearning";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [numChapters, setNumChapters] = useState(0);
  const [numTopics, setNumTopics] = useState(0);
  const [numLessons, setNumLessons] = useState(0);

  // Get Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/course/${courseId}`);
        setCourse(response.data.data);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };
    fetchCourse();
  }, [courseId]);

  // Get Chapters, Topics, and Lessons
  useEffect(() => {
    const fetchData = async () => {
      try {
        const chaptersResponse = await api.get(`/chapter/course/${courseId}`);
        const chapters = chaptersResponse.data.data;
        setNumChapters(chapters.length);

        let totalTopics = 0;
        let totalLessons = 0;

        for (const chapter of chapters) {
          const topicsResponse = await api.get(`/topic/chapter/${chapter.chapter_id}`);
          const topics = topicsResponse.data.data;
          totalTopics += topics.length;

          for (const topic of topics) {
            const lessonsResponse = await api.get(`/lessons/topic/${topic.topic_id}`);
            const lessons = lessonsResponse.data.data;
            totalLessons += lessons.length;
          }
        }
        setNumTopics(totalTopics);
        setNumLessons(totalLessons);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [courseId]);

  return (
      <div className="bg-mathcha min-h-screen">
        {/* Navbar */}
        <div className="bg-orange-100 text-blue-800 px-10 z-10 w-full">
          <div className="flex items-center justify-between text-5x1">
            <div className="">
              <Link to={"/learning"}>
                <img src="/assets/Logo-removebg.png" width={150} alt="a" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-[5px] border-mathcha-orange w-full"></div>

        {/* Main */}
        <div className="flex flex-row py-12 px-10">
          {/* Menu */}
          <div className="w-3/12 mr-10">
            <div className="w-full">
              <MenuLearning />
              <div className={"flex items-center justify-start my-7"}>
                <Link
                    className={
                      "flex text-lg gap-1 py-1 px-2 rounded-xl bg-pink-300 font-medium border-2 border-black"
                    }
                    to={`/learning`}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                  </svg>
                  Trang chủ
                </Link>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="w-9/12">
            <div className="bg-no-repeat bg-blue-50 border-4 border-black rounded-xl w-full h-120 py-3 px-3 flex flex-col items-center justify-center">
              {/* Detail */}
              <div className="flex flex-col items-center">
                <p className="text-7xl text-indigo-900 text-center mb-10 mt-3">
                  <strong>{course.title}</strong>
                </p>
                <div className={'flex justify-evenly'}>
                  <div className={'w-1/2 flex justify-center items-center'}>
                    <img
                        src={course.image}
                        alt="Loading..."
                        className="rounded-3xl "
                        style={{objectFit: "cover", width: "470px", height: "400px"}}
                    />
                  </div>
                  <div className={'rounded-3xl w-1/2 max-w-[700px]'}>
                    <strong className={'text-lg'}>Mô tả chi tiết:</strong>
                    <p>    Thông qua các bài giảng sinh động, bài tập thực hành phong phú và các hoạt động tương tác, học sinh sẽ được khơi gợi niềm đam mê học toán, rèn luyện tư duy logic và phát triển kỹ năng giải quyết vấn đề</p>
                    <div className={'my-5'}></div>
                    <strong className={'text-lg mt-3'}>Kiến thức nắm được:</strong>
                    <ul className={'ml-4'}>
                       <li>-<strong>Số học cơ bản</strong>Hiểu và thực hiện các phép tính cộng, trừ, nhân, chia; làm quen với các số nguyên, phân số và số thập phân.</li>
                       <li>-<strong>Hình học</strong>Nhận biết và mô tả các hình dạng cơ bản như hình vuông, hình chữ nhật, hình tròn, hình tam giác; hiểu về chu vi, diện tích và thể tích.</li>
                       <li>-<strong>Đo lường</strong>Biết cách đo lường độ dài, khối lượng, thể tích và thời gian bằng các đơn vị đo lường khác nhau.</li>
                       <li>-<strong>Đại số cơ bản</strong>Làm quen với các khái niệm đại số đơn giản như biểu thức, phương trình và bất đẳng thức.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={"flex items-center justify-between gap-16 text-3xl mt-10"}>
              <div className={'flex flex-col items-center justify-center p-2 rounded-xl bg-pink-100'}>
                <div>Tổng số chương</div>
                <strong className={'text-center'}>{numChapters}</strong>
                </div>
                <div className={'flex flex-col items-center justify-center p-2 rounded-xl bg-green-100'}>
                  <div>Tổng số chủ đề</div>
                  <strong className={'text-center'}>{numTopics}</strong>
                </div>
                <div className={'flex flex-col items-center justify-center p-2 rounded-xl bg-orange-100'}>
                  <div>Tổng số bài học</div>
                  <strong className={'text-center'}>{numLessons}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
