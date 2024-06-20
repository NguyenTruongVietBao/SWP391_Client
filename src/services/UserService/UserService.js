import api from '../../config/axios';

const REST_API_URL = 'http://localhost:8080/user';

export const listUsers = () => api.get(REST_API_URL+'/get/all');

export const createUser = (user) => api.post(REST_API_URL,user)

export const getUserById = (user_id) => api.get(REST_API_URL + '/get/' + user_id)

export const updateUser = (user_id, user) => api.put(REST_API_URL + '/' + user_id, user)

export const deleteUser = (user_id) => api.delete(REST_API_URL + '/delete/' + user_id)
