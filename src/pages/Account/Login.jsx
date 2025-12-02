import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
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
    // Arka plan gradyanı (Hakkımda sayfasıyla uyumlu)
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white px-4 relative overflow-hidden">
      
      {/* Arka plan süslemeleri (Opsiyonel Işıltı) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* --- CAM EFEKTLİ KART (GLASSMORPHISM) --- */}
      <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 relative z-10">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Tekrar Hoşgeldin</h2>
          <p className="text-slate-400 mt-2 text-sm">Hesabına erişmek için bilgilerini gir.</p>
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 text-red-200 border border-red-500/20 rounded-lg text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* E-posta veya Kullanıcı Adı */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">E-posta veya Kullanıcı Adı</label>
            <div className="relative">
                <input 
                type="text" 
                placeholder="kullaniciadi" 
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-slate-500"
                onChange={(e) => setIdentifier(e.target.value)}
                />
            </div>
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Şifre</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-slate-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end mt-2">
                <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition hover:underline">Şifremi Unuttum?</Link>
            </div>
          </div>

          {/* Buton */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-blue-500/25 ${
              loading 
                ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98]'
            }`}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Alt Link */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-slate-400">
          Hesabın yok mu? {' '}
          <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition">
            Hemen Kayıt Ol
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login;