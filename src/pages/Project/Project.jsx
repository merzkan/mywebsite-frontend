import { useState, useEffect } from 'react';
import ProjectCard from '../../components/ProjectCard'
import { useProjectContext } from '../../context/ProjectContext';

const Project = () => {
  const { allProjects, loading, error } = useProjectContext();

  const publishedProjects = allProjects.filter(project => project.isPublished === true);
  // -----------------------------------

  if (loading) {
    return (
      // Loading: Slate-900 Zemin, Sky-500 Animasyon
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
            <div className="text-xl font-medium text-slate-300 animate-pulse">Projeler Yükleniyor...</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      // Hata: Slate-900 Zemin
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
         <div className="text-red-200 bg-red-900/20 p-6 rounded-xl border border-red-500/20 text-xl font-medium">
            {error}
         </div>
      </div>
    );
  }

  return (
    // DEĞİŞİKLİK 1: Ana zemin Slate-900
    <div className="bg-slate-900 text-slate-300 min-h-screen pb-12 pt-20 selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <div className="py-16 text-center relative z-10">
        
        {/* Dekoratif Işık (Sky Tonu) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-50 drop-shadow-lg">Projelerim</h1>
        <p className="text-slate-400 max-w-xl mx-auto px-4 text-lg font-light">
          Fikir aşamasından canlıya geçişe kadar geliştirdiğim açık kaynak ve kişisel projeler.
        </p>
      </div>

      {/* Grid Alanı */}
      <div className="container mx-auto px-4 py-8">
        {publishedProjects.length === 0 ? (
          // Boş Durum: Slate-800/50 zemin
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-12 text-center border border-slate-700 border-dashed max-w-2xl mx-auto">
            <p className="text-slate-500 text-lg">Henüz yayınlanmış bir proje bulunmamaktadır.</p>
          </div>
        ): (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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