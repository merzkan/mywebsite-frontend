import { Link } from 'react-router-dom'

const ProjectCard = ({project}) => {
  // Proje verisi gelmezse hata vermemesi için
  if (!project) return null;

  const {_id, title, category, description, summary, technologies, liveDemoUrl, githubUrl } = project;
  
  return (
    // DEĞİŞİKLİK 1: Kart Rengi Slate-800 (Zemin 900 olduğu için ayrışması lazım)
    // Hover: Kenarlık Sky-500 renginde parlar
    <div className="bg-slate-800 border border-slate-700/50 rounded-2xl shadow-lg shadow-black/20 overflow-hidden hover:shadow-2xl hover:shadow-sky-500/10 hover:border-sky-500/50 hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col">
      
      {/* Proje Görseli */}
      <div className="relative h-56 overflow-hidden bg-slate-700">
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Proje Kapak" 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        
        {/* DEĞİŞİKLİK 2: Kategori Etiketi (Sky Mavisi) */}
        <div className="absolute top-3 left-3 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sky-400 border border-sky-500/30 shadow-lg">
          {category}
        </div>
      </div>

      {/* İçerik */}
      <div className="p-6 flex flex-col flex-grow">
        {/* DEĞİŞİKLİK 3: Başlık Hover Rengi Sky-400 */}
        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors">
          {title}
        </h3>
        
        {/* DEĞİŞİKLİK 4: Açıklama Slate-400 (Yumuşak Gri) */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {summary}
        </p>
        
        {/* Teknolojiler */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {technologies && technologies.map((tech, index) => (
              // DEĞİŞİKLİK 5: Teknoloji Tagleri Sky Temalı
              <span key={index} className="text-xs font-medium bg-sky-500/10 text-sky-300 px-2 py-1 rounded border border-sky-500/20">
                  {tech.name || tech} 
              </span>
          ))}
        </div>

        {/* Butonlar */}
        <div className="flex gap-3 pt-4 border-t border-slate-700/50">
          {githubUrl && (
             // DEĞİŞİKLİK 6: Github Butonu Slate-700 (Karta göre biraz daha koyu/farklı)
             <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-slate-700 text-slate-200 border border-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-600 hover:text-white transition shadow-sm text-center flex items-center justify-center gap-2"
            >
                Github
            </a>
          )}
          
          {/* DEĞİŞİKLİK 7: Detay Butonu Hover'da Sky Rengine Dönüyor */}
          <Link 
            to={`/project/${_id}`} 
            className={`
                ${githubUrl ? 'flex-1' : 'w-full'} 
                bg-transparent border border-slate-600 text-slate-300 py-2 rounded-lg text-sm font-medium 
                hover:bg-slate-700/50 hover:text-sky-400 hover:border-sky-500/50 transition shadow-sm text-center flex items-center justify-center
            `}
          >
            Detaylar →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;