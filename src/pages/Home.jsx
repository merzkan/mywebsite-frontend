import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import ProjectCard from '../components/ProjectCard'

const Home = () => {
  return (
    <div>
      {/* HERO SECTION: Vitrin Alanı */}
      <section className="bg-white py-20 md:py-32 border-b">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          
          {/* Sol: Yazı Alanı */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
              Merhaba, Ben Ömer Özkan Özdil
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-4 leading-tight">
              Kod yazmayı ve <span className="text-blue-600">paylaşmayı</span> seviyorum.
            </h1>
            <p className="text-lg text-gray-600 mt-6 mb-8 leading-relaxed">
              Modern web teknolojileri, React, Node.js ve yazılım dünyasına dair 
              tecrübelerimi paylaştığım kişisel alanıma hoş geldin.
            </p>
          </div>

          {/* Sağ: Görsel Alanı (İleride kendi fotonu koyarsın) */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Buraya kendi fotoğrafını koyabilirsin, şimdilik placeholder */}
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Profil" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORİLER / NELER VAR? */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
           <h2 className="text-2xl font-bold text-center mb-10">Nelerden Bahsediyorum?</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kutu 1 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                <div className="text-4xl mb-4">⚛️</div>
                <h3 className="font-bold text-xl mb-2">Frontend</h3>
                <p className="text-gray-500 text-sm">React, Vue, Tailwind CSS ve modern UI tasarımları.</p>
              </div>
              {/* Kutu 2 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold text-xl mb-2">Backend</h3>
                <p className="text-gray-500 text-sm">Node.js, MongoDB ve API mimarileri üzerine notlar.</p>
              </div>
              {/* Kutu 3 */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="font-bold text-xl mb-2">Kariyer</h3>
                <p className="text-gray-500 text-sm">Yazılım sektörü, mülakatlar ve freelancer yaşamı.</p>
              </div>
           </div>
        </div>
      </section>

      {/* SON YAZILAR (Sadece 3 tane) */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Son Yazılar</h2>
          <Link to="/blog" className="text-blue-600 font-semibold hover:underline">Tümünü Gör →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </section>

      {/* SON PROJELER (Sadece 3 tane) */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Son Projeler</h2>
          <Link to="/project" className="text-blue-600 font-semibold hover:underline">Tümünü Gör →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </section>
    </div>
  )
}

export default Home