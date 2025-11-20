import ProjectCard from '../../components/ProjectCard'

const Project = () => {
  const project = [1, 2, 3, 4];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header - Blog sayfasıyla aynı yükseklik ve padding */}
      <div className=" text-gray-900 py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Projelerim</h1>
        <p className="text-gray-900 max-w-xl mx-auto px-4 text-lg">
          Fikir aşamasından canlıya geçişe kadar geliştirdiğim açık kaynak ve kişisel projeler.
        </p>
      </div>

      {/* Grid Alanı - Blog sayfasıyla aynı boşluklar */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.map((item) => (
            <ProjectCard key={item} id={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Project