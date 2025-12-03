import { useBlogContext } from '../../context/BlogContext';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const { allBlogs, loading, error } = useBlogContext();
  
  const blog = allBlogs ? allBlogs.find(b => b._id === id) : null;

  // --- Yükleniyor Durumu (Slate-900 & Sky) ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
            <div className="text-xl font-medium text-slate-300 animate-pulse">İçerik Yükleniyor...</div>
        </div>
      </div>
    );
  }

  // --- Hata Durumu ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
         <div className="text-red-200 bg-red-900/20 p-6 rounded-xl border border-red-500/20 text-xl font-medium">
            {error}
         </div>
      </div>
    );
  }

  // --- Blog Bulunamadı ---
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-400">
        <div className="text-xl border border-slate-700 p-8 rounded-xl border-dashed">Blog bilgisi bulunamadı.</div>
      </div>
    );
  }

  const { title, category, coverImageUrl, author, content, readingTime, createdAt } = blog;

  return (
    // DEĞİŞİKLİK 1: Ana arka plan Slate-900
    <div className="bg-slate-900 text-slate-300 min-h-screen pb-20 selection:bg-sky-500 selection:text-white">
      
      {/* --- KAPAK GÖRSELİ VE BAŞLIK --- */}
      <div className="h-[500px] w-full relative bg-slate-800">
        {/* Gradyan: Şeffaftan Slate-900'a geçiş (Yumuşak bir birleşme için) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-900 z-10"></div>
        
        <img 
          src={"/project.avif"} 
          alt={title} 
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Başlık İçeriği */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20 pb-32">
          {/* Kategori Etiketi: Sky Temalı */}
          <span className="bg-slate-900/80 text-sky-400 border border-sky-500/30 px-4 py-1 rounded-full text-sm font-bold mb-6 backdrop-blur-md shadow-lg shadow-sky-900/20">
            {category}
          </span>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-50 max-w-5xl leading-tight drop-shadow-2xl">
            {title}
          </h1>
          
          {/* Meta Bilgiler */}
          <div className="flex items-center text-slate-300 mt-8 space-x-6 text-sm md:text-base font-medium bg-slate-900/60 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <span className="flex items-center gap-2">
                <span>🗓</span> {new Date(createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="w-1 h-1 bg-sky-500 rounded-full"></span>
            <span className="flex items-center gap-2"><span>⏱</span> {readingTime}</span>
          </div>
        </div>
      </div>

      {/* --- İÇERİK KARTI --- */}
      <div className="container mx-auto px-4 max-w-4xl -mt-32 relative z-30">
        {/* DEĞİŞİKLİK 2: Kart Arka Planı Slate-800 (Zemin 900 olduğu için) */}
        <div className="bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 p-8 md:p-16 ring-1 ring-white/5">
          
          {/* Yazar Bilgisi */}
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-8 mb-10">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-sky-400 text-lg uppercase shadow-inner">
                {author?.initials || "Y"}
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-lg">{author?.name || "Anonim"}</h4>
                <p className="text-sm text-slate-400">{author?.role || "İçerik Yazarı"}</p>
              </div>
            </div>
          </div>

          {/* MAKALE İÇERİĞİ 
             prose-invert: Koyu tema metin rengi.
             prose-sky: Linkler ve vurgular Sky mavisi olur.
             text-slate-300: Genel metin rengi.
          */}
          <article 
            className="prose prose-invert prose-lg prose-sky max-w-none leading-loose text-slate-300"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          
          {/* ----------------------------------------- */}

          {/* Geri Dön Butonu */}
          <div className="mt-16 pt-10 border-t border-slate-700/50 text-center">
             <Link to="/blog" className="inline-flex items-center gap-2 bg-slate-700/50 text-slate-300 px-8 py-4 rounded-xl hover:bg-sky-600 hover:text-white transition-all font-semibold border border-slate-600 group shadow-lg">
               <span className="group-hover:-translate-x-1 transition-transform">←</span> Tüm Yazılara Dön
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BlogDetail;