import React, { useState, useEffect } from 'react';
import { updateUser } from '../../api/userApi';

const UserSetting = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    title: 'Yazılım Geliştirici',
    about: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData({
        username: storedUser.username || '',
        name: storedUser.name || '',
        surname: storedUser.surname || '',
        email: storedUser.email || '',
        title: storedUser.title || '',
        about: storedUser.about || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage({ type: '', text: '' });

      try {
          const currentUser = JSON.parse(localStorage.getItem("user"));
          const userId = currentUser._id; 

          const updatedData = {
              userId: userId,
              name: formData.name,
              surname: formData.surname,
              title: formData.title,
              about: formData.about
          };

          const res = await updateUser(userId, updatedData);

          const newLocalStorageData = { ...currentUser, ...res };
          localStorage.setItem("user", JSON.stringify(newLocalStorageData));

          setLoading(false);
          setMessage({ type: 'success', text: 'Bilgiler başarıyla güncellendi!' });

      } catch (err) {
          setLoading(false);
          console.error("Güncelleme hatası:", err);
          setMessage({ type: 'error', text: 'Güncelleme sırasında bir hata oluştu.' });
      }
  };

  return (
    // DEĞİŞİKLİK 1: Zemin Slate-900
    <div className="min-h-[calc(100vh-4rem)] bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 flex justify-center selection:bg-sky-500 selection:text-white">
      
      {/* DEĞİŞİKLİK 2: Kart Slate-800 */}
      <div className="max-w-5xl w-full bg-slate-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden flex flex-col border border-slate-700/50">
        
        {/* Başlık Alanı - Slate-950 */}
        <div className="bg-slate-950 px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-700/50">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100">Hesap Ayarları</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Profil bilgilerinizi buradan yönetebilirsiniz.</p>
        </div>

        {/* İçerik Alanı */}
        <div className="flex flex-col md:flex-row">
            
            {/* Sol Taraf (Profil Özeti) - Slate-900/30 */}
            <div className="w-full md:w-1/3 bg-slate-900/30 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-slate-700/50">
              <div className="relative group">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Profil" 
                  // Profil resmi kenarlığı Slate-700
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-slate-700 shadow-md group-hover:border-sky-500 transition-colors duration-300"
                />
              </div>
              <h3 className="mt-4 font-bold text-slate-100 text-lg">{formData.name} {formData.surname}</h3>
              <p className="text-sm text-sky-400 font-medium">{formData.title}</p>
            </div>

            {/* Sağ Taraf (Form) */}
            <div className="w-full md:w-2/3 p-6 sm:p-8">
              
              {message.text && (
                <div className={`mb-4 p-3 rounded-lg text-sm border ${message.type === 'success' ? 'bg-green-500/10 text-green-200 border-green-500/20' : 'bg-red-500/10 text-red-200 border-red-500/20'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Ad</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition-all placeholder-slate-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Soyad</label>
                    <input 
                        type="text" 
                        name="surname" 
                        value={formData.surname} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition-all placeholder-slate-600" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Kullanıcı Adı (Değiştirilemez)</label>
                    <input 
                        type="text" 
                        value={formData.username} 
                        disabled 
                        className="w-full px-3 py-2 border border-slate-800 rounded-lg bg-slate-900 text-slate-500 text-sm cursor-not-allowed opacity-70" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">E-posta (Değiştirilemez)</label>
                    <input 
                        type="email" 
                        value={formData.email} 
                        disabled 
                        className="w-full px-3 py-2 border border-slate-800 rounded-lg bg-slate-900 text-slate-500 text-sm cursor-not-allowed opacity-70" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Ünvan / Meslek</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Örn: Yazılım Mühendisi" 
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition-all placeholder-slate-600" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Hakkımda</label>
                  <textarea 
                    name="about" 
                    rows="4" 
                    value={formData.about} 
                    onChange={handleChange} 
                    placeholder="Kendinizden bahsedin..." 
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition-all resize-none placeholder-slate-600"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-700/50">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className={`px-8 py-2.5 rounded-lg font-bold text-white text-sm shadow-lg transition-all hover:scale-105 ${loading ? 'bg-slate-600 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-500 hover:shadow-sky-500/30'}`}
                  >
                    {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                  </button>
                </div>

              </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;