import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../../components/Parent/Header/Navbar';
import Footer from '../../components/Parent/Footer/Footer';
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {imageDb} from "../../config/firebase";
import { v4 } from "uuid";

export default function Register() {

  const [img, setImg] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `avatarImg/${v4()}`);
      uploadBytes(imgRef, img).then(value => {
        getDownloadURL(value.ref).then(url => {
          setImgUrl(url);
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, "files")).then(imgs => {
      console.log(imgs);
      imgs.items.forEach(val => {
        getDownloadURL(val).then(url => {
          setImgUrl(url);
        });
      });
    });
  }, []);

  console.log(imgUrl);

  //login + validate
  const phoneRegExp = /^09\d{8}$/;
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Họ bắt buộc'),
    last_name: Yup.string().required('Tên bắt buộc'),
    username: Yup.string()
        .required('Tên đăng nhập bắt buộc')
        .min(8, 'Tên đăng nhập ít nhất 8 ký tự')
        .max(32, 'Tên đăng nhập tối đa 32 ký tự'),
    email: Yup.string()
        .required('Email bắt buộc')
        .email('Email không hợp lệ'),
    password: Yup.string()
        .required('Mật khẩu bắt buộc')
        .min(8, 'Mật khẩu ít nhất 8 ký tự')
        .max(40, 'Mật khẩu tối đa 40 ký tự'),
    confirmPassword: Yup.string()
        .required('Cần xác nhận mật khẩu')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không giống nhau'),
    phone: Yup.string()
        .required('Số điện thoại bắt buộc')
        .matches(phoneRegExp, 'Số điện thoại bắt đầu từ 09********').required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const navigate = useNavigate();

  const onSubmit = async data => {
    // Exclude confirmPassword from the data object
    const { confirmPassword, ...newUser } = data;
    // Add imgUrl to newUser object
    newUser.image = imgUrl;
    newUser.is_deleted = false;
    try {
      console.log(newUser)

      await api.post('/api/register', newUser);
      toast.success('Đăng ký thành công!');
      navigate('/login');
      // Handle success response
    } catch (error) {
      toast.error('Tên đăng nhập, email hoặc số điện thoại bị trùng!');
      // Handle error response
    }
  };

  return (
      <>
        <Navbar />
        <header className="bg-cover border-t-2 h-screen" style={{ backgroundImage: 'url("/assets/wallpaper-login.png")' }}>
          <div className="content px-10 py-2">
            <div className="body mt-5 mx-8">
              <div className="md:flex items-center justify-center">
                <div className="w-full max-w-4xl mt-6">
                  <div className="card bg-white/10 p-12 backdrop-blur-3xl shadow-2xl rounded-lg px-4 py-4 mb-6">
                    <div className="flex items-center justify-center mt-2 mb-8">
                      <h2 className="text-5xl font-bold tracking-wide font-mathcha-font-2">Đăng ký tài khoản</h2>
                    </div>
                    <div className="register-form flex justify-between">
                      <div className="flex flex-col items-center space-y-4 p-4 border border-gray-200 rounded-lg shadow-md max-w-md mx-auto bg-white">
                        <label className="block text-sm font-medium text-gray-700">
                          Tải ảnh đại diện
                        </label>
                        <div className="flex w-full items-center justify-center bg-grey-lighter">
                          <label
                              className="w-64 flex flex-col items-center px-2 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                              <path
                                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                            </svg>
                            <span className="mt-2 text-base leading-normal">Chọn tệp</span>
                            {/*<input type='file' className="hidden"/>*/}
                            <input
                                type="file"
                                onChange={(e) => setImg(e.target.files[0])}
                                className="mt-1 w-full text-sm text-gray-500
                                 file:rounded-full file:border-0
                                 file:text-sm
                                 file:bg-white file:text-white"

                            />
                          </label>
                        </div>
                        <button
                            onClick={handleClick}
                            className="mt-4 px-4 py-2 bg-mathcha-green text-white rounded-lg hover:bg-black transition duration-200"
                        >
                          Chọn ảnh này
                        </button>
                        {imgUrl && (
                            <div className="mt-4">
                              <img
                                  src={imgUrl}
                                  alt="Selected"
                                  className="rounded-lg shadow-md"
                                  style={{height: '200px', width: '200px', objectFit: 'cover'}}
                              />
                            </div>
                        )}

                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex justify-evenly'>
                          <div>
                            <div className='form-group'>
                              <input
                                  name="username"
                                  className={`form-control ${errors.username ? 'is-invalid' : ''} rounded-lg px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                  placeholder="Tên đăng nhập"
                                  type="text" required
                                  {...register('username')}
                              />
                              <div className="my-4 invalid-feedback text-red-500">{errors.username?.message}</div>
                            </div>
                            <div className='flex justify-between gap-10'>
                              <div className='form-group'>
                                <input
                                    name="first_name"
                                    className={`form-control ${errors.first_name ? 'is-invalid' : ''} rounded-lg px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                    placeholder="Họ"
                                    type="text" required
                                    {...register('first_name')}
                                />
                                <div
                                    className="my-4 invalid-feedback text-red-500">{errors.first_name?.message}</div>
                              </div>
                              <div className='form-group'>
                                <input
                                    name="last_name"
                                    className={`form-control ${errors.last_name ? 'is-invalid' : ''} rounded-lg px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                    placeholder="Tên"
                                    type="text" required
                                    {...register('last_name')}
                                />
                                <div
                                    className="my-4 invalid-feedback text-red-500">{errors.last_name?.message}</div>
                              </div>
                            </div>
                            <div className='flex justify-between gap-10'>
                              <div className='form-group'>
                                <input
                                    name="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''} rounded-lg px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                    placeholder="Mật khẩu"
                                    type="password" required
                                    {...register('password')}
                                />
                                <div
                                    className="my-4 invalid-feedback text-red-500">{errors.password?.message}</div>
                              </div>
                              <div className='form-group'>
                                <input
                                    name="confirmPassword"
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''} rounded-lg px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                    placeholder="Xác nhận mật khẩu"
                                    type="password" required
                                    {...register('confirmPassword')}
                                />
                                <div
                                    className="my-4 invalid-feedback text-red-500">{errors.confirmPassword?.message}</div>
                              </div>
                            </div>
                            <div className='form-group'>
                              <input
                                  name="email"
                                  className={`form-control ${errors.email ? 'is-invalid' : ''} rounded-lg px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                  placeholder="Email"
                                  type="text" required
                                  {...register('email')}
                              />
                              <div className="my-4 invalid-feedback text-red-500">{errors.email?.message}</div>
                            </div>
                            <div className='form-group'>
                              <input
                                  name="address"
                                  className={`mb-3 rounded-lg px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                  placeholder="Địa chỉ"
                                  type="text"
                                  {...register('address')}
                              />
                            </div>
                            <div className='form-group'>
                              <input
                                  name="phone"
                                  className={`form-control ${errors.phone ? 'is-invalid' : ''} rounded-lg px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                  placeholder="Số điện thoại"
                                  type="text" required
                                  {...register('phone')}
                              />
                              <div className="my-4 invalid-feedback text-red-500">{errors.phone?.message}</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <button type="submit"
                                      className="transition duration-200 bg-gray-800 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white text-xl w-full py-4 rounded-lg shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                <span className="inline-block mr-2">Đăng ký</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" className="w-4 h-4 inline-block">
                                  <path stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Footer/>
      </>
  );
}

