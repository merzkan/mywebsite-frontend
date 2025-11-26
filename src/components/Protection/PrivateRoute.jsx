import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// API Adresini buraya veya env'den al
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = kontrol ediliyor
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        
        if (!storedUser) {
          setIsAuthenticated(false);
          return;
        }

        const user = JSON.parse(storedUser);

        // Eğer localStorage'da bile admin değilse direkt reddet
        if (user.role !== 'admin') {
            setIsAuthenticated(false);
            return;
        }

        // --- KRİTİK KISIM: BACKEND KONTROLÜ ---
        // Backend'e geçerli bir istek atarak token'ın ve rolün gerçekliğini sınıyoruz.
        // /users sadece adminlere açık olduğu için bu harika bir testtir.
        await axios.get(`${API_BASE_URL}/users`, {
            headers: { token: user.token } 
        });

        // Eğer yukarıdaki satır hata vermezse, kişi gerçekten admindir.
        setIsAuthenticated(true);

      } catch (error) {
        // Hata verdiyse (401 veya 403), token geçersiz veya sahtedir.
        console.error("Admin yetkisi doğrulanamadı", error);
        localStorage.removeItem("user"); // Sahte/süresi bitmiş veriyi temizle
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // 1. Durum: Henüz kontrol bitmedi, Yükleniyor ekranı göster (Beyaz ekran yerine)
  if (isAuthenticated === null) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="text-indigo-600 font-semibold animate-pulse">
                Yetki kontrol ediliyor...
            </div>
        </div>
    );
  }

  // 2. Durum: Kontrol bitti ve yetkisiz -> Giriş sayfasına at
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  // 3. Durum: Her şey yolunda -> Admin panelini göster
  return children;
};

export default PrivateRoute;