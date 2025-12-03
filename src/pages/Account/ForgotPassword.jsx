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
    // DEĞİŞİKLİK 1: Zemin Slate-900 (Diğer sayfalarla aynı)
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-900 text-slate-300 px-4 relative overflow-hidden py-10 selection:bg-sky-500 selection:text-white">
      
      {/* Arka plan süslemeleri (Sky ve Indigo tonları - Login/Register ile uyumlu) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* --- CAM EFEKTLİ KART --- */}
      {/* bg-slate-800/50, border-slate-700/50 */}
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 md:p-10 relative z-10 ring-1 ring-white/5">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Şifremi Unuttum</h2>
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
              // Input: Karttan bir ton koyu (Slate-900/50), Sky-500 Focus
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600"
            />
          </div>

          {/* Buton: Sky-600 */}
          <button className="w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-sky-500/25 mt-2 bg-sky-600 hover:bg-sky-500 active:scale-[0.98]">
            Sıfırlama Linki Gönder
          </button>
        </form>

        {/* Geri Dön Linki */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center text-sm">
          <Link to="/login" className="text-slate-400 hover:text-sky-400 flex items-center justify-center gap-2 transition group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Giriş sayfasına dön
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword