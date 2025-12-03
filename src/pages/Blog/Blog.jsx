import BlogCard from '../../components/BlogCard';
import { useBlogContext } from '../../context/BlogContext';

const Blog = () => {
  const { allBlogs, loading, error } = useBlogContext();

  const publishedBlogs = allBlogs.filter(blog => blog.isPublished === true);
  // -----------------------------------

  if (loading) {
    return (
      // Loading: Slate-900 zemin, Sky animasyon
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
            <div className="text-xl font-medium text-slate-300 animate-pulse">Yazılar Yükleniyor...</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      // Error: Slate-900 zemin
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
         <div className="text-red-200 bg-red-900/20 p-6 rounded-xl border border-red-500/20 text-xl font-medium">
            {error}
         </div>
      </div>
    );
  }

  return (
    // DEĞİŞİKLİK 1: Zemin Slate-900
    <div className="bg-slate-900 text-slate-300 min-h-screen pb-12 pt-20 selection:bg-sky-500 selection:text-white">
      
      {/* Üst Başlık Alanı */}
      <div className="py-12 text-center relative z-10">
        
        {/* Dekoratif Işık (Sky tonu) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-50 drop-shadow-lg">
          Blog Yazıları
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto px-4 text-lg font-light">
          Yazılım, teknoloji ve hayat üzerine tüm birikimlerim burada.
        </p>
        
        {/* Arama Kutusu */}
        <div className="mt-8 max-w-lg mx-auto px-4">
           {/* DEĞİŞİKLİK 2: Arama Barı Slate-800 ve Sky Focus */}
           <div className="flex shadow-lg shadow-black/20 rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50 backdrop-blur-sm focus-within:ring-2 focus-within:ring-sky-500/50 transition-all">
            <input 
              type="text" 
              placeholder="Yazı ara..." 
              className="text-slate-200 w-full px-5 py-3 bg-transparent focus:outline-none placeholder-slate-500"
            />
            <button className="bg-slate-800 px-6 py-3 hover:bg-slate-700 hover:text-sky-400 transition font-semibold text-slate-400 border-l border-slate-700">
              Ara
            </button>
           </div>
        </div>
      </div>

      {/* Yazı Listesi */}
      <div className="container mx-auto px-4 py-8">
        {publishedBlogs.length === 0 ? (
          // Empty State: Slate-800/50
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-12 text-center border border-slate-700 border-dashed max-w-2xl mx-auto">
            <p className="text-slate-500 text-lg">Henüz yayınlanmış bir yazı bulunmamaktadır.</p>
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