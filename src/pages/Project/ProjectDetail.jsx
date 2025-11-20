import { Link } from 'react-router-dom'

const ProjectDetail = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Üst Görsel (Hero) */}
      <div className="h-[400px] w-full relative bg-gray-900">
        <img 
          src="/project.avif"  
          alt="Proje Kapak" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Full Stack
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight drop-shadow-xl">
            E-Ticaret Dashboard Projesi
          </h1>
          <div className="flex gap-4 mt-8">
            <a href="#" className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition">Canlı Demo</a>
            {/* GÜNCELLENEN GITHUB BUTONU */}
            <a 
              href="https://github.com/merzkan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 text-white border border-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="container mx-auto px-4 max-w-4xl -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          {/* Proje Hakkında */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Proje Hakkında</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Bu proje, modern e-ticaret sitelerinin ihtiyaç duyduğu stok takibi, sipariş yönetimi ve müşteri analizlerini tek bir panelden yönetmeyi sağlar. 
              Gerçek zamanlı veri akışı ve kullanıcı dostu arayüzü ile işletme sahiplerine büyük kolaylık sunar.
            </p>
          </div>

          {/* Kullanılan Teknolojiler */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Kullanılan Teknolojiler</h3>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium border border-blue-100">React.js</span>
              <span className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg font-medium border border-yellow-100">JavaScript (ES6+)</span>
              <span className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium border border-green-100">Node.js & Express</span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-200">MongoDB</span>
              <span className="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg font-medium border border-cyan-100">Tailwind CSS</span>
            </div>
          </div>

          {/* Özellikler Listesi */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Öne Çıkan Özellikler</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-3 text-green-500">✓</span>
                JWT ile güvenli kimlik doğrulama
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-green-500">✓</span>
                Socket.io ile anlık bildirimler
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-green-500">✓</span>
                Mobil uyumlu responsive tasarım
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-green-500">✓</span>
                Karanlık/Aydınlık mod desteği
              </li>
            </ul>
          </div>

          {/* Geri Dön */}
          <div className="pt-8 border-t border-gray-100 text-center">
             <Link to="/project" className="inline-block text-blue-600 font-semibold hover:underline">
               ← Tüm Projelere Dön
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetail