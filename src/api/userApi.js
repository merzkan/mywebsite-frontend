import axios from "axios";

// API Adresi
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// MEVCUT GET FONKSİYONUN (Aynen kalabilir)
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

// --- YENİ EKLENENLER ---

// 1. KULLANICI SİLME (DELETE)
export const deleteUser = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = { headers: { token: user?.token } };

        // /users/:id adresine DELETE isteği atıyoruz
        const response = await axios.delete(`${API_BASE_URL}/users/${id}`, config);
        
        return response.data;
    } catch (error) {
        console.error("Kullanıcı silinirken hata:", error);
        throw error;
    }
};

// 2. KULLANICI GÜNCELLEME (UPDATE - Name, Surname, Password)
export const updateUser = async (id, updatedData) => {
    // updatedData şuna benzer bir obje olmalı: { name: "Ali", surname: "Yılmaz", password: "yeniSifre123" }
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = { headers: { token: user?.token } };

        // /users/:id adresine PUT isteği atıyoruz ve yeni veriyi gönderiyoruz
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, updatedData, config);
        
        return response.data;
    } catch (error) {
        console.error("Kullanıcı güncellenirken hata:", error);
        throw error;
    }
};