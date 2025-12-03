import React, { useState, useEffect, useRef } from 'react';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../api/blogApi';
import JoditEditor from 'jodit-react';

const BlogSetting = () => {
  const editor = useRef(null);
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    content: '', 
    coverImageUrl: '',
    readingTime: '',
    isPublished: true 
  });

  // Editör konfigürasyonu
  const config = {
    readonly: false, 
    height: 400,
    placeholder: 'Blog içeriğini buraya yazmaya başla...',
    uploader: {
      insertImageAsBase64URI: true 
    },
    // Editörün stili (Dark moda uyum için opsiyonel ayarlar)
    style: {
        background: '#1e293b', // Slate-800
        color: '#cbd5e1'       // Slate-300
    },
    toolbarAdaptive: false,
  };

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data.reverse());
    } catch (error) {
      console.log("Bloglar çekilemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (newContent) => {
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const openModalForCreate = () => {
    setEditingId(null);
    setFormData({
        title: '', 
        category: '', 
        summary: '', 
        content: '', 
        coverImageUrl: '', 
        readingTime: '', 
        isPublished: true 
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (blog) => {
    setEditingId(blog._id);
    
    setFormData({
        title: blog.title,
        category: blog.category,
        summary: blog.summary,
        content: blog.content,
        coverImageUrl: blog.coverImageUrl || '',
        readingTime: blog.readingTime || '',
        isPublished: blog.isPublished
    });

    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) {
        try {
            await deleteBlog(id);
            setBlogs(blogs.filter(b => b._id !== id));
            alert("Blog yazısı silindi.");
        } catch (error) {
            alert("Silme hatası: " + error.message);
        }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const currentUser = JSON.parse(localStorage.getItem("user")) || {};
      const initials = `${currentUser.name?.[0] || ''}${currentUser.surname?.[0] || ''}`.toUpperCase();

      const finalData = {
        ...formData,
        author: {
          name: `${currentUser.name || 'Admin'} ${currentUser.surname || ''}`,
          role: currentUser.role || 'Admin',
          initials: initials || 'AD'
        }
      };
      
      if (editingId) {
        await updateBlog(editingId, finalData);
        alert("Blog yazısı başarıyla güncellendi!");
      } else {
        await createBlog(finalData);
        alert("Blog yazısı başarıyla yayınlandı!");
      }

      setIsModalOpen(false);
      fetchBlogs(); 

    } catch (error) {
        console.error("Hata:", error);
        alert("Hata: " + (error.message || "İşlem başarısız."));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-slate-400">Yükleniyor...</div>;

  return (
    // DEĞİŞİKLİK 1: Kart Arka Planı Slate-800
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 relative">
      
      {/* --- ÜST KISIM --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-100">Blog Yazıları ({blogs.length})</h2>
        <button 
            onClick={openModalForCreate}
            className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition text-sm font-semibold shadow-lg shadow-sky-900/20"
        >
          + Yeni Yazı Yaz
        </button>
      </div>

      {/* --- TABLO --- */}
      <div className="overflow-x-auto rounded-lg border border-slate-700/50">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Header: Slate-900/50 */}
            <tr className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
              <th className="p-4 border-b border-slate-700">Durum</th>
              <th className="p-4 border-b border-slate-700">Başlık</th>
              <th className="p-4 border-b border-slate-700">Kategori</th>
              <th className="p-4 border-b border-slate-700 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-slate-700/30 transition">
                {/* Durum Göstergesi */}
                <td className="p-4">
                    {blog.isPublished ? (
                        <span className="bg-emerald-500/10 text-emerald-400 py-1 px-3 rounded-full text-xs font-bold border border-emerald-500/20">Yayında</span>
                    ) : (
                        <span className="bg-amber-500/10 text-amber-400 py-1 px-3 rounded-full text-xs font-bold border border-amber-500/20">Taslak</span>
                    )}
                </td>
                <td className="p-4 font-medium text-slate-200">{blog.title}</td>
                <td className="p-4 text-slate-400 text-sm">{blog.category}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => handleEditClick(blog)}
                    className="text-sky-400 hover:text-sky-300 font-medium text-sm transition-colors"
                  >
                    Düzenle
                  </button>
                  <button 
                     onClick={() => handleDeleteClick(blog._id)}
                     className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && blogs.length === 0 && (
          <p className="text-center text-slate-500 py-8">Henüz hiç blog yazısı eklenmemiş.</p>
        )}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-start pt-10 z-50 overflow-y-auto">
            {/* Modal Content: Slate-800 */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-4xl mx-4 mb-10 flex flex-col">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-slate-900/50 rounded-t-xl">
                    <h3 className="text-xl font-bold text-slate-100">
                        {editingId ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı"}
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-3xl leading-none transition">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Blog Başlığı *</label>
                            <input 
                                type="text" name="title" required value={formData.title} onChange={handleChange} 
                                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Kategori *</label>
                            <input 
                                type="text" name="category" placeholder="Örn: Teknoloji" required value={formData.category} onChange={handleChange} 
                                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600" 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Kısa Özet *</label>
                        <textarea 
                            name="summary" rows="2" required value={formData.summary} onChange={handleChange} 
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none resize-none placeholder-slate-600"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">İçerik *</label>
                        {/* Jodit Editör Wrapper - İçeriğin beyaz kalması genellikle daha iyi UX sağlar, ancak border uyumlu */}
                        <div className="border border-slate-700 rounded-lg overflow-hidden jodit-dark-container text-black">
                            <JoditEditor
                                ref={editor}
                                value={formData.content}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => handleEditorChange(newContent)}
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                             <label className="block text-sm font-semibold text-slate-300 mb-2">Kapak Görseli URL</label>
                             <input 
                                type="text" name="coverImageUrl" placeholder="https://..." value={formData.coverImageUrl} onChange={handleChange} 
                                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600" 
                             />
                        </div>
                         <div>
                             <label className="block text-sm font-semibold text-slate-300 mb-2">Okuma Süresi (Dk) *</label>
                             <input 
                                type="text" name="readingTime" placeholder="Örn: 5 dk" required value={formData.readingTime} onChange={handleChange} 
                                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition placeholder-slate-600" 
                             />
                         </div>
                    </div>

                    {/* --- CHECKBOX --- */}
                    <div className="flex items-center gap-2 mt-2 p-3 bg-slate-900/30 rounded-lg border border-slate-700">
                        <input
                            id="isPublished"
                            type="checkbox"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleChange}
                            className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500 border-slate-600 bg-slate-800 cursor-pointer"
                        />
                        <label htmlFor="isPublished" className="text-sm font-semibold text-slate-300 cursor-pointer select-none">
                            Bu yazıyı hemen yayınla (İşaretlemezseniz taslak olarak kaydedilir)
                        </label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)} 
                            className="px-6 py-2.5 border border-slate-600 rounded-lg text-slate-300 font-semibold hover:bg-slate-700 transition"
                        >
                            İptal
                        </button>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className={`px-8 py-2.5 rounded-lg font-bold text-white shadow-lg transition transform hover:-translate-y-0.5 ${submitting ? 'bg-sky-700 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-500 shadow-sky-900/20'}`}
                        >
                            {submitting ? 'İşleniyor...' : (editingId ? 'Güncelle' : 'Yazıyı Oluştur')}
                        </button>
                    </div>

                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default BlogSetting;