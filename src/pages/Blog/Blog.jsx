import BlogCard from '../../components/BlogCard';
import { useBlogContext } from '../../context/BlogContext';

const Blog = () => {
  const { allBlogs, loading, error } = useBlogContext();

  // --- DEĞİŞİKLİK BURADA BAŞLIYOR ---
  // Tüm bloglar arasından sadece isPublished: true olanları alıyoruz.
  const publishedBlogs = allBlogs.filter(blog => blog.isPublished === true);
  // -----------------------------------

  if (loading) {
    return <div className="text-center py-20 text-xl font-medium">Yazılar Yükleniyor...</div>;
  }
  if (error) {
    return <div className="text-center py-20 text-red-600 text-xl font-medium">{error}</div>;
  }

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
        {/* Kontrolü ve Map işlemini publishedBlogs üzerinden yapıyoruz */}
        {publishedBlogs.length === 0 ? (
          <div className="text-center text-lg text-gray-500">Henüz yayınlanmış bir yazı bulunmamaktadır.</div>
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