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

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    content: '', 
    coverImageUrl: '',
    readingTime: '',
    isPublished: true // Varsayılan olarak true
  });

  const config = {
    readonly: false, 
    height: 400,
    placeholder: 'Blog içeriğini buraya yazmaya başla...',
    uploader: {
      insertImageAsBase64URI: true 
    }
  };

  // 1. Verileri Çekme
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

  // 2. Input Değişimleri (Checkbox desteği ile)
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

  // 3. Ekleme Modu
  const openModalForCreate = () => {
    setEditingId(null);
    setFormData({
        title: '', 
        category: '', 
        summary: '', 
        content: '', 
        coverImageUrl: '', 
        readingTime: '', 
        isPublished: true // Yeni yazı varsayılan olarak yayında olsun
    });
    setIsModalOpen(true);
  };

  // 4. Düzenleme Modu
  const handleEditClick = (blog) => {
    setEditingId(blog._id);
    
    setFormData({
        title: blog.title,
        category: blog.category,
        summary: blog.summary,
        content: blog.content,
        coverImageUrl: blog.coverImageUrl || '',
        readingTime: blog.readingTime || '',
        isPublished: blog.isPublished // Mevcut durum neyse o gelsin
    });

    setIsModalOpen(true);
  };

  // 5. Silme İşlemi
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

  // 6. Form Gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // LocalStorage'dan kullanıcı bilgisini al (Author için)
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

  if (loading) return <div className="p-6 text-gray-500">Yükleniyor...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
      
      {/* --- ÜST KISIM --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Blog Yazıları ({blogs.length})</h2>
        <button 
            onClick={openModalForCreate}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold shadow-md"
        >
          + Yeni Yazı Yaz
        </button>
      </div>

      {/* --- TABLO --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <th className="p-4 border-b">Durum</th>
              <th className="p-4 border-b">Başlık</th>
              <th className="p-4 border-b">Kategori</th>
              <th className="p-4 border-b text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50 transition border-b last:border-0">
                {/* Durum Göstergesi */}
                <td className="p-4">
                    {blog.isPublished ? (
                        <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold border border-green-200">Yayında</span>
                    ) : (
                        <span className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-xs font-bold border border-yellow-200">Taslak</span>
                    )}
                </td>
                <td className="p-4 font-medium text-gray-800">{blog.title}</td>
                <td className="p-4 text-gray-500 text-sm">{blog.category}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => handleEditClick(blog)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Düzenle
                  </button>
                  <button 
                     onClick={() => handleDeleteClick(blog._id)}
                     className="text-red-500 hover:text-red-700 font-medium text-sm"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && blogs.length === 0 && (
          <p className="text-center text-gray-500 py-8">Henüz hiç blog yazısı eklenmemiş.</p>
        )}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-10 z-50 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 mb-10 flex flex-col">
                
                <div className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-t-xl">
                    <h3 className="text-xl font-bold text-gray-800">
                        {editingId ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı"}
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Başlığı *</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori *</label>
                            <input type="text" name="category" placeholder="Örn: Teknoloji" required value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Kısa Özet *</label>
                        <textarea name="summary" rows="2" required value={formData.summary} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">İçerik *</label>
                        <div className="border rounded-lg overflow-hidden">
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
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Kapak Görseli URL</label>
                             <input type="text" name="coverImageUrl" placeholder="https://..." value={formData.coverImageUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                         <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Okuma Süresi (Dk) *</label>
                             <input type="text" name="readingTime" placeholder="Örn: 5 dk" required value={formData.readingTime} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                         </div>
                    </div>

                    {/* --- CHECKBOX --- */}
                    <div className="flex items-center gap-2 mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <input
                            id="isPublished"
                            type="checkbox"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleChange}
                            className="w-5 h-5 text-green-600 rounded focus:ring-green-500 border-gray-300 cursor-pointer"
                        />
                        <label htmlFor="isPublished" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">
                            Bu yazıyı hemen yayınla (İşaretlemezseniz taslak olarak kaydedilir)
                        </label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition">
                            İptal
                        </button>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className={`px-8 py-2.5 rounded-lg font-bold text-white shadow-lg transition transform hover:-translate-y-0.5 ${submitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
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