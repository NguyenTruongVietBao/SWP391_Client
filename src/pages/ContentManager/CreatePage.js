import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/ContentManager/Menu';
import api from '../../config/axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

export default function CreatePage() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      original_price: '',
      discount_price: '',
      image: ''
    });
  
    const [formErrors, setFormErrors] = useState({});
  
    const validateForm = () => {
      const errors = {};
      if (!formData.title) errors.title = 'Title is required';
      if (!formData.description) errors.description = 'Description is required';
      if (!formData.original_price) errors.original_price = 'Original price is required';
      if (!formData.discount_price) errors.discount_price = 'Discount price is required';
      if (!formData.image) errors.image = 'Image URL is required';
      return errors;
    };
  
    const handleAddCourse = async (e) => {
      e.preventDefault();
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
  
      try {
        await api.post(`/course/user/${user.user_id}`, formData);
        toast.success('Course created successfully!');
        navigate('/content-manager');
      } catch (err) {
        console.error('Error adding course:', err);
        toast.error('Error creating course. Please try again.');
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };
  
    return (
      <div className="antialiased bg-orange-50 w-full min-h-screen relative py-4">
          <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
              {/* Menu */}
              <Menu />
              {/* Content */}
              <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
                  <div className="bg-white/15 flex items-center justify-center p-12">              
                      <div className="mx-auto w-full max-w-[550px]">
                          <div className="text-6xl font-bold text-center mb-10 text-gray-800">
                              Add new course
                          </div>
                          <form onSubmit={handleAddCourse}>
                              <div className="mb-5">
                                  <label htmlFor="title" className="mb-3 block text-base font-medium text-gray-800">
                                      Title
                                  </label>
                                  <input
                                      type="text"
                                      name="title"
                                      id="title"
                                      placeholder="Name of course"
                                      value={formData.title}
                                      onChange={handleChange}
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                  />
                                  {formErrors.title && <span className="text-red-500">{formErrors.title}</span>}
                              </div>
                              <div className="mb-5">
                                  <label htmlFor="description" className="mb-3 block text-base font-medium text-gray-800">
                                    Description
                                  </label>
                                  <input
                                      type="text"
                                      name="description"
                                      id="description"
                                      placeholder="Description"
                                      value={formData.description}
                                      onChange={handleChange}
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                  />
                                  {formErrors.description && <span className="text-red-500">{formErrors.description}</span>}
                              </div>
                              <div className="flex justify-between mb-5 gap-10">
                                  <div>
                                      <label htmlFor="original_price" className="mb-3 block text-base font-medium text-gray-800">
                                        Original price
                                      </label>
                                      <input
                                          type="number"
                                          name="original_price"
                                          id="original_price"
                                          placeholder="Original price"
                                          value={formData.original_price}
                                          onChange={handleChange}
                                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                      />
                                      {formErrors.original_price && <span className="text-red-500">{formErrors.original_price}</span>}
                                  </div>
                                  <div>
                                      <label htmlFor="discount_price" className="mb-3 block text-base font-medium text-gray-800">
                                        Discount price
                                      </label>
                                      <input
                                          type="number"
                                          name="discount_price"
                                          id="discount_price"
                                          placeholder="Discount price"
                                          value={formData.discount_price}
                                          onChange={handleChange}
                                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                      />
                                      {formErrors.discount_price && <span className="text-red-500">{formErrors.discount_price}</span>}
                                  </div>
                              </div>                                                
                              <div className="mb-10">
                                  <label htmlFor="image" className="mb-3 block text-base font-medium text-gray-800">
                                      Image
                                  </label>
                                  <input
                                      type="text"
                                      name="image"
                                      id="image"
                                      placeholder="Image"
                                      value={formData.image}
                                      onChange={handleChange}
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                  />
                                  {formErrors.image && <span className="text-red-500">{formErrors.image}</span>}
                              </div>
                              <div>
                                  <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                      Submit
                                  </button>
                                  {/* {error && <div className="text-red-500 mt-2">{error}</div>} */}
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
