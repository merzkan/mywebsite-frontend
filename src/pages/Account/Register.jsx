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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Kayıt Ol</h2>
          <p className="text-gray-500 mt-2">Blog dünyasına katılmak için hesap oluştur.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Kullanıcı Adı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="kullaniciadi123" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Ad ve Soyad Yanyana */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
              <input 
                type="text" name="name"
                value={formData.name} onChange={handleChange}
                placeholder="Adınız" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
              <input 
                type="text" name="surname"
                value={formData.surname} onChange={handleChange}
                placeholder="Soyadınız" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@mail.com" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Şifre Tekrar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre Tekrar</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••" 
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition ${
                error.includes('Parola') ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
          </div>

          
          <button 
            type="submit"
            disabled={loading} 
            className={`w-full py-3 rounded-lg font-semibold text-white transition shadow-md ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'  
            }`}
          >
            {loading ? "İşleniyor..." : "Hesap Oluştur"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Zaten hesabın var mı? {' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Giriş Yap
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register;