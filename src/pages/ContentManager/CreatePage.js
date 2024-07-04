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
    is_finish: false
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
      toast.success('Tạo khóa học thành công !');
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
  console.log(formData);
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
                Tạo khóa học mới
              </div>
              <form onSubmit={handleAddCourse}>
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
                  <div>
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
                    <label htmlFor="discount_price" className="mb-1 ml-1 block text-base font-medium text-gray-800">
                      Hình ảnh
                    </label>
                  <input type="file" onChange={(e) => setImg(e.target.files[0])} />
                  <button type="button" className='p-2 rounded-2xl bg-mathcha font-bold' onClick={handleUploadImg}>Upload</button>
                  <div>
                    {
                      imgUrl ? (
                        <img src={imgUrl} height="200px" width="200px" alt="Uploaded" />
                      ) : (
                        <></>
                      )
                    }                   
                  </div>
                </div>
                <div>
                  <button className="mt-5 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
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
  )
}
