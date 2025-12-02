import BlogCard from '../../components/BlogCard';
import { useBlogContext } from '../../context/BlogContext';

const Blog = () => {
  const { allBlogs, loading, error } = useBlogContext();

  const publishedBlogs = allBlogs.filter(blog => blog.isPublished === true);
  // -----------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="text-xl font-medium animate-pulse">Yazılar Yükleniyor...</div>
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
      {/* Üst Başlık Alanı */}
      <div className="py-12 text-center relative z-10">
        
        {/* Dekoratif Işık */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Blog Yazıları
        </h1>
        <p className="text-blue-100/80 max-w-xl mx-auto px-4 text-lg font-light">
          Yazılım, teknoloji ve hayat üzerine tüm birikimlerim burada.
        </p>
        
        {/* Arama Kutusu */}
        <div className="mt-8 max-w-lg mx-auto px-4">
           <div className="flex shadow-lg shadow-black/20 rounded-xl overflow-hidden border border-white/20 bg-black/20 backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-400/50 transition-all">
            <input 
              type="text" 
              placeholder="Yazı ara..." 
              className="text-white w-full px-5 py-3 bg-transparent focus:outline-none placeholder-blue-200/50"
            />
            <button className="bg-slate-900/80 px-6 py-3 hover:bg-slate-800 transition font-semibold text-white border-l border-white/10">
              Ara
            </button>
           </div>
        </div>
      </div>

      {/* Yazı Listesi */}
      <div className="container mx-auto px-4 py-8">
        {publishedBlogs.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-12 text-center border border-white/10 border-dashed max-w-2xl mx-auto">
            <p className="text-blue-200/60 text-lg">Henüz yayınlanmış bir yazı bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog}/> 
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog;