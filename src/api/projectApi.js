import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';


export const getProjects = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/projects`);
        return response.data;
    }catch (error) {
        console.error("Projeleri çekerken hata oluştu:", error);
        throw error; 
    }
}

export const getProjectById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error(`ID ${id} olan projeyi çekerken hata oluştu:`, error);
        throw error;
    }
};

export const createProject = async (projectData) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: { token: user?.token } 
        };

        const response = await axios.post(`${API_BASE_URL}/projects/create`, projectData, config);
        return response.data;
    } catch (error) {
        console.error("Proje oluşturulurken hata:", error);
        throw error.response?.data || error.message;
    }
};

export const deleteProject = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: { token: user?.token } 
        };

        const response = await axios.delete(`${API_BASE_URL}/projects/${id}`, config);
        return response.data;
    } catch (error) {
        console.error("Proje silinirken hata:", error);
        throw error.response?.data || error.message;
    }
};

export const updateProject = async (id, updatedData) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: { token: user?.token } 
        };

        const response = await axios.put(`${API_BASE_URL}/projects/${id}`, updatedData, config);
        return response.data;
    } catch (error) {
        console.error("Proje güncellenirken hata:", error);
        throw error.response?.data || error.message;
    }
};