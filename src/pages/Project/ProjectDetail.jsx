import { useParams, Link } from 'react-router-dom';
import { useProjectContext } from '../../context/ProjectContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const { allProjects, loading, error } = useProjectContext();

  const project = allProjects ? allProjects.find(p => p._id === id) : null;

  // --- Yükleniyor (Koyu Tema) ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="text-xl font-medium animate-pulse">Proje Yükleniyor...</div>
      </div>
    );
  }

  // --- Hata (Koyu Tema) ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
         <div className="text-red-200 bg-red-900/50 p-6 rounded-xl border border-red-500/30 text-xl font-medium">
            {error}
         </div>
      </div>
    );
  }

  // --- Proje Bulunamadı ---
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="text-xl">Proje bilgisi bulunamadı.</div>
      </div>
    );
  }

  const { title, category, description, technologies, liveDemoUrl, githubUrl, feature, coverImageUrl } = project;

  return (
    // Ana Arka Plan
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white min-h-screen pb-20">
      
      {/* --- ÜST GÖRSEL (HERO) --- */}
      <div className="h-[500px] w-full relative bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10"></div>
        <img 
          src={coverImageUrl || "/project.avif"}  
          alt={title} 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20 pb-32">
          <span className="bg-slate-900/50 text-green-400 border border-green-500/30 px-4 py-1 rounded-full text-sm font-bold mb-6 backdrop-blur-md shadow-lg uppercase tracking-wider">
            {category}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-5xl leading-tight drop-shadow-2xl">
            {title}
          </h1>
          
          {/* Link Butonları */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {liveDemoUrl && (
                <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                    🌍 Canlı Demo
                </a>
            )}
            {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="bg-slate-800/80 backdrop-blur-sm text-white border border-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-700 hover:border-slate-500 transition-all shadow-lg flex items-center gap-2">
                    💻 GitHub
                </a>
            )}
          </div>
        </div>
      </div>

      {/* --- İÇERİK KARTI --- */}
      <div className="container mx-auto px-4 max-w-5xl -mt-32 relative z-30">
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 p-8 md:p-12">
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-4">Proje Hakkında</h2>
            <div 
                className="prose prose-invert prose-lg prose-blue max-w-none text-slate-300 leading-loose"
                dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Kullanılan Teknolojiler */}
          {technologies && technologies.length > 0 && (
            <div className="mb-12">
                <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">Kullanılan Teknolojiler</h3>
                <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                    <span key={index} className="bg-slate-800 text-blue-300 px-4 py-2 rounded-lg font-medium border border-slate-700 shadow-sm hover:border-blue-500/50 transition-colors">
                        {tech.name} 
                    </span>
                ))}
                </div>
            </div>
          )}

          {/* --- ÖZELLİKLER LİSTESİ --- */}
          {feature && feature.length > 0 && (
            <div className="mb-12">
                <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-green-500 pl-4">Öne Çıkan Özellikler</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feature.map((item, index) => (
                        <li key={index} className="flex items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                            <span className="mr-3 text-green-400 font-bold text-xl">✓</span>
                            <span className="text-slate-300">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
          )}

          {/* Geri Dön */}
          <div className="pt-10 border-t border-slate-700/50 text-center">
             <Link to="/project" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-white transition-colors group">
               <span className="group-hover:-translate-x-1 transition-transform">←</span> Tüm Projelere Dön
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetail;