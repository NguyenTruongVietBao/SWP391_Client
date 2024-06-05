import axios from 'axios'

const REST_API_URL = 'http://localhost:8080/user';

export const listUsers = () => axios.get(REST_API_URL);

export const createUser = (user) => axios.post(REST_API_URL,user)

export const getUserById = (user_id) => axios.get(REST_API_URL + '/' + user_id)

export const updateUser = (user_id, user) => axios.put(REST_API_URL + '/' + user_id, user)

export const deleteUser = (user_id) => axios.delete(REST_API_URL + '/' + user_id)
