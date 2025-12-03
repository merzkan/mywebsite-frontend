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
      return (
        // Loading Ekranı: Slate-900 zemin, Sky-500 vurgu
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
                <div className="text-xl font-medium text-slate-300 animate-pulse">Veriler yükleniyor...</div>
            </div>
        </div>
      );
  }
  if (errorProjects || errorBlogs) {
      const errorMessage = errorProjects || errorBlogs || "Veriler yüklenirken bir hata oluştu.";
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="text-red-200 bg-red-900/20 p-6 rounded-xl border border-red-500/20 text-xl font-medium max-w-md text-center">
                {errorMessage}
            </div>
        </div>
      );
  }

  return (
    // ANA KAPLAYICI: Slate-900 Zemin
    <div className="bg-slate-900 text-slate-300 min-h-screen selection:bg-sky-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden py-10 md:py-0 border-b border-slate-800/50">
        
        {/* Dekoratif Arka Plan Işıkları (Daha yumuşak Sky ve Indigo tonları) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Sol: Yazı Alanı */}
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 text-sky-400 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              Merhaba, Ben Ömer Özkan Özdil
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-slate-50">
              Kod yazmayı ve <br className="hidden md:block"/>
              {/* Gradient Text: Sky to Indigo */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                paylaşmayı
              </span> seviyorum.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-light">
              Modern web teknolojileri, React, Node.js ve yazılım dünyasına dair 
              tecrübelerimi paylaştığım kişisel alanıma hoş geldin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/project" className="px-8 py-4 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/20 transition duration-300">
                Projelerimi İncele
              </Link>
              <Link to="/blog" className="px-8 py-4 bg-slate-800 border border-slate-700 text-slate-300 font-medium rounded-xl hover:bg-slate-700 hover:text-white transition duration-300">
                Yazılarımı Oku
              </Link>
            </div>
          </div>

          {/* Sağ: Görsel Alanı */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 group">
                {/* Resim Arkasındaki Hareketli Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-[2rem] rotate-6 group-hover:rotate-12 transition duration-500 opacity-20 blur-xl"></div>
                
                {/* Resim Container - Slate Border */}
                <div className="relative w-full h-full bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-700 shadow-2xl rotate-0 hover:rotate-3 transition duration-500">
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
      <section className="py-24 bg-slate-900 border-b border-slate-800/50">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Neler Üzerine Çalışıyorum?</h2>
              <p className="text-slate-400">Full-stack geliştirme sürecimde odaklandığım ana teknolojiler ve alanlar.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Frontend Card */}
              <div className="p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300 ring-1 ring-slate-600">
                    ⚛️
                </div>
                <h3 className="font-bold text-xl text-slate-100 mb-3">Frontend Development</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    React, Vite, Tailwind CSS kullanarak modern, hızlı ve responsive kullanıcı arayüzleri tasarlıyorum.
                </p>
              </div>

              {/* Backend Card */}
              <div className="p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300 ring-1 ring-slate-600">
                    🚀
                </div>
                <h3 className="font-bold text-xl text-slate-100 mb-3">Backend & Database</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Node.js ve Express ile güvenli API'lar geliştirip, MongoDB ile verimli veri yapıları kuruyorum.
                </p>
              </div>

              {/* Career Card */}
              <div className="p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-300 ring-1 ring-slate-600">
                    💡
                </div>
                <h3 className="font-bold text-xl text-slate-100 mb-3">Sürekli Öğrenme</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    İngilizce pratiği, yeni teknolojiler ve yazılım dünyasındaki güncel trendleri takip ediyorum.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* SON YAZILAR */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-50 mb-2">Son Yazılarım</h2>
                <p className="text-slate-400">Teknoloji ve deneyimlerime dair notlar.</p>
            </div>
            <Link to="/blog" className="text-sky-400 font-semibold hover:text-sky-300 flex items-center gap-1 group transition-colors">
                Tümünü Gör 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            </div>
            
            {latestBlogs.length === 0 ? (
            <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700 border-dashed">
                <p className="text-slate-500">Henüz yayınlanmış yazı bulunmamaktadır.</p>
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
            )}
        </div>
      </section>

      {/* SON PROJELER - Hafif ton farkı için slate-950 */}
      <section className="py-24 border-t border-slate-800 bg-slate-900">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-50 mb-2">Öne Çıkan Projeler</h2>
                <p className="text-slate-400">Geliştirdiğim full-stack uygulamalar.</p>
              </div>
              <Link to="/project" className="text-sky-400 font-semibold hover:text-sky-300 flex items-center gap-1 group transition-colors">
                Tümünü Gör 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            
            {latestProjects.length === 0 ? (
              <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700 border-dashed">
                <p className="text-slate-500">Henüz yayınlanmış proje bulunmamaktadır.</p>
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