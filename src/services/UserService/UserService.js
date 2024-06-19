import axios from 'axios'
import api from '../../config/axios';

const REST_API_URL = 'http://localhost:8080/user';

export const listUsers = () => api.get(REST_API_URL+'/get/all');

export const createUser = (user) => axios.post(REST_API_URL,user)

export const getUserById = (user_id) => axios.get(REST_API_URL + '/' + user_id)

export const updateUser = (user_id, user) => axios.put(REST_API_URL + '/' + user_id, user)

export const deleteUser = (user_id) => api.delete(REST_API_URL + '/delete/' + user_id)


// class UserService{
// 
//   static async login(username, password){
//     try{
//       const response = await axios.post(`http://localhost:8080/api/login`, {username, password}) 
//       return response.data.data;
//     }catch(error){
//       throw error;
//     }
//     const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         const raw = JSON.stringify({
//             "username": {username},
//             "password": {password}
//         });

//         const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow"
//         };

//         fetch("http://localhost:8080/api/login", requestOptions)
//         .then((response) => response.text())
//         .then((result) => console.log(result))
//         .catch((error) => console.error(error));
//   }

//   static async listUsers(token){
//     try{
//       const response = await axios.get(`${UserService.AUTH_ADMIN}/user`, 
//         {
//           headers: {Authorization: `Bearer ${token}`}
//         }
//       ) 
//       return response.data.data;
//     }catch(error){
//       throw error;
//     }
//   }

//   static async getUserById(user_id, token){
//     try{
//       const response = await axios.get(`http://localhost:8080/user/get/${user_id}`, 
//         {
//           headers: {Authorization: `Bearer ${token}`}
//         }
//       ) 
//       return response.data.data;
//     }catch(error){
//       throw error;
//     }
//   }

//   static async register(userData, token){
//     try{
//       const response = await axios.post(`${UserService.AUTH_ADMIN}/api/register`, userData, 
//         {
//           headers: {Authorization: `Bearer ${token}`}
//         }
//       ) 
//       return response.data;
//     }catch(error){
//       throw error;
//     }
//   }

//   static async deleteUser(user_id, token){
//     try{
//       const response = await axios.delete(`${UserService.AUTH_ADMIN}/user/delete/${user_id}`, 
//         {
//           headers: {Authorization: `Bearer ${token}`}
//         }
//       ) 
//       return response.data;
//     }catch(error){
//       throw error;
//     }
//   }

//   static logout(){
//     localStorage.removeItem('token')
//     localStorage.removeItem('role')
//   }

//   static isAuthenticated(){
//     const token = localStorage.getItem('token')
//     return !!token
//   }

//   static isAdmin(){
//     const role = localStorage.getItem('role')
//     return role === 'ADMIN'
//   }

//   static isParent(){
//     const role = localStorage.getItem('role')
//     return role === 'PARENT'
//   }
//   static isManager(){
//     const role = localStorage.getItem('role')
//     return role === 'MANAGER'
//   }

//   static isContentManager(){
//     const role = localStorage.getItem('role')
//     return role === 'CONTENT_MANAGER'
//   }

//   static adminOnly(){
//     return this.isAuthenticated() && this.isAdmin();
//   }
// }

// export default UserService;