import { useBlogContext } from '../../context/BlogContext';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const { allBlogs, loading, error } = useBlogContext();
  
  const blog = allBlogs ? allBlogs.find(b => b._id === id) : null;

  // --- Yükleniyor Durumu (Koyu Tema) ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="text-xl font-medium animate-pulse">İçerik Yükleniyor...</div>
      </div>
    );
  }

  // --- Hata Durumu (Koyu Tema) ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
         <div className="text-red-200 bg-red-900/50 p-6 rounded-xl border border-red-500/30 text-xl font-medium">
            {error}
         </div>
      </div>
    );
  }

  // --- Blog Bulunamadı ---
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="text-xl">Blog bilgisi bulunamadı.</div>
      </div>
    );
  }

  const { title, category, coverImageUrl, author, content, readingTime, createdAt } = blog;

  return (
    // Ana arka plan gradyanı
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white min-h-screen pb-20">
      
      {/* --- KAPAK GÖRSELİ VE BAŞLIK --- */}
      <div className="h-[500px] w-full relative bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10"></div>
        <img 
          src={"/project.avif"} // coverImageUrl ||
          alt={title} 
          className="w-full h-full object-cover opacity-60"
        />
        
        {/* Başlık İçeriği */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20 pb-32">
          <span className="bg-blue-500/20 text-blue-200 border border-blue-500/30 px-4 py-1 rounded-full text-sm font-bold mb-6 backdrop-blur-md">
            {category}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-5xl leading-tight drop-shadow-2xl">
            {title}
          </h1>
          <div className="flex items-center text-blue-200 mt-8 space-x-6 text-sm md:text-base font-medium bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <span className="flex items-center">
                <span className="mr-2">🗓</span> {new Date(createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
            <span className="flex items-center"><span className="mr-2">⏱</span> {readingTime}</span>
          </div>
        </div>
      </div>

      {/* --- İÇERİK KARTI --- */}
      <div className="container mx-auto px-4 max-w-4xl -mt-32 relative z-30">
        {/* Kart Arka Planı: Koyu Lacivert (Slate-900) */}
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 p-8 md:p-16">
          
          {/* Yazar Bilgisi */}
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-8 mb-10">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-blue-400 text-lg uppercase shadow-inner">
                {author?.initials || "Y"}
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{author?.name || "Anonim"}</h4>
                <p className="text-sm text-slate-400">{author?.role || "İçerik Yazarı"}</p>
              </div>
            </div>
            {/* Paylaş Butonu vs eklenebilir */}
          </div>

          {/* MAKALE İÇERİĞİ 
             prose-invert: Koyu temada yazıların otomatik beyaz olmasını sağlar.
             prose-lg: Yazı boyutunu büyütür.
             prose-blue: Linklerin mavi olmasını sağlar.
          */}
          <article 
            className="prose prose-invert prose-lg prose-blue max-w-none leading-loose text-slate-300"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          
          {/* ----------------------------------------- */}

          {/* Geri Dön Butonu */}
          <div className="mt-16 pt-10 border-t border-slate-700/50 text-center">
             <Link to="/blog" className="inline-flex items-center gap-2 bg-slate-800 text-slate-200 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold border border-slate-700 group shadow-lg">
               <span className="group-hover:-translate-x-1 transition-transform">←</span> Tüm Yazılara Dön
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BlogDetail;