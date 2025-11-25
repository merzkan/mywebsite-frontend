import { useParams, Link } from 'react-router-dom';
import { useProjectContext } from '../../context/ProjectContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const { allProjects, loading, error } = useProjectContext();

  const project = allProjects.find(p => p._id === id);

  if (loading) {
    return <div className="text-center py-40 text-2xl">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-40 text-red-600 text-2xl">{error}</div>;
  }

  if (!project) {
    return <div className="text-center py-40 text-gray-600">Proje bilgisi yok.</div>;
  }

  // coverImageUrl veritabanında yoksa bile kodun hata vermez, varsayılanı kullanır.
  const { title, category, description, technologies, liveDemoUrl, githubUrl, feature, coverImageUrl,summary } = project;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* --- ÜST GÖRSEL (HERO) --- */}
      <div className="h-[400px] w-full relative bg-gray-900">
        <img 
          // DÜZELTME 1: Varsa veritabanındaki görseli, yoksa varsayılanı kullan
          src={coverImageUrl || "/project.avif"}  
          alt={title} 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            {category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight drop-shadow-xl">
            {title}
          </h1>
          
          {/* Link Butonları */}
          <div className="flex gap-4 mt-8">
            {liveDemoUrl && (
                <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition shadow-lg">
                    Canlı Demo
                </a>
            )}
            {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white border border-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition shadow-lg">
                    GitHub
                </a>
            )}
          </div>
        </div>
      </div>

      {/* --- İÇERİK ALANI --- */}
      <div className="container mx-auto px-4 max-w-4xl -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          {/* --- PROJE HAKKINDA (DÜZELTME 2) --- */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Proje Hakkında</h2>
            {/* HTML Etiketlerini (Jodit Çıktısını) Düzgün Gösterme */}
            <div 
                className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Kullanılan Teknolojiler */}
          {technologies && technologies.length > 0 && (
            <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kullanılan Teknolojiler</h3>
                <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium border border-blue-100">
                        {tech.name} 
                    </span>
                ))}
                </div>
            </div>
          )}

          {/* --- ÖZELLİKLER LİSTESİ (GÜVENLİK KONTROLÜ) --- */}
          {feature && feature.length > 0 && (
            <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Öne Çıkan Özellikler</h3>
                <ul className="space-y-3 text-gray-600">
                    {/* Artık split kullanmıyoruz, çünkü veri zaten array geliyor */}
                    {feature.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <span className="mr-3 text-green-500 font-bold">✓</span>
                            {item.name} {/* item.trim() yerine item.name kullanıyoruz */}
                        </li>
                    ))}
                </ul>
            </div>
          )}

          {/* Geri Dön */}
          <div className="pt-8 border-t border-gray-100 text-center">
             <Link to="/project" className="inline-block text-blue-600 font-semibold hover:underline transition">
               ← Tüm Projelere Dön
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetail;