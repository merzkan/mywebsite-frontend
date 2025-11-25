import { Link } from 'react-router-dom'

const ProjectCard = ({project}) => {
  const {_id,title,category,description,summary,technologies,liveDemoUrl,githubUrl } = project;
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      {/* Proje Görseli */}
      <div className="relative h-56 overflow-hidden bg-gray-800">
        {/* Overlay (Üzerine gelince kararır) */}
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Proje Kapak" 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Sol üst köşe etiketi (etiket)*/}
        <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
          {category}
        </div>
      </div>

      {/* İçerik */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {summary}
        </p>
        
        {/* Teknolojiler */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies && technologies.map((tech, index) => (
              <span key={index} className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">
                  {tech.name}
              </span>
          ))}
        </div>

        {/* Butonlar */}
        <div className="flex gap-3 mt-auto">
          {githubUrl && (
             <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition shadow-sm text-center flex items-center justify-center"
            >
                Github
            </a>
          )}
          <Link 
            to={`/project/${_id}`} 
            className={`
                ${githubUrl ? 'flex-1' : 'w-full'} 
                border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm text-center flex items-center justify-center
            `}
          >
            İncele
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard