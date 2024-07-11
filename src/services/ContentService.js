import axios from 'axios';
import api from "../config/axios";

const API_BASE_URL = 'http://localhost:8080';

export const getCourseById = (courseId) => {
    return api.get(`${API_BASE_URL}/course/${courseId}`);
};

export const getChaptersByCourseId = (courseId) => {
    return api.get(`${API_BASE_URL}/chapter/course/${courseId}`);
};

export const getTopicsByChapterId = (chapterId) => {
    return api.get(`${API_BASE_URL}/topic/chapter/${chapterId}`);
};

export const getLessonsByTopicId = (topicId) => {
    return api.get(`${API_BASE_URL}/lessons/topic/${topicId}`);
};

// Add create, update, delete API functions for course, chapter, topic, lesson
export const createChapter = (courseId, chapterData) => {
    return api.post(`${API_BASE_URL}/chapter/course/${courseId}`, chapterData);
};

export const updateChapter = (chapterId, chapterData) => {
    return api.put(`${API_BASE_URL}/chapter/${chapterId}`, chapterData);
};

export const deleteChapter = (chapterId) => {
    return api.delete(`${API_BASE_URL}/chapter/${chapterId}`);
};

// Similarly for topics and lessons
export const createTopic = (chapterId, topicData) => {
    return api.post(`${API_BASE_URL}/topic/chapter/${chapterId}`, topicData);
};

export const updateTopic = (topicId, topicData) => {
    return api.put(`${API_BASE_URL}/topic/${topicId}`, topicData);
};

export const deleteTopic = (topicId) => {
    return api.delete(`${API_BASE_URL}/topic/${topicId}`);
};

export const createLesson = (topicId, lessonData) => {
    return api.post(`${API_BASE_URL}/lessons/topic/${topicId}`, lessonData);
};

export const updateLesson = (lessonId, lessonData) => {
    return api.put(`${API_BASE_URL}/lessons/${lessonId}`, lessonData);
};

export const deleteLesson = (lessonId) => {
    return api.delete(`${API_BASE_URL}/lessons/${lessonId}`);
};
