import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '', 
    name: '',     
    surname: '',  
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    if (!formData.username || !formData.name || !formData.surname || !formData.email || !formData.password) {
      setError('Lütfen tüm alanları doldurunuz.');
      setLoading(false); 
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Parolalar birbiriyle eşleşmiyor!');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Parola en az 6 karakter olmalıdır.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        username: formData.username,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password
      });

      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      navigate("/login");
      setLoading(false); 

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Kayıt başarısız.");
      setLoading(false); 
    }
  };

  return (
    // DEĞİŞİKLİK 1: Zemin Slate-900 ve Sky vurgular
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-900 text-slate-300 px-4 relative overflow-hidden selection:bg-sky-500 selection:text-white">
      
      {/* Arka plan süslemeleri (Login.jsx ile uyumlu) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* --- CAM EFEKTLİ KART --- */}
      {/* Slate-800 zemin, Slate-700 border */}
      <div className="max-w-lg w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-6 relative z-10 ring-1 ring-white/5">
        
        {/* Başlık */}
        <div className="text-center mb-5">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Kayıt Ol</h2>
          <p className="text-slate-400 text-xs mt-1">Hemen hesabını oluştur.</p>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-500/10 text-red-200 border border-red-500/20 rounded text-xs text-center animate-pulse">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Kullanıcı Adı */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Kullanıcı Adı</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="kullaniciadi" 
              // Input: Karttan bir ton koyu (Slate-900/50) ve Sky Focus
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600 text-sm"
            />
          </div>

          {/* Ad ve Soyad Yanyana */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Ad</label>
              <input 
                type="text" name="name"
                value={formData.name} onChange={handleChange}
                placeholder="Adınız" 
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Soyad</label>
              <input 
                type="text" name="surname"
                value={formData.surname} onChange={handleChange}
                placeholder="Soyadınız" 
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600 text-sm"
              />
            </div>
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">E-posta</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@mail.com" 
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600 text-sm"
            />
          </div>

          {/* Şifreler Yanyana */}
          <div className="grid grid-cols-2 gap-3">
            <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Şifre</label>
                <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••" 
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600 text-sm"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tekrar</label>
                <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••" 
                className={`w-full px-3 py-2 bg-slate-900/50 border text-slate-200 rounded-lg focus:ring-2 outline-none transition placeholder-slate-600 text-sm ${
                    error.includes('Parola') 
                    ? 'border-red-500/50 focus:border-red-500' 
                    : 'border-slate-700 focus:ring-sky-500/50 focus:border-sky-500'
                }`}
                />
            </div>
          </div>

          {/* Buton - Sky-600 */}
          <div className="pt-2">
            <button 
                type="submit"
                disabled={loading} 
                className={`w-full py-3 rounded-xl font-bold text-white text-sm transition-all shadow-lg hover:shadow-sky-500/25 ${
                loading 
                    ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                    : 'bg-sky-600 hover:bg-sky-500 active:scale-[0.98]'
                }`}
            >
                {loading ? "İşleniyor..." : "Hesap Oluştur"}
            </button>
          </div>

        </form>

        <div className="mt-5 pt-4 border-t border-slate-700/50 text-center text-xs text-slate-400">
          Zaten hesabın var mı? {' '}
          <Link to="/login" className="text-sky-400 font-semibold hover:text-sky-300 hover:underline transition">
            Giriş Yap
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register;