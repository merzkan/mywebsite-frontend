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
    
    // Simüle edilmiş API isteği başarısı
    setMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi! Lütfen kutunuzu kontrol edin.');
    
    setEmail('');
  };

  return (
    // Ana Konteyner: Koyu gradyan ve konumlandırma
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white px-4 relative overflow-hidden py-10">
      
      {/* Arka plan süslemeleri (Işıltı) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* --- CAM EFEKTLİ KART (GLASSMORPHISM) --- */}
      <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 relative z-10">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Şifremi Unuttum</h2>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed">
            Hesabına kayıtlı e-posta adresini gir, sana sıfırlama bağlantısını gönderelim.
          </p>
        </div>

        {/* Başarı Mesajı */}
        {message && (
          <div className="mb-6 p-4 bg-green-500/10 text-green-200 border border-green-500/20 rounded-xl text-sm text-center shadow-lg shadow-green-900/20">
            {message}
          </div>
        )}

        {/* Hata Mesajı */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 text-red-200 border border-red-500/20 rounded-lg text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">E-posta Adresi</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com" 
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-slate-500"
            />
          </div>

          <button className="w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-blue-500/25 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98]">
            Sıfırlama Linki Gönder
          </button>
        </form>

        {/* Geri Dön Linki */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm">
          <Link to="/login" className="text-slate-400 hover:text-white flex items-center justify-center gap-2 transition group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Giriş sayfasına dön
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword