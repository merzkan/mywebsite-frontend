import BlogCard from '../../components/BlogCard';
const Blog = () => {
  // Şimdilik sahte veri
  const posts = [1, 2, 3, 4, 5, 6]; 

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Üst Başlık Alanı */}
      <div className=" text-gray-900 py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Blog Yazıları</h1>
        <p className="text-gray-900 max-w-xl mx-auto px-4">
          Yazılım, teknoloji ve hayat üzerine tüm birikimlerim burada.
        </p>
        
        {/* Arama Kutusu */}
        <div className="mt-6 max-w-lg mx-auto px-4">
           <div className="flex">
            <input 
              type="text" 
              placeholder="Yazı ara..." 
              className="text-white w-full px-4 py-3 rounded-l-lg bg-gray-900  focus:outline-none"
            />
            <button className="bg-gray-700 px-6 py-3 rounded-r-lg hover:bg-gray-900 transition font-semibold text-white">
              Ara
            </button>
           </div>
        </div>
      </div>

      {/* Yazı Listesi */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((item) => (
            <BlogCard key={item} id={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog