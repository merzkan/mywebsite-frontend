import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  // previewImage state'ini kaldırdık çünkü artık değiştirme yapmıyoruz.
  // Resim kaynağını aşağıda img etiketine doğrudan vereceğiz.
  
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

  // handleImageChange fonksiyonunu kaldırdık (dosya seçimi yok).

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
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        
        {/* Başlık Alanı */}
        <div className="bg-gray-900 px-6 py-4 sm:px-8 sm:py-5">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Hesap Ayarları</h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Profil bilgilerinizi buradan yönetebilirsiniz.</p>
        </div>

        {/* İçerik Alanı */}
        <div className="flex flex-col md:flex-row">
            
            {/* SOL TARAF: Sadece Profil Fotoğrafı ve İsim (Yükleme butonu kaldırıldı) */}
            <div className="w-full md:w-1/3 bg-gray-50 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200">
              <div className="relative group">
                {/* Resim kaynağına (src) sabit bir link veya kullanıcının mevcut fotosunu koyabilirsin */}
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Profil" 
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-md"
                />
                
                {/* BURADAKİ LABEL, INPUT VE SVG İKONLARI KALDIRILDI */}
              </div>
              
              <h3 className="mt-4 font-bold text-gray-800 text-lg">{formData.name} {formData.surname}</h3>
              <p className="text-sm text-gray-500">{formData.title}</p>
              
              {/* "Fotoğrafı değiştirmek için..." yazısı da kaldırıldı */}
            </div>

            {/* SAĞ TARAF: FORM BİLGİLERİ (Aynen korundu) */}
            <div className="w-full md:w-2/3 p-6 sm:p-8">
              
              {message.text && (
                <div className={`mb-4 p-3 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Ad</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Soyad</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Kullanıcı Adı</label>
                    <input type="text" value={formData.username} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 text-sm cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">E-posta</label>
                    <input type="email" value={formData.email} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 text-sm cursor-not-allowed" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Ünvan / Meslek</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Örn: Yazılım Mühendisi" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Hakkımda</label>
                  <textarea name="about" rows="3" value={formData.about} onChange={handleChange} placeholder="Kendinizden bahsedin..." className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" disabled={loading} className={`px-6 py-2.5 rounded-lg font-bold text-white text-sm shadow transition hover:scale-105 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
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