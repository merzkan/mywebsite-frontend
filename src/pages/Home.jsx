import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import ProjectCard from '../components/ProjectCard'
import { useBlogContext } from '../context/BlogContext'
import { useProjectContext } from '../context/ProjectContext'

const Home = () => {
  const { allProjects, loading: loadingProjects, error: errorProjects } = useProjectContext();
  const { allBlogs, loading: loadingBlogs, error: errorBlogs } = useBlogContext();
  const isLoading = loadingProjects || loadingBlogs;

  const publishedProjects = allProjects ? allProjects.filter(p => p.isPublished === true) : [];
  const publishedBlogs = allBlogs ? allBlogs.filter(b => b.isPublished === true) : [];

  const latestProjects = publishedProjects.slice(0, 3);
  const latestBlogs = publishedBlogs.slice(0, 3);
  // -------------------------

  if (isLoading) {
      // Yükleniyor ekranını da temaya uygun hale getirdim
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
            <div className="text-xl font-medium animate-pulse">Veriler yükleniyor...</div>
        </div>
      );
  }
  if (errorProjects || errorBlogs) {
      const errorMessage = errorProjects || errorBlogs || "Veriler yüklenirken bir hata oluştu.";
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
            <div className="text-red-200 bg-red-900/50 p-6 rounded-xl border border-red-500/30 text-xl font-medium">
                {errorMessage}
            </div>
        </div>
      );
  }

  return (
    // ANA KAPLAYICI: Arka plan gradyanı burada
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white min-h-screen selection:bg-pink-500 selection:text-white">
      
      {/* HERO SECTION 
          calc(100vh - 80px): Ekran boyundan navbar yüksekliğini (80px) çıkarır. 
          Böylece scroll oluşmadan tam ekran oturur.
      */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden py-10 md:py-0">
        
        {/* Dekoratif Arka Plan Işıkları */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Sol: Yazı Alanı */}
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Merhaba, Ben Ömer Özkan Özdil
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-xl">
              Kod yazmayı ve <br className="hidden md:block"/>
              {/* Gradient Text: Arka plan koyu olduğu için açık renk gradient */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-pink-300">
                paylaşmayı
              </span> seviyorum.
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/90 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-light">
              Modern web teknolojileri, React, Node.js ve yazılım dünyasına dair 
              tecrübelerimi paylaştığım kişisel alanıma hoş geldin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/project" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition duration-300 shadow-xl shadow-blue-900/20">
                Projelerimi İncele
              </Link>
              <Link to="/blog" className="px-8 py-4 bg-white/5 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 backdrop-blur-sm transition duration-300">
                Yazılarımı Oku
              </Link>
            </div>
          </div>

          {/* Sağ: Görsel Alanı */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 group">
                {/* Resim Arkasındaki Hareketli Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 rounded-[2rem] rotate-6 group-hover:rotate-12 transition duration-500 opacity-60 blur-md"></div>
                
                {/* Resim Container - Glass Effect */}
                <div className="relative w-full h-full bg-slate-900/30 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl rotate-0 hover:rotate-3 transition duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Profil" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-500"
                  />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORİLER / TEKNİK YETKİNLİKLER */}
      <section className="py-24 bg-black/10 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Neler Üzerine Çalışıyorum?</h2>
              <p className="text-blue-200/80">Full-stack geliştirme sürecimde odaklandığım ana teknolojiler ve alanlar.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Kartlar için bir döngü yapısı veya manuel tek tek kartlar - Glass Style */}
              
              {/* Frontend Card */}
              <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 shadow-lg group">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300">
                    ⚛️
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Frontend Development</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">
                    React, Vite, Tailwind CSS kullanarak modern, hızlı ve responsive kullanıcı arayüzleri tasarlıyorum.
                </p>
              </div>

              {/* Backend Card */}
              <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 shadow-lg group">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300">
                    🚀
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Backend & Database</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">
                    Node.js ve Express ile güvenli API'lar geliştirip, MongoDB ile verimli veri yapıları kuruyorum.
                </p>
              </div>

              {/* Career Card */}
              <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 shadow-lg group">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300">
                    💡
                </div>
                <h3 className="font-bold text-xl text-white mb-3">Sürekli Öğrenme</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">
                    İngilizce pratiği, yeni teknolojiler ve yazılım dünyasındaki güncel trendleri takip ediyorum.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* SON YAZILAR */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Son Yazılarım</h2>
            <p className="text-blue-200/80">Teknoloji ve deneyimlerime dair notlar.</p>
          </div>
          <Link to="/blog" className="text-blue-300 font-semibold hover:text-white flex items-center gap-1 group transition-colors">
            Tümünü Gör 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        
        {latestBlogs.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-12 text-center border border-white/10 border-dashed">
            <p className="text-blue-200/60">Henüz yayınlanmış yazı bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </section>

      {/* SON PROJELER */}
      <section className="py-24 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Öne Çıkan Projeler</h2>
                <p className="text-blue-200/80">Geliştirdiğim full-stack uygulamalar.</p>
              </div>
              <Link to="/project" className="text-blue-300 font-semibold hover:text-white flex items-center gap-1 group transition-colors">
                Tümünü Gör 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            
            {latestProjects.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-12 text-center border border-white/10 border-dashed">
                <p className="text-blue-200/60">Henüz yayınlanmış proje bulunmamaktadır.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
        </div>
      </section>
    </div>
  )
}

export default Home