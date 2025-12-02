import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  // Veri gelmezse hata vermemesi için kontrol
  if (!blog) return null;

  const {_id, title, category, summary, author, readingTime, coverImageUrl, createdAt } = blog;
  
  const formattedDate = new Date(createdAt).toLocaleDateString('tr-TR');

  return (
    <Link to={`/blog/${_id}`} className="block h-full group">
      {/* ANA KART STİLİ: 
          - bg-slate-900: Koyu lacivert arka plan.
          - border-slate-700/50: İnce, modern gri çerçeve.
          - shadow: Hafif derinlik.
      */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-lg shadow-black/20 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full flex flex-col">
        
        {/* Resim Alanı */}
        <div className="h-52 overflow-hidden relative bg-slate-800">
           {/* Resim üzerine hafif karartma (yazılar patlamasın diye) */}
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
          <img 
            src={"https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} // coverImageUrl || 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
           {/* Kategori Etiketi: Koyu tema uyumlu */}
           <div className="absolute top-4 left-4 z-20">
             <span className="bg-slate-900/90 backdrop-blur-md text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {category}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          {/* Tarih Bilgisi */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-medium">
            <span className="flex items-center gap-1">
               📅 {formattedDate}
            </span>
          </div>

          {/* Başlık: Beyaz Renk (Slate-100) */}
          <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors leading-tight">
            {title}
          </h3>
          
          {/* Özet: Açık Gri (Slate-400) - Göz yormaz */}
          <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
            {summary}
          </p>
          
          {/* Alt Kısım: Yazar ve Süre */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-auto">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 text-xs font-bold uppercase">
                {author?.initials || "Y"}
              </div>
              <span className="text-sm font-medium text-slate-300">{author?.name}</span>
            </div>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              ⏱ {readingTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard;