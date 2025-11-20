import { Link } from 'react-router-dom' 

const BlogDetail = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Kapak Görseli */}
      <div className="h-[400px] w-full relative bg-gray-900">
        <img 
          src="/project.avif" 
          alt="Kapak" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
            Teknoloji
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight shadow-black drop-shadow-lg">
            React ve Tailwind ile Modern Web Tasarımı 
          </h1>
          <div className="flex items-center text-gray-200 mt-6 space-x-4">
            <span className="flex items-center"><span className="mr-2">🗓</span> 19 Kasım 2025</span>
            <span className="flex items-center"><span className="mr-2">⏱</span> 5 dk okuma</span>
          </div>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="container mx-auto px-4 max-w-3xl -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          
          {/* Yazar Bilgisi */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                ÖK
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Ömer K.</h4>
                <p className="text-sm text-gray-500">Full Stack Developer</p>
              </div>
            </div>
          </div>

          {/* Makale İçeriği */}
          <article className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
            <p className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-blue-600">
              L
              orem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. 
              Cras venenatis euismod malesuada. Nullam ac odio ante. Modern web teknolojileri her geçen gün gelişiyor.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Neden React?</h2>
            <p className="mb-6">
              React, component tabanlı yapısı sayesinde tekrar kullanılabilir kod blokları oluşturmanızı sağlar. 
              Bu da hem geliştirme sürecini hızlandırır hem de bakım maliyetlerini düşürür.
            </p>
            
            <blockquote className="border-l-4 border-blue-600 pl-4 italic my-8 text-gray-600 bg-gray-50 p-4 rounded-r">
              "Yazılım, sadece kod yazmak değil, problemleri en zarif şekilde çözmektir."
            </blockquote>
          </article>

          {/* Geri Dön */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
             <Link to="/blog" className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold">
               ← Tüm Yazılara Dön
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BlogDetail