import axios from 'axios'

const REST_API_URL = 'http://localhost:8080/course';

export const listCourses = () => axios.get(REST_API_URL);

export const createCourse = (course) => axios.post(REST_API_URL,course)

export const getCourseById = (course_id) => axios.get(REST_API_URL + '/' + course_id)

export const updateCourse = (course_id, course) => axios.put(REST_API_URL + '/' + course_id, course)

export const deleteCourse = (course_id) => axios.delete(REST_API_URL + '/' + course_id)

export const getChapterById = (course_id) => axios.get(REST_API_URL + '/' + course_id)
