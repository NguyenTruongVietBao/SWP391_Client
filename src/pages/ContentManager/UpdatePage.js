import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseById } from '../../services/CourseService/CourseService';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Menu from '../../components/ContentManager/Menu';
import Loading from '../../components/Loading/Loading';
import api from '../../config/axios';
import { toast } from 'react-toastify';

export default function UpdatePage() {
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState({});
  const [newLesson, setNewLesson] = useState({});
  const {courseId} = useParams();
  const [editValues, setEditValues] = useState({});
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
    original_price: false,
    discount_price: false
  });

  // Get Detail course
  useEffect(() => {
    api.get(`/course/${courseId}`)
      .then(res => {
        setCourse(res.data.data);
        setEditValues({
          title: res.data.data.title,
          description: res.data.data.description,
          original_price: res.data.data.original_price,
          discount_price: res.data.data.discount_price
        });
      })
      .catch(console.error);
  }, [courseId]);

  // Get All list Chapter Topic Lesson
  useEffect(() => {
    const fetchChaptersTopicsAndLessons = async () => {
      const chaptersResponse = await api.get(`/chapter/course/${courseId}`);
      const chaptersData = chaptersResponse.data.data;

      const chaptersWithTopicsAndLessons = await Promise.all(chaptersData.map(async (chapter) => {
        const topicsResponse = await api.get(`/topic/chapter/${chapter.chapter_id}`);
        const topicsData = topicsResponse.data.data;

        const topicsWithLessons = await Promise.all(topicsData.map(async (topic) => {
          const lessonsResponse = await api.get(`/lessons/topic/${topic.topic_id}`);
          return { ...topic, lessons: lessonsResponse.data.data || [] };
        }));
        return { ...chapter, topics: topicsWithLessons || [] };
      }));

      setChapters(chaptersWithTopicsAndLessons);
    };
    fetchChaptersTopicsAndLessons();
  }, [courseId]);

  //Create Chapter
  const handleAddChapter = async () => {
    setChapters((prev) => [
      ...chapters,
      {
        title: newChapterTitle,
        number: 1,
        chapter_id: prev.length + 1,
        topics: []
      }
    ]);
    setNewChapterTitle("");
    toast.success("Thêm chapter thành công !")
    await api.post(`/chapter/${courseId}`, { title: newChapterTitle, number: 1 });

  };

  //Create Topic
  const handleAddTopic = async (chapterId, title) => {
    // Optimistically update the UI before the request is complete
    const newTopic = { title, number: 1, lessons: [] };
    const updatedChapters = chapters.map(chapter => {
      if (chapter.chapter_id === chapterId) {
        return { ...chapter, topics: [...chapter.topics, newTopic] };
      }
      return chapter;
    });
    setChapters(updatedChapters);

    // Make the API request
    try {
      const response = await api.post(`/topic/chapter/${chapterId}`, { title, number: 1 });
      // Update the topic with the response data
      const finalChapters = updatedChapters.map(chapter => {
        if (chapter.chapter_id === chapterId) {
          return {
            ...chapter,
            topics: chapter.topics.map(topic =>
                topic.title === title ? { ...response.data.data, lessons: [] } : topic
            )
          };
        }
        return chapter;
      });
      setChapters(finalChapters);
      toast.success("Thêm topic thành công !");
    } catch (error) {
      // Handle error, rollback optimistic update if necessary
      console.error(error);
      toast.error("Có lỗi xảy ra khi thêm topic");
      // Optionally, rollback the optimistic update
      const rolledBackChapters = chapters.map(chapter => {
        if (chapter.chapter_id === chapterId) {
          return { ...chapter, topics: chapter.topics.filter(topic => topic.title !== title) };
        }
        return chapter;
        console.log(chapter)
      });
      setChapters(rolledBackChapters);
    }
  };

  //Create Lesson
  const handleAddLesson = async (topicId, lessonData) => {
    const response = await api.post(`/lessons/${topicId}`, lessonData);
    const updatedChapters = chapters.map(chapter => {
      return {
        ...chapter,
        topics: chapter.topics.map(topic => {
          if (topic.topic_id === topicId) {
            return { ...topic, lessons: [...topic.lessons, response.data.data] };
          }
          return topic;
        })
      };
    });
    setChapters(updatedChapters);
    toast.success("Thêm lesson thành công !")
  };

  //Handle Save 
  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };
  const handleSaveClick = async (field) => {
    const updatedCourse = { ...course, [field]: editValues[field] };
    setCourse(updatedCourse);
    setIsEditing({ ...isEditing, [field]: false });
    await api.put(`/course/${courseId}`, updatedCourse);

  };
  const handleChange = (e, field) => {
    setEditValues({ ...editValues, [field]: e.target.value });
  };

  const downloadTemplate = (url) => {
    const fileName = url.split('/').pop()
    const aTag = document.createElement('a');
    aTag.href = url
    aTag.setAttribute('download', fileName);
    document.body.appendChild(aTag);
    aTag.click();
  }

  // Loading
  if (!course) {
    return <div className='flex flex-col items-center justify-center h-screen'><Loading /></div>;
  }

  return (
    <div className="antialiased bg-orange-50 w-full min-h-screen text-black relative py-4">
      <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
        {/* Menu */}
        <Menu />
        {/* Content */}
        <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
          <section className="text-gray-700 body-font overflow-hidden bg-orange-50">
            <div className="container py-6 mx-auto">
              {/* Top */}
              <div className="lg:w-4/5 mx-auto flex flex-wrap gap-10">
                <img
                    src={course.image}
                    alt="img not found"
                    className="rounded-3xl"
                    width="306"
                    height="306"
                    style={{objectFit: 'cover', width: '306px', height: '306px'}}
                />
                <div className="lg:w-1/2 w-full">
                  {/*<div className={'flex justify-between '}>*/}
                  {/*  <span></span>*/}
                  {/*  <span className={'py-2 px-4 rounded-xl bg-blue-500 font-medium text-lg text-white'}>Quiz </span>*/}
                  {/*</div>*/}
                  <span>Tên khóa học: </span>
                  {isEditing.title ? (
                      <div>
                        <input
                            type="text"
                            value={editValues.title}
                            onChange={(e) => handleChange(e, 'title')}
                            className="mb-2 p-2 border border-gray-300 rounded"
                        />
                        <button onClick={() => handleSaveClick('title')}
                                className="bg-blue-500 text-white p-2 rounded">Save
                        </button>
                      </div>
                  ) : (
                      <h1 className="text-gray-900 text-4xl title-font font-medium mb-6"
                          onClick={() => handleEditClick('title')}>{course.title}</h1>
                  )}
                  {/* description */}
                  <span>Mô tả khóa học: </span>
                  {isEditing.description ? (
                      <div>
                      <textarea
                          value={editValues.description}
                          onChange={(e) => handleChange(e, 'description')}
                          className="mb-2 p-2 border border-gray-300 rounded"
                      />
                        <button onClick={() => handleSaveClick('description')}
                                className="bg-blue-500 text-white p-2 rounded">Save
                        </button>
                      </div>
                  ) : (
                      <p className="leading-relaxed font-medium text-2xl"
                         onClick={() => handleEditClick('description')}>{course.description}</p>
                  )}
                  {/* price */}
                  <div className="flex mt-10 justify-between">
                    {/* original_price */}
                    <div>
                      <span>Giá gốc:</span>
                      {isEditing.original_price ? (
                          <div>
                            <input
                                type="text"
                                value={editValues.original_price}
                                onChange={(e) => handleChange(e, 'original_price')}
                                className="mb-2 p-2 border border-gray-300 rounded"
                            />
                            <button onClick={() => handleSaveClick('original_price')}
                                    className="bg-blue-500 text-white p-2 rounded">Save
                            </button>
                          </div>
                      ) : (
                          <h1 className="flex justify-start text-2xl font-medium line-through text-black border-0 py-2 focus:outline-none hover:bg-red-00 rounded"
                              onClick={() => handleEditClick('original_price')}>{course.original_price}.000</h1>
                      )}
                    </div>
                    {/* discount_price */}
                    <div>
                      <span>Giá khuyến mãi:</span>
                      {isEditing.discount_price ? (
                          <div>
                            <input
                                type="text"
                                value={editValues.discount_price}
                                onChange={(e) => handleChange(e, 'discount_price')}
                                className="mb-2 p-2 border border-gray-300 rounded"
                            />
                            <button onClick={() => handleSaveClick('discount_price')}
                                    className="bg-blue-500 text-white p-2 rounded">Save
                            </button>
                          </div>
                      ) : (
                          <h1 className="flex justify-start text-2xl font-bold text-white bg-red-600 border-0 py-2 px-4 focus:outline-none hover:bg-red-00 rounded"
                              onClick={() => handleEditClick('discount_price')}>{course.discount_price}.000</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Bot */}
              <div className='w-4/5 mx-auto'>
                {chapters.map((chapter, index) => (
                    <Disclosure
                        key={index}
                        as="div"
                        className="p-6"
                        defaultOpen={true}
                    >
                      {/* Chapter */}
                      <DisclosureButton className="group flex w-full items-center justify-between">
                      <span className="text-2xl font-medium text-black group-hover:text-black/80">
                        {chapter.title}
                      </span>
                        <ChevronDownIcon
                            className="size-5 fill-black/60 group-hover:fill-black/50 group-data-[open]:rotate-180"/>
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
                        {(chapter.topics || []).map((topic, topicIndex) => (
                            <Disclosure
                                key={topicIndex}
                                as="div"
                                className="px-6 mb-2"
                            >
                              {/* Topic */}
                              <DisclosureButton className="group flex w-full items-center justify-between">
                                <div>
                                  <span className="text-lg font-medium mt-2 text-black group-hover:text-black/80">
                                    {topicIndex + 1}. {topic.title}
                                  </span>
                                  <span>
                                      <Link
                                          className={'bg-mathcha-orange ml-4 py-1 px-3 rounded-xl font-medium text-base text-black hover:bg-black hover:text-white'}
                                          to={`/content-manager/update-quiz/${topic.topic_id}`}>
                                        Nhập câu hỏi
                                      </Link>
                                      <Link
                                          className={'bg-mathcha-orange ml-4 py-1 px-3 rounded-xl font-medium text-base text-black hover:bg-black hover:text-white'}
                                          to={`/content-manager/update-quiz/${topic.topic_id}`}>
                                        Xuất câu hỏi
                                      </Link>
                                  </span>
                                </div>
                                <ChevronDownIcon
                                    className="size-5 fill-black/60 group-hover:fill-black/50  group-data-[open]:rotate-180"/>
                              </DisclosureButton>
                              {/* Lessons */}
                              {(topic.lessons || []).map((lesson, lessonIndex) => (
                                  <DisclosurePanel key={lessonIndex}
                                                   className="flex items-center justify-between gap-5 mt-3 mb-5 ml-6 text-sm/5 text-black/70">
                                    <div>
                                <span className="text-base">
                                  <ul>
                                    <li> - {lesson.title}</li>
                                    <li>+ Num of lesson: {lesson.number}</li>
                                    <li>+ <a href={lesson.video_url}>Video_URL</a></li>
                                    <li>+ <a href={lesson.document}>Document_URL</a></li>
                                  </ul>
                                </span>
                                    </div>
                                    <div>
                                    </div>
                                  </DisclosurePanel>
                              ))}
                              {/* Add Lesson */}
                              <div className="flex flex-col mt-4">
                                <div className={'flex justify-between'}>
                                  <input
                                      type="text"
                                      placeholder="Lesson Title"
                                      value={newLesson[topic.topic_id]?.title || ''}
                                      onChange={(e) => setNewLesson({
                                        ...newLesson,
                                        [topic.topic_id]: {...newLesson[topic.topic_id], title: e.target.value}
                                      })}
                                      className="mb-2 p-2 border border-gray-300 rounded"
                                  />
                                  <input
                                      type="text"
                                      placeholder="Lesson Number"
                                      value={newLesson[topic.topic_id]?.number || ''}
                                      onChange={(e) => setNewLesson({
                                        ...newLesson,
                                        [topic.topic_id]: {...newLesson[topic.topic_id], number: e.target.value}
                                      })}
                                      className="mb-2 p-2 border border-gray-300 rounded"
                                  />
                                </div>
                                <div className={'flex justify-between'}>
                                  <input
                                      type="text"
                                      placeholder="Video URL"
                                      value={newLesson[topic.topic_id]?.video_url || ''}
                                      onChange={(e) => setNewLesson({
                                        ...newLesson,
                                        [topic.topic_id]: {...newLesson[topic.topic_id], video_url: e.target.value}
                                      })}
                                      className="mb-2 p-2 border border-gray-300 rounded"
                                  />
                                  <input
                                      type="text"
                                      placeholder="Document URL"
                                      value={newLesson[topic.topic_id]?.document || ''}
                                      onChange={(e) => setNewLesson({
                                        ...newLesson,
                                        [topic.topic_id]: {...newLesson[topic.topic_id], document: e.target.value}
                                      })}
                                      className="mb-2 p-2 border border-gray-300 rounded"
                                  />
                                </div>
                                <button onClick={() => handleAddLesson(topic.topic_id, newLesson[topic.topic_id])}
                                        className="bg-green-500 text-white p-2 rounded">
                                  Add Lesson
                                </button>
                              </div>
                            </Disclosure>
                        ))}
                        {/* Add Topic */}
                        <div className="flex flex-col mt-4">
                          <input
                              type="text"
                              placeholder="Topic Title"
                              value={newTopicTitle[chapter.chapter_id] || ''}
                              onChange={(e) => setNewTopicTitle({
                                ...newTopicTitle,
                                [chapter.chapter_id]: e.target.value
                              })}
                              className="mb-2 p-2 border border-gray-300 rounded"
                          />
                          <button onClick={() => handleAddTopic(chapter.chapter_id, newTopicTitle[chapter.chapter_id])}
                                  className="bg-blue-500 text-white p-2 rounded">
                            Add Topic
                          </button>
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                ))}
                {/* Add Chapter */}
                <div className="flex flex-col mt-4">
                  <input
                      type="text"
                      placeholder="Chapter Title"
                      value={newChapterTitle}
                      onChange={(e) => setNewChapterTitle(e.target.value)}
                      className="mb-2 p-2 border border-gray-300 rounded"
                  />
                  <button onClick={handleAddChapter} className="bg-red-500 text-white p-2 rounded">
                    Add Chapter
                  </button>
                </div>
              </div>
              <button className={'bg-mathcha-orange mt-6 ml-2 py-1 px-3 rounded-xl font-medium text-base text-black hover:bg-black hover:text-white'} onClick={() => {
                downloadTemplate('/assets/QuizTemplate.xlsx')
              }}>Download template question
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}