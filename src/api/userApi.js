import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const getUsers = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = { headers: { token: user?.token } };
        const response = await axios.get(`${API_BASE_URL}/users`, config);
        return response.data;
    } catch (error) {
        console.error("Kullanıcıları çekerken hata oluştu:", error);
        throw error; 
    }
}


export const deleteUser = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = { headers: { token: user?.token } };

        const response = await axios.delete(`${API_BASE_URL}/users/${id}`, config);
        
        return response.data;
    } catch (error) {
        console.error("Kullanıcı silinirken hata:", error);
        throw error;
    }
};

export const updateUser = async (id, updatedData) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = { headers: { token: user?.token } };

        const response = await axios.put(`${API_BASE_URL}/users/${id}`, updatedData, config);
        
        return response.data;
    } catch (error) {
        console.error("Kullanıcı güncellenirken hata:", error);
        throw error;
    }
};