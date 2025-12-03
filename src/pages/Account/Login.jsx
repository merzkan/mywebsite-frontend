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
    // DEĞİŞİKLİK 1: Zemin Rengi Slate-900 (Home ve About ile aynı)
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-900 text-slate-300 px-4 relative overflow-hidden selection:bg-sky-500 selection:text-white">
      
      {/* DEĞİŞİKLİK 2: Arka plan süslemeleri (Sky ve Indigo tonları - About ile uyumlu) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* --- KART YAPISI --- 
          Glassmorphism korundu ama renkler Slate-800 bazlı yapıldı.
      */}
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 md:p-10 relative z-10 ring-1 ring-white/5">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Tekrar Hoşgeldin</h2>
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
                {/* Input: Slate-900/50 (Karttan daha koyu) - Focus: Sky-500 */}
                <input 
                type="text" 
                placeholder="kullaniciadi" 
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600"
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
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end mt-2">
                {/* Link Rengi: Sky-400 */}
                <Link to="/forgot-password" className="text-xs text-sky-400 hover:text-sky-300 transition hover:underline">Şifremi Unuttum?</Link>
            </div>
          </div>

          {/* Buton - Home sayfasındaki buton stili (Sky-600) */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-sky-500/25 ${
              loading 
                ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                : 'bg-sky-600 hover:bg-sky-500 active:scale-[0.98]'
            }`}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Alt Link */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center text-sm text-slate-400">
          Hesabın yok mu? {' '}
          <Link to="/register" className="text-sky-400 font-semibold hover:text-sky-300 hover:underline transition">
            Hemen Kayıt Ol
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login;