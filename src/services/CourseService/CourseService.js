import axios from 'axios'

const REST_API_COURSE = 'http://localhost:8080/course';

export const listCourses = () => axios.get(REST_API_COURSE + '/get');

export const createCourse = (course) => axios.post(REST_API_COURSE,course)

export const getCourseById = (course_id) => axios.get(REST_API_COURSE + '/' + course_id)

export const updateCourse = (course_id, course) => axios.put(REST_API_COURSE + '/' + course_id, course)

export const deleteCourse = (course_id) => axios.delete(REST_API_COURSE + '/' + course_id)

export const getChapterById = (course_id) => axios.get(REST_API_COURSE + '/' + course_id)


export const getChapterByCourseId = (course_id) => axios.put('http://localhost:8080/course/'+course_id+'/chapters')
