import { useParams, Link } from 'react-router-dom';
import { useProjectContext } from '../../context/ProjectContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const { allProjects, loading, error } = useProjectContext();

  const project = allProjects ? allProjects.find(p => p._id === id) : null;

  // --- Yükleniyor (Koyu Tema - Sky Animasyon) ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
            <div className="text-xl font-medium text-slate-300 animate-pulse">Proje Yükleniyor...</div>
        </div>
      </div>
    );
  }

  // --- Hata (Koyu Tema) ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
         <div className="text-red-200 bg-red-900/20 p-6 rounded-xl border border-red-500/20 text-xl font-medium">
            {error}
         </div>
      </div>
    );
  }

  // --- Proje Bulunamadı ---
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-400">
        <div className="text-xl border border-slate-700 p-8 rounded-xl border-dashed">Proje bilgisi bulunamadı.</div>
      </div>
    );
  }

  const { title, category, description, technologies, liveDemoUrl, githubUrl, feature, coverImageUrl } = project;

  return (
    // DEĞİŞİKLİK 1: Ana Arka Plan Slate-900
    <div className="bg-slate-900 text-slate-300 min-h-screen pb-20 selection:bg-sky-500 selection:text-white">
      
      {/* --- ÜST GÖRSEL (HERO) --- */}
      <div className="h-[500px] w-full relative bg-slate-800">
        {/* Gradyan: Şeffaftan Slate-900'a */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-900 z-10"></div>
        
        <img 
          src={coverImageUrl || "/project.avif"}  
          alt={title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20 pb-32">
          {/* Kategori Etiketi: Sky Temalı */}
          <span className="bg-slate-900/80 text-sky-400 border border-sky-500/30 px-4 py-1 rounded-full text-sm font-bold mb-6 backdrop-blur-md shadow-lg shadow-sky-900/20 uppercase tracking-wider">
            {category}
          </span>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-50 max-w-5xl leading-tight drop-shadow-2xl">
            {title}
          </h1>
          
          {/* Link Butonları */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {liveDemoUrl && (
                // Canlı Demo: Sky-600
                <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className="bg-sky-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-500 hover:scale-105 transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2">
                    🌍 Canlı Demo
                </a>
            )}
            {githubUrl && (
                // GitHub: Slate-700 (Koyu Gri)
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="bg-slate-700/80 backdrop-blur-sm text-slate-200 border border-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-600 hover:text-white hover:border-slate-500 transition-all shadow-lg flex items-center gap-2">
                    💻 GitHub
                </a>
            )}
          </div>
        </div>
      </div>

      {/* --- İÇERİK KARTI --- */}
      <div className="container mx-auto px-4 max-w-5xl -mt-32 relative z-30">
        {/* DEĞİŞİKLİK 2: Kart Arka Planı Slate-800 */}
        <div className="bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 p-8 md:p-12 ring-1 ring-white/5">
          
          <div className="mb-12">
            {/* Başlık Çizgisi: Sky-500 */}
            <h2 className="text-2xl font-bold text-slate-50 mb-6 border-l-4 border-sky-500 pl-4">Proje Hakkında</h2>
            
            {/* Prose: prose-sky */}
            <div 
                className="prose prose-invert prose-lg prose-sky max-w-none text-slate-300 leading-loose"
                dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Kullanılan Teknolojiler */}
          {technologies && technologies.length > 0 && (
            <div className="mb-12">
                <h3 className="text-xl font-bold text-slate-50 mb-6 border-l-4 border-sky-500 pl-4">Kullanılan Teknolojiler</h3>
                <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                    // Teknoloji Etiketleri: Sky Temalı
                    <span key={index} className="bg-sky-500/10 text-sky-300 px-4 py-2 rounded-lg font-medium border border-sky-500/20 shadow-sm hover:bg-sky-500/20 transition-colors">
                        {tech.name} 
                    </span>
                ))}
                </div>
            </div>
          )}

          {/* --- ÖZELLİKLER LİSTESİ --- */}
          {feature && feature.length > 0 && (
            <div className="mb-12">
                <h3 className="text-xl font-bold text-slate-50 mb-6 border-l-4 border-sky-500 pl-4">Öne Çıkan Özellikler</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feature.map((item, index) => (
                        <li key={index} className="flex items-start bg-slate-700/30 p-4 rounded-xl border border-slate-700/50 hover:border-sky-500/30 transition-colors">
                            {/* Tik İşareti: Sky-400 */}
                            <span className="mr-3 text-sky-400 font-bold text-xl">✓</span>
                            <span className="text-slate-300">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
          )}

          {/* Geri Dön */}
          <div className="pt-10 border-t border-slate-700/50 text-center">
             <Link to="/project" className="inline-flex items-center gap-2 text-sky-400 font-semibold hover:text-white transition-colors group">
               <span className="group-hover:-translate-x-1 transition-transform">←</span> Tüm Projelere Dön
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetail;