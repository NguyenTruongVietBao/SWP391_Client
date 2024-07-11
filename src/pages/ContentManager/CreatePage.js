import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/ContentManager/Menu';
import api from '../../config/axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { imageDb } from '../../config/firebase';
import { v4 } from "uuid";

export default function CreatePage() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState('');

  const handleUploadImg = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `courseImg/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl(url);
          setFormData((prevData) => ({
            ...prevData,
            image: url,
          }));
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, "files")).then((imgs) => {
      console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    original_price: '',
    discount_price: '',
    image: '',
    is_deleted: false,
    status: null,
    is_finish: false,
    category_id: ''
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await api.get('http://localhost:8080/category/get/all');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
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
      const res = await api.post(`/course/user/${user.user_id}`, formData);
      const courseId = res.data.data.course_id
      toast.success('Tạo khóa học thành công !');
      navigate('/content-manager/update/'+courseId);
    } catch (err) {
      console.error('Error adding course:', err);
      toast.error('Error creating course. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate discount_price is smaller than original_price
    if (name === 'original_price' || name === 'discount_price') {
      const original_price = name === 'original_price' ? value : formData.original_price;
      const discount_price = name === 'discount_price' ? value : formData.discount_price;

      if (original_price && discount_price && parseFloat(discount_price) >= parseFloat(original_price)) {
        setFormErrors({
          ...formErrors,
          discount_price: 'Giá khuyến mãi phải nhỏ hơn giá gốc'
        });
      } else {
        setFormErrors({
          ...formErrors,
          discount_price: ''
        });
      }
    }
    if (name === 'course_title') {
      const alphanumericRegex = /^[a-zA-Z0-9]*$/;
      if (!alphanumericRegex.test(value)) {
        setFormErrors({
          ...formErrors,
          course_title: 'Title can only contain alphanumeric characters without spaces or special characters'
        });
      } else {
        setFormErrors({
          ...formErrors,
          course_title: ''
        });
      }
    }
  };
  console.log(formData)
  return (
    <div className="antialiased bg-orange-50 w-full min-h-screen relative py-4">
      <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
        {/* Menu */}
        <Menu />
        {/* Content */}
        <div id="content" className="bg-black/10 col-span-9 rounded-lg p-6">
          <div className="bg-white/15 flex items-center justify-center py-12">
            <div className="mx-auto w-full max-w-[1180px]">
              <div className="text-6xl font-bold text-center mb-10 text-gray-800">
                Tạo khóa học mới
              </div>
              <div className={'flex justify-between'}>
                <div className="flex flex-col items-center space-y-4 border border-gray-200 rounded-lg shadow-md max-w-md mx-auto bg-white">
                  <label className="block text-sm font-medium text-gray-700 mt-5">
                    Tải ảnh khóa học
                  </label>
                  <div className="flex w-full p-1 items-center justify-center bg-grey-lighter">
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
                      onClick={handleUploadImg}
                      className="mt-4 px-4 py-2 bg-mathcha-green text-white rounded-lg hover:bg-black transition duration-200"
                  >
                    Chọn ảnh này
                  </button>
                  {imgUrl && (
                      <div className="my-4">
                        <img
                            src={imgUrl}
                            alt="Selected"
                            className="rounded-lg shadow-md mb-4"
                            style={{height: '200px', width: '200px', objectFit: 'cover'}}
                        />
                      </div>
                  )}
                </div>
                <div>
                  <form onSubmit={handleAddCourse} className={'mr-7'}>
                    <div className="mb-5">
                      <label htmlFor="title" className="mb-1 ml-1 block text-base font-medium text-gray-800">
                        Tên khóa học
                      </label>
                      <input
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Tên khóa học"
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {formErrors.title && <span className="text-red-500">{formErrors.title}</span>}
                    </div>
                    <div className="mb-5">
                      <label htmlFor="description" className="mb-1 ml-1 block text-base font-medium text-gray-800">
                        Mô tả
                      </label>
                      <input
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Mô tả"
                          value={formData.description}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {formErrors.description && <span className="text-red-500">{formErrors.description}</span>}
                    </div>
                    <div className="flex justify-between mb-5 gap-10">
                      <div>
                        <label htmlFor="original_price" className="mb-1 ml-1 block text-base font-medium text-gray-800">
                          Giá gốc
                        </label>
                        <input
                            type="number"
                            name="original_price"
                            id="original_price"
                            placeholder="Giá gốc"
                            value={formData.original_price}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formErrors.original_price && <span className="text-red-500">{formErrors.original_price}</span>}
                      </div>
                      <div className={'max-w-64'}>
                        <label htmlFor="discount_price" className="mb-1 ml-1 block text-base font-medium text-gray-800">
                          Giá khuyến mãi
                        </label>
                        <input
                            type="number"
                            name="discount_price"
                            id="discount_price"
                            placeholder="Giá khuyến mãi"
                            value={formData.discount_price}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formErrors.discount_price && <span className="text-red-500">{formErrors.discount_price}</span>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="category_id" className="mb-1 ml-1 block text-base font-medium text-gray-800">
                        Category
                      </label>
                      <select
                          name="category_id"
                          id="category_id"
                          value={formData.category_id}
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                              {category.category_name}
                            </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button
                          className="mt-5 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                        Duyệt bài
                      </button>
                      {/* {error && <div className="text-red-500 mt-2">{error}</div>} */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
