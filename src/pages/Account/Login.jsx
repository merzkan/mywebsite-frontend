import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';


  const navigate = useNavigate();

  // "email" yerine genel bir isim olan "identifier" (tanımlayıcı) kullanıyoruz
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Backend'e "identifier" adıyla gönderiyoruz
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        identifier: identifier, 
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
      setLoading(false);

    } catch (err) {
      setLoading(false);
      setError("Giriş başarısız! Bilgileri kontrol ediniz.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Giriş Yap</h2>
          <p className="text-gray-500 mt-2">Hesabınıza erişmek için bilgilerinizi girin.</p>
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* DEĞİŞİKLİK BURADA: E-posta veya Kullanıcı Adı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta veya Kullanıcı Adı</label>
            <input 
              type="text" // 'email' yerine 'text' yaptık ki kullanıcı adı da yazılabilsin
              placeholder="kullaniciadi veya ornek@mail.com" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Şifremi Unuttum?</Link>
            </div>
          </div>

          {/* Buton */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition shadow-md ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Alt Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Hesabın yok mu? {' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Hemen Kayıt Ol
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login;