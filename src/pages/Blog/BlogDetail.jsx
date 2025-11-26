import { useBlogContext } from '../../context/BlogContext';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const { allBlogs, loading, error } = useBlogContext();
  
  const blog = allBlogs.find(b => b._id === id);

  if (loading) {
    return <div className="text-center py-40 text-2xl">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-40 text-red-600 text-2xl">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center py-40 text-gray-600">Blog bilgisi bulunamadı.</div>;
  }

  const { title, category, coverImageUrl, author, content, readingTime, createdAt } = blog;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* --- KAPAK GÖRSELİ --- */}
      <div className="h-[400px] w-full relative bg-gray-900">
        <img 
          src={coverImageUrl || "/project.avif"} 
          alt={title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
            {category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight shadow-black drop-shadow-lg">
            {title}
          </h1>
          <div className="flex items-center text-gray-200 mt-6 space-x-4">
            <span className="flex items-center">
                <span className="mr-2">🗓</span> {new Date(createdAt).toLocaleDateString('tr-TR')}
            </span>
            <span className="flex items-center"><span className="mr-2">⏱</span> {readingTime}</span>
          </div>
        </div>
      </div>

      {/* --- İÇERİK ALANI --- */}
      <div className="container mx-auto px-4 max-w-3xl -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          
          {/* Yazar Bilgisi */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 uppercase">
                {author?.initials || "Y"}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{author?.name || "Anonim"}</h4>
                <p className="text-sm text-gray-500">{author?.role || "Yazar"}</p>
              </div>
            </div>
          </div>

          {/* dangerouslySetInnerHTML sayesinde <p>, <b> gibi etiketler düzgün görünür */}
          <article 
            className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          {/* ----------------------------------------- */}

          {/* Geri Dön Butonu */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
             <Link to="/blog" className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-semibold">
               ← Tüm Yazılara Dön
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BlogDetail;