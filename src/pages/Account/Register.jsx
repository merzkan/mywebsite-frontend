import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  // Form verilerini tutacak state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Hata mesajını tutacak state
  const [error, setError] = useState('');

  // Inputlar değiştiğinde çalışacak fonksiyon
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Kullanıcı yazarken hata mesajını temizleyelim
    if (error) setError('');
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfa yenilenmesini engelle

    // 1. Boş alan kontrolü
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Lütfen tüm alanları doldurunuz.');
      return;
    }

    // 2. Şifre Eşleşme Kontrolü
    if (formData.password !== formData.confirmPassword) {
      setError('Parolalar birbiriyle eşleşmiyor!');
      return;
    }

    // 3. Şifre Uzunluk Kontrolü
    if (formData.password.length < 6) {
      setError('Parola en az 6 karakter olmalıdır.');
      return;
    }

    // Her şey yolundaysa burası çalışır
    console.log('Kayıt Başarılı:', formData);
    alert('Kayıt işlemi başarılı! (Backend bağlanınca yönlendirme yapılacak)');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Kayıt Ol</h2>
          <p className="text-gray-500 mt-2">Blog dünyasına katılmak için hesap oluştur.</p>
        </div>

        {/* Hata Mesajı Kutusu (Varsa görünür) */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* İsim Soyisim */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınız Soyadınız" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Şifre Tekrar (YENİ ALAN) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre Tekrar</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••" 
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition ${
                error.includes('Parola') ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
          </div>

          {/* Buton */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
            Hesap Oluştur
          </button>
        </form>

        {/* Alt Link */}
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

export default Register