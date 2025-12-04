import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

// API Adresini buraya veya env'den al
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const PrivateRoute = ({ children }) => {
  const { user, logout, loading: authLoading } = useAuth(); // Context verileri
  const [isVerified, setIsVerified] = useState(null); // Backend doğrulama durumu
  
  useEffect(() => {
    // Eğer AuthContext hala yükleniyorsa bekle
    if (authLoading) return;

    // Kullanıcı hiç yoksa veya admin değilse direkt reddet
    if (!user || user.role !== 'admin') {
        setIsVerified(false);
        return;
    }

    const verifyAdmin = async () => {
      try {
        // --- KRİTİK KISIM: BACKEND KONTROLÜ ---
        await axios.get(`${API_BASE_URL}/users`, {
            headers: { token: user.token } 
        });
        // Hata vermezse admindir
        setIsVerified(true);

      } catch (error) {
        console.error("Admin yetkisi doğrulanamadı", error);
        logout(); // Context üzerinden çıkış yap
        setIsVerified(false);
      }
    };

    verifyAdmin();
  }, [user, authLoading, logout]);

  // 1. Durum: Context yükleniyor veya Backend doğrulaması sürüyor
  if (authLoading || isVerified === null) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="text-indigo-600 font-semibold animate-pulse">
                Yetki kontrol ediliyor...
            </div>
        </div>
    );
  }

  // 2. Durum: Yetkisiz
  if (isVerified === false) {
    return <Navigate to="/login" replace />;
  }

  // 3. Durum: Yetkili
  return children;
};

export default PrivateRoute;