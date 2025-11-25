import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';


export const getBlogs = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/blogs`); 
        return response.data;
    }catch (error) {
        console.error("Blogları çekerken hata oluştu:", error);
        throw error; 
    }
}

export const getBlogById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blogs/${id}`); 
        return response.data;
    } catch (error) {
        console.error(`ID ${id} olan blogu çekerken hata oluştu:`, error);
        throw error;
    }
};

export const createBlog = async (blogData) => {
    try {
        // Admin olduğunu kanıtlamak için Token'ı al
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: { token: user?.token } 
        };

        const response = await axios.post(`${API_BASE_URL}/blogs/create`, blogData, config);
        return response.data;
    } catch (error) {
        console.error("Blog oluşturulurken hata:", error);
        // Hatayı fırlat ki frontend'de yakalayabilelim
        throw error.response?.data || error.message;
    }
};

// 2. Blog Silme (YENİ)
export const deleteBlog = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: { token: user?.token } 
        };

        // DELETE isteği
        const response = await axios.delete(`${API_BASE_URL}/blogs/${id}`, config);
        return response.data;
    } catch (error) {
        console.error("Blog silinirken hata:", error);
        throw error.response?.data || error.message;
    }
};

// 3. Blog Güncelleme (YENİ)
export const updateBlog = async (id, updatedData) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: { token: user?.token } 
        };

        // PUT isteği
        const response = await axios.put(`${API_BASE_URL}/blogs/${id}`, updatedData, config);
        return response.data;
    } catch (error) {
        console.error("Blog güncellenirken hata:", error);
        throw error.response?.data || error.message;
    }
};