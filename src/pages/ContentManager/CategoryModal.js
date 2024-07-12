// CategoryModal.js

import React, { useState, useEffect } from 'react';
import api from '../../config/axios';

const CategoryModal = ({ closeModal }) => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');

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

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) {
            return; // Don't create a category if the name is empty
        }
        try {
            await api.post('http://localhost:8080/category/create', { category_name: newCategoryName });
            const updatedCategories = await api.get('http://localhost:8080/category/get/all');
            setCategories(updatedCategories.data.data);
            setNewCategoryName(''); // Clear the input field
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Danh sách lớp</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">&times;</button>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Tạo lớp mới"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button
                        onClick={handleCreateCategory}
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Tạo lớp
                    </button>
                </div>
                <ul className="mt-4">
                    {categories.map((category) => (
                        <li key={category.category_id} className="border-b border-gray-300 py-2">
                            {category.category_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryModal;

