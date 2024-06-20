import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserService from '../../services/UserService/UserService'
import api from '../../config/axios'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/features/counterSlice'
import { toast } from 'react-toastify'
import Navbar from '../../components/Parent/Header/Navbar'
import Footer from '../../components/Parent/Footer/Footer'

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin =  async (e) =>{
        e.preventDefault();
        try{
            const response = await api.post("/api/login",{
                "password": password,
                "username":username
            })
            console.log(response.data.data);
            localStorage.setItem("token",response.data.data.token)
            const role = response.data.data.role
            dispatch(login(response.data.data))
            toast.success("Login successfully!!!")
            if(role === 'ADMIN'){
                navigate("/admin")
            }else if (role === 'PARENT'){
                navigate("/")
            }else if(role === 'MANAGER'){
                navigate("/manager")
            }else if(role === 'CONTENT_MANAGER'){
                navigate("/content-manager")
            }
        }catch(e) {
            console.log(e);
        }
    }
  return (
    <>
    <Navbar/>
    <div className=" border-[5px] border-mathcha-orange w-full "></div>
    <header className=" bg-cover h-screen" style={{backgroundImage: 'url("/assets/wallpaper-login.png")'}}>
        <div className="content px-8 py-2">
            <div className="body mt-10 mx-8">
                <div className="md:flex items-center justify-between">
                    {/* Left */}
                    <div className="w-full md:w-1/2 mr-auto" style={{textShadow: '0 20px 40px hsla(0,0%,0%,111)'}}>
                        <h1 className="text-4xl font-bold text-white tracking-wide">Bạn</h1>
                        <h2 className=" text-2xl font-bold text-white tracking-wide"> <span className="text-black">chưa có</span> tài khoản ?</h2>
                        <p className="text-white">
                            .
                        </p>
                        <span className="mt-9 text-white "><Link to="/register" className="text-black rounded-xl text-lg ml-2 font-bold py-2 px-2 bg-mathcha-orange hover:bg-mathcha">Đăng ký</Link></span>
                    </div>
                    {/* Right */}
                    <div className="w-full md:max-w-md mt-6">
                        <div className="flex items-center justify-end mb-5">
                            <Link to={'/learning/login'} className='bg-pink-200 text-xl font-bold px-10 py-1 rounded-lg text-gray-700 hover:bg-mathcha'>Trang của bé</Link>
                        </div>
                        <div className="card bg-white/5 p-6 backdrop-blur-2xl shadow-2xl rounded-lg px-4 py-4  mb-6 ">                          
                            <form >
                            <div className="flex items-center justify-center my-7">
                                <h2 className="text-4xl font-bold tracking-wide">
                                    Welcome to <span className='text-mathcha-green'>Mathcha</span>
                                </h2> 
                            </div>
                            <input  type="text" 
                                    className="rounded px-4 w-full py-3 bg-gray-50  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" 
                                    placeholder="Tên đăng nhập"
                                    value={username}
                                    onChange={(e)=> setUsername(e.target.value)}
                            />
                            <input  type="password" 
                                    className="rounded px-4 w-full py-3 bg-gray-50  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" 
                                    placeholder="Mật khẩu" 
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                            />                      
                            <div className="flex items-center justify-between">
                                <a href="/" className="text-gray-700">Quên mật khẩu ?</a>
                                <button onClick={handleLogin} className="bg-gray-800 text-gray-200 font-bold px-3 py-3 rounded"
                                        type='submit'
                                >
                                    Đăng nhập
                                </button>
                            </div>
                            <div className='flex items-center justify-center my-2'>
                                Đăng nhập bằng Google
                            </div>
                            <div className='flex items-center justify-center'>
                                Đăng nhập bằng Phone
                            </div>
                            </form>         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <Footer/>
    </>
  )
}
