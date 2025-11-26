import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Lütfen e-posta adresinizi giriniz.');
      setMessage('');
      return;
    }

    setError('');
    console.log('Sıfırlama isteği gönderildi:', email);
    
    setMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi! Lütfen kutunuzu kontrol edin.');
    
    setEmail('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Şifremi Unuttum</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Hesabınıza kayıtlı e-posta adresinizi girin, size bir sıfırlama bağlantısı gönderelim.
          </p>
        </div>

        {/* Başarı Mesajı */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-200 rounded-lg text-sm text-center">
            {message}
          </div>
        )}

        {/* Hata Mesajı */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
            Sıfırlama Linki Gönder
          </button>
        </form>

        {/* Geri Dön Linki */}
        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="text-gray-600 hover:text-blue-600 flex items-center justify-center gap-1 transition">
            <span>←</span> Giriş sayfasına dön
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword