// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//     getChaptersByCourseId,
//     getCourseById,
//     getLessonsByTopicId,
//     getTopicsByChapterId
// } from '../../services/ContentService';
//
// function UpdatePage2() {
//     const { courseId } = useParams();
//     const [course, setCourse] = useState(null);
//     const [chapters, setChapters] = useState([]);
//     const [expandedChapter, setExpandedChapter] = useState(null);
//     const [expandedTopic, setExpandedTopic] = useState(null);
//
//     useEffect(() => {
//         getCourseById(courseId).then((response) => {
//             setCourse(response.data.data);
//         });
//
//         getChaptersByCourseId(courseId).then((response) => {
//             const chaptersData = response.data.data;
//             const chapterPromises = chaptersData.map((chapter) =>
//                 getTopicsByChapterId(chapter.chapter_id).then((topicsResponse) => {
//                     const topicsData = topicsResponse.data.data;
//                     const topicPromises = topicsData.map((topic) =>
//                         getLessonsByTopicId(topic.topic_id).then((lessonsResponse) => {
//                             topic.lessons = lessonsResponse.data.data;
//                             return topic;
//                         })
//                     );
//                     return Promise.all(topicPromises).then((topicsWithLessons) => {
//                         chapter.topics = topicsWithLessons;
//                         return chapter;
//                     });
//                 })
//             );
//             Promise.all(chapterPromises).then((chaptersWithTopics) => {
//                 setChapters(chaptersWithTopics);
//             });
//         });
//     }, [courseId]);
//
//     const toggleChapter = (chapterId) => {
//         setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
//     };
//
//     const toggleTopic = (topicId) => {
//         setExpandedTopic(expandedTopic === topicId ? null : topicId);
//     };
//
//     const handleDeleteChapter = async (chapterId) => {
//         try {
//             await deleteChapterById(chapterId); // Replace with your delete function from ContentService
//             // Update state or fetch data again if needed
//             console.log(`Deleted chapter with ID ${chapterId}`);
//         } catch (error) {
//             console.error('Error deleting chapter:', error);
//             // Handle error gracefully
//         }
//     };
//
//     const handleUpdateChapter = async (chapterId) => {
//         // Implement update logic as per your application requirements
//         console.log(`Update chapter with ID ${chapterId}`);
//     };
//
//     const handleDeleteTopic = async (topicId) => {
//         try {
//             await deleteTopicById(topicId); // Replace with your delete function from ContentService
//             // Update state or fetch data again if needed
//             console.log(`Deleted topic with ID ${topicId}`);
//         } catch (error) {
//             console.error('Error deleting topic:', error);
//             // Handle error gracefully
//         }
//     };
//
//     const handleUpdateTopic = async (topicId) => {
//         // Implement update logic as per your application requirements
//         console.log(`Update topic with ID ${topicId}`);
//     };
//
//     const handleDeleteLesson = async (lessonId) => {
//         try {
//             await deleteLessonById(lessonId); // Replace with your delete function from ContentService
//             // Update state or fetch data again if needed
//             console.log(`Deleted lesson with ID ${lessonId}`);
//         } catch (error) {
//             console.error('Error deleting lesson:', error);
//             // Handle error gracefully
//         }
//     };
//
//     const handleUpdateLesson = async (lessonId) => {
//         // Implement update logic as per your application requirements
//         console.log(`Update lesson with ID ${lessonId}`);
//     };
//
//     return (
//         <div className="container mx-auto p-4">
//             {course && (
//                 <div className="mb-8">
//                     <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
//                     <p className="mb-2">{course.description}</p>
//                     <p className="mb-2">Original Price: {course.original_price}</p>
//                     <p className="mb-2">Discount Price: {course.discount_price}</p>
//                 </div>
//             )}
//             <div>
//                 <h2 className="text-xl font-semibold mb-4">Chapters</h2>
//                 {chapters.map((chapter) => (
//                     <div key={chapter.chapter_id} className="mb-4">
//                         <div
//                             className="bg-gray-200 p-4 rounded cursor-pointer flex justify-between items-center"
//                             onClick={() => toggleChapter(chapter.chapter_id)}
//                         >
//                             <h3 className="text-lg font-medium">{chapter.title}</h3>
//                             <div>
//                                 <button
//                                     className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
//                                     onClick={() => handleUpdateChapter(chapter.chapter_id)}
//                                 >
//                                     Update
//                                 </button>
//                                 <button
//                                     className="bg-red-500 text-white px-4 py-1 rounded"
//                                     onClick={() => handleDeleteChapter(chapter.chapter_id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                         {expandedChapter === chapter.chapter_id && (
//                             <div className="ml-4 mt-2">
//                                 {chapter.topics.map((topic) => (
//                                     <div key={topic.topic_id} className="mb-2">
//                                         <div
//                                             className="bg-gray-100 p-3 rounded cursor-pointer flex justify-between items-center"
//                                             onClick={() => toggleTopic(topic.topic_id)}
//                                         >
//                                             <h4 className="text-md font-medium">{topic.title}</h4>
//                                             <div>
//                                                 <button
//                                                     className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
//                                                     onClick={() => handleUpdateTopic(topic.topic_id)}
//                                                 >
//                                                     Update
//                                                 </button>
//                                                 <button
//                                                     className="bg-red-500 text-white px-4 py-1 rounded"
//                                                     onClick={() => handleDeleteTopic(topic.topic_id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         {expandedTopic === topic.topic_id && (
//                                             <div className="ml-4 mt-2">
//                                                 {topic.lessons.map((lesson) => (
//                                                     <div key={lesson.lesson_id} className="bg-white p-2 rounded mb-1 shadow flex justify-between items-center">
//                                                         <p className="font-semibold">{lesson.title}</p>
//                                                         <div>
//                                                             <a className="text-blue-500" href={lesson.video_url} target="_blank" rel="noopener noreferrer">
//                                                                 Watch Video
//                                                             </a>
//                                                             <a className="text-blue-500 ml-2" href={lesson.document_url} target="_blank" rel="noopener noreferrer">
//                                                                 Download Document
//                                                             </a>
//                                                             <button
//                                                                 className="bg-blue-500 text-white px-4 py-1 rounded ml-2"
//                                                                 onClick={() => handleUpdateLesson(lesson.lesson_id)}
//                                                             >
//                                                                 Update
//                                                             </button>
//                                                             <button
//                                                                 className="bg-red-500 text-white px-4 py-1 rounded ml-2"
//                                                                 onClick={() => handleDeleteLesson(lesson.lesson_id)}
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// export default UpdatePage2;