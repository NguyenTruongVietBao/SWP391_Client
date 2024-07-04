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
                    <div className="flex items-center justify-center mb-8">
                      <h2 className="text-4xl font-bold tracking-wide">Đăng ký tài khoản</h2>
                    </div>
                    <div className="register-form flex">
                      <div>
                        <input type="file" onChange={(e) => setImg(e.target.files[0])} />
                        <br />
                        <button onClick={handleClick} className='p-1 rounded-xl bg-mathcha'>Chọn ảnh này</button>
                        <br />
                        {imgUrl ? (
                            <img src={imgUrl} height="200px" width="200px" alt='a' />
                        ) : (
                            <></>
                        )}

                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex justify-evenly gap-10'>
                          <div>
                            <div className='form-group'>
                              <input
                                  name="username"
                                  className={`form-control ${errors.username ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                  placeholder="Tên đăng nhập"
                                  type="text" required
                                  {...register('username')}
                              />
                              <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.username?.message}</div>
                            </div>
                            <div className='flex justify-between gap-10'>
                              <div className='form-group'>
                                <input
                                    name="first_name"
                                    className={`form-control ${errors.first_name ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                    placeholder="Họ"
                                    type="text" required
                                    {...register('first_name')}
                                />
                                <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.first_name?.message}</div>
                              </div>
                              <div className='form-group'>
                                <input
                                    name="last_name"
                                    className={`form-control ${errors.last_name ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                    placeholder="Tên"
                                    type="text" required
                                    {...register('last_name')}
                                />
                                <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.last_name?.message}</div>
                              </div>
                            </div>
                            <div className='flex justify-between gap-10'>
                              <div className='form-group'>
                                <input
                                    name="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                    placeholder="Mật khẩu"
                                    type="password" required
                                    {...register('password')}
                                />
                                <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.password?.message}</div>
                              </div>
                              <div className='form-group'>
                                <input
                                    name="confirmPassword"
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                    placeholder="Xác nhận mật khẩu"
                                    type="password" required
                                    {...register('confirmPassword')}
                                />
                                <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.confirmPassword?.message}</div>
                              </div>
                            </div>
                            <div className='form-group'>
                              <input
                                  name="email"
                                  className={`form-control ${errors.email ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                  placeholder="Email"
                                  type="text" required
                                  {...register('email')}
                              />
                              <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.email?.message}</div>
                            </div>
                            <div className='form-group'>
                              <input
                                  name="address"
                                  className={`mb-3 rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                  placeholder="Địa chỉ"
                                  type="text"
                                  {...register('address')}
                              />
                            </div>
                            <div className='form-group'>
                              <input
                                  name="phone"
                                  className={`form-control ${errors.phone ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                                  placeholder="Số điện thoại"
                                  type="text" required
                                  {...register('phone')}
                              />
                              <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.phone?.message}</div>
                            </div>
                            <button type="submit"
                                    className="bg-gray-800 text-gray-200 text-xl px-4 py-3 font-bold rounded mt-2">Đăng ký
                            </button>
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
        <Footer />
      </>
  );
}

