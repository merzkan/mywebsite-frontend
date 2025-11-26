import { useState, useEffect } from 'react';
import ProjectCard from '../../components/ProjectCard'
import { useProjectContext } from '../../context/ProjectContext';

const Project = () => {
  const { allProjects, loading, error } = useProjectContext();

  const publishedProjects = allProjects.filter(project => project.isPublished === true);
  // -----------------------------------

  if (loading) {
    return <div className="text-center py-20 text-xl font-medium">Projeler Yükleniyor...</div>;
  }
  if (error) {
    return <div className="text-center py-20 text-red-600 text-xl font-medium">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className=" text-gray-900 py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Projelerim</h1>
        <p className="text-gray-900 max-w-xl mx-auto px-4 text-lg">
          Fikir aşamasından canlıya geçişe kadar geliştirdiğim açık kaynak ve kişisel projeler.
        </p>
      </div>

      {/* Grid Alanı */}
      <div className="container mx-auto px-4 py-12">
        {/* Burada artık allProjects yerine publishedProjects dizisini kontrol ediyoruz */}
        {publishedProjects.length === 0 ? (
          <div className="text-center text-lg text-gray-500">Henüz yayınlanmış bir proje bulunmamaktadır.</div>
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