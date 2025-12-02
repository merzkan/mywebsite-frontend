import { useState, useEffect } from 'react';
import ProjectCard from '../../components/ProjectCard'
import { useProjectContext } from '../../context/ProjectContext';

const Project = () => {
  const { allProjects, loading, error } = useProjectContext();

  const publishedProjects = allProjects.filter(project => project.isPublished === true);
  // -----------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="text-xl font-medium animate-pulse">Projeler Yükleniyor...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
         <div className="text-red-200 bg-red-900/50 p-6 rounded-xl border border-red-500/30 text-xl font-medium">
            {error}
         </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white min-h-screen pb-12 pt-20">
      {/* Header */}
      <div className="py-16 text-center relative z-10">
        
        {/* Dekoratif Işık */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Projelerim</h1>
        <p className="text-blue-100/80 max-w-xl mx-auto px-4 text-lg font-light">
          Fikir aşamasından canlıya geçişe kadar geliştirdiğim açık kaynak ve kişisel projeler.
        </p>
      </div>

      {/* Grid Alanı */}
      <div className="container mx-auto px-4 py-8">
        {/* Burada artık allProjects yerine publishedProjects dizisini kontrol ediyoruz */}
        {publishedProjects.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-12 text-center border border-white/10 border-dashed max-w-2xl mx-auto">
            <p className="text-blue-200/60 text-lg">Henüz yayınlanmış bir proje bulunmamaktadır.</p>
          </div>
        ): (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map işleminde de publishedProjects kullanıyoruz */}
            {publishedProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Project;