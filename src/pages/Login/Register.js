import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../../components/Parent/Header/Navbar';
import Footer from '../../components/Parent/Footer/Footer';

export default function Register() {
    var phoneRegExp = /^09\d{8}$/;
    const validationSchema = Yup.object().shape({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      username: Yup.string()
        .required('Username is required')
        .min(8, 'Username must be at least 8 characters')
        .max(32, 'Username must not exceed 32 characters'),
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required()
    });
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });
    const navigate = useNavigate();
    const onSubmit = async data => {
      // Exclude confirmPassword from the data object
      const { confirmPassword, ...newUser } = data;
      try {
        const response = await api.post('/api/register', newUser);
        toast.success('User created successfully!');
        navigate('/login')
        // Handle success response
      } catch (error) {
        alert('Error creating user');
        // Handle error response
      }
    };
  
    return (
        <>
      <Navbar/>
      <header className="bg-cover border-t-2 h-screen" style={{ backgroundImage: 'url("/assets/wallpaper-login.png")' }}>
        <div className="content px-8 py-2">
          <div className="body mt-5 mx-8">
            <div className="md:flex items-center justify-center">
              <div className="w-full md:max-w-md mt-6">
                <div className="card bg-white/5 p-6 backdrop-blur-2xl shadow-2xl rounded-lg px-4 py-4 mb-6">
                  <div className="register-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex items-center justify-center mb-8">
                        <h2 className="text-4xl font-bold tracking-wide">Đăng ký tài khoản</h2>
                      </div>
                      <div className='form-group'>
                        <input
                          name="username"
                          className={`form-control ${errors.username ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                          placeholder="Username"
                          type="text"
                          {...register('username')}
                        />
                        <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.username?.message}</div>
                      </div>
                      <div className='flex justify-between gap-10'>
                        <div className='form-group'>
                          <input
                            name="first_name"
                            className={`form-control ${errors.first_name ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                            placeholder="First Name"
                            type="text"
                            {...register('first_name')}
                          />
                          <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.first_name?.message}</div>
                        </div>
                        <div className='form-group'>
                          <input
                            name="last_name"
                            className={`form-control ${errors.last_name ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                            placeholder="Last Name"
                            type="text"
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
                            placeholder="Password"
                            type="password"
                            {...register('password')}
                          />
                          <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.password?.message}</div>
                        </div>
                        <div className='form-group'>
                          <input
                            name="confirmPassword"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                            placeholder="Confirm password"
                            type="password"
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
                          type="text"
                          {...register('email')}
                        />
                        <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.email?.message}</div>
                      </div>
                      <div className='form-group'>
                        <input
                          name="address"
                          className={`form-control ${errors.address ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                          placeholder="Address"
                          type="text"
                          {...register('address')}
                        />
                        <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.email?.message}</div>
                      </div>
                      <div className='form-group'>
                        <input
                          name="phone"
                          className={`form-control ${errors.phone ? 'is-invalid' : ''} rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none`}
                          placeholder="Phone"
                          type="text"
                          {...register('phone')}
                        />
                        <div className="ml-3 mb-3 invalid-feedback text-red-500">{errors.phone?.message}</div>
                      </div>
                      <input type="text" className="rounded px-4 w-full py-2 bg-gray-100 border border-gray-300 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none" placeholder="Image" />
                      <div className="flex items-center justify-center">
                        <button type="submit" className="bg-gray-800 text-gray-200 px-3 py-2 rounded">Đăng ký</button>
                        <button
                          type="button"
                          onClick={reset}
                          className="bg-gray-500 text-gray-200 px-3 py-2 rounded ml-3"
                        >
                          Reset
                        </button>
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
