import axios from 'axios'
import api from '../../config/axios';

const REST_API_COURSE = '/course';

export const listCourses = () => api.get(REST_API_COURSE + '/get');

export const listCoursesNotBought = (user_id) => api.get('/course/notbought/'+user_id);

export const createCourse = (course) => api.post(REST_API_COURSE,course)

export const getCourseById = (course_id) => api.get(REST_API_COURSE + '/' + course_id)

export const updateCourse = (course_id, course) => api.put(REST_API_COURSE + '/' + course_id, course)

export const deleteCourse = (course_id) => api.delete(REST_API_COURSE + '/' + course_id)

export const getChapterById = (course_id) => api.get(REST_API_COURSE + '/' + course_id)

export const getChapterByCourseId = (course_id) => api.put('/'+course_id+'/chapters')
