import React, { useState, useEffect, useRef } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../../api/projectApi'; 
import JoditEditor from 'jodit-react';

const ProjectSetting = () => {
  const editor = useRef(null);
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    description: '', 
    technologies: '', 
    liveDemoUrl: '',
    githubUrl: '',
    feature: '',
    isPublished: true 
  });

  const config = {
    readonly: false, 
    height: 400,
    placeholder: 'Proje detaylarını ve açıklamasını buraya yaz...',
    uploader: {
      insertImageAsBase64URI: true 
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data.reverse());
    } catch (error) {
      console.log("Projeler çekilemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (newContent) => {
    setFormData(prev => ({ ...prev, description: newContent }));
  };

  const openModalForCreate = () => {
    setEditingId(null);
    setFormData({
        title: '', 
        category: '', 
        summary: '', 
        description: '', 
        technologies: '', 
        liveDemoUrl: '', 
        githubUrl: 'https://github.com/merzkan', 
        feature: '',
        isPublished: true 
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (project) => {
    setEditingId(project._id);
    
    const techString = project.technologies 
        ? project.technologies.map(t => t.name).join(', ') 
        : '';

    const featureString = project.feature 
        ? project.feature.map(f => f.name).join(', ') 
        : '';

    setFormData({
        title: project.title,
        category: project.category,
        summary: project.summary,
        description: project.description,
        technologies: techString, 
        liveDemoUrl: project.liveDemoUrl || '',
        githubUrl: project.githubUrl || '', 
        feature: featureString,
        isPublished: project.isPublished 
    });

    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
        try {
            await deleteProject(id);
            setProjects(projects.filter(p => p._id !== id));
            alert("Proje silindi.");
        } catch (error) {
            alert("Silme hatası: " + error.message);
        }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const technologiesArray = formData.technologies
        .split(',')
        .map(item => ({ name: item.trim() }))
        .filter(item => item.name !== '');

      const featuresArray = formData.feature
        .split(',')
        .map(item => ({ name: item.trim() })) 
        .filter(item => item.name !== '');

      const finalData = {
        ...formData,
        technologies: technologiesArray,
        feature: featuresArray
      };
      
      if (editingId) {
        await updateProject(editingId, finalData);
        alert("Proje başarıyla güncellendi!");
      } else {
        await createProject(finalData);
        alert("Proje başarıyla eklendi!");
      }

      setIsModalOpen(false);
      fetchProjects(); 

    } catch (error) {
        console.error("Hata Detayı:", error); 
        alert("Hata: " + (error.message || "İşlem başarısız."));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-gray-500">Projeler Yükleniyor...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
      
      {/* --- ÜST KISIM --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Projeler ({projects.length})</h2>
        <button 
            onClick={openModalForCreate}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-semibold shadow-md"
        >
          + Yeni Proje Ekle
        </button>
      </div>

      {/* --- TABLO --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <th className="p-4 border-b">Durum</th> 
              <th className="p-4 border-b">Proje Başlığı</th>
              <th className="p-4 border-b">Kategori</th>
              <th className="p-4 border-b">Teknolojiler</th>
              <th className="p-4 border-b text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50 transition border-b last:border-0">
                <td className="p-4">
                    {project.isPublished ? (
                        <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold border border-green-200">Yayında</span>
                    ) : (
                        <span className="bg-gray-100 text-gray-500 py-1 px-3 rounded-full text-xs font-bold border border-gray-200">Taslak</span>
                    )}
                </td>
                <td className="p-4 font-medium text-gray-800">{project.title}</td>
                <td className="p-4 text-gray-500 text-sm">{project.category}</td>
                <td className="p-4 text-gray-500 text-xs">
                    {project.technologies?.map(t => t.name).join(', ') || '-'}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => handleEditClick(project)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Düzenle
                  </button>
                  <button 
                     onClick={() => handleDeleteClick(project._id)}
                     className="text-red-500 hover:text-red-700 font-medium text-sm"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && projects.length === 0 && (
          <p className="text-center text-gray-500 py-8">Henüz hiç proje eklenmemiş.</p>
        )}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-10 z-50 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 mb-10 flex flex-col">
                
                <div className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-t-xl">
                    <h3 className="text-xl font-bold text-gray-800">
                        {editingId ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Proje Başlığı *</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori *</label>
                            <input type="text" name="category" placeholder="Örn: Full Stack" required value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Kısa Özet (Summary) *</label>
                        <textarea name="summary" rows="2" required value={formData.summary} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Detaylı Açıklama (Description) *</label>
                        <div className="border rounded-lg overflow-hidden">
                            <JoditEditor
                                ref={editor}
                                value={formData.description}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => handleEditorChange(newContent)}
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Teknolojiler *</label>
                          <input 
                              type="text" 
                              name="technologies" 
                              required
                              placeholder="Virgülle ayırarak yazın: React, Node.js" 
                              value={formData.technologies} 
                              onChange={handleChange} 
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                          />
                          <p className="text-xs text-gray-500 mt-1">Her bir teknolojiyi virgül ile ayırın.</p>
                      </div>
                      <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Öne Çıkan Özellikler (Feature) *</label>
                          <input 
                            type="text" 
                            name="feature" 
                            required
                            placeholder="Örn: Responsive Tasarım, Admin Panel" 
                            value={formData.feature} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                          />
                          <p className="text-xs text-gray-500 mt-1">Her bir özelliği virgül ile ayırın.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Github URL</label>
                             <input type="text" name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                         <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Live Demo URL</label>
                             <input type="text" name="liveDemoUrl" value={formData.liveDemoUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                         </div>
                    </div>

                    {/* --- YENİ CHECKBOX ALANI --- */}
                    <div className="flex items-center gap-2 mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <input 
                            type="checkbox" 
                            id="isPublished"
                            name="isPublished"
                            checked={formData.isPublished} 
                            onChange={handleChange}
                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 cursor-pointer"
                        />
                        <label htmlFor="isPublished" className="text-sm font-semibold text-gray-700 select-none cursor-pointer">
                            Bu projeyi sitede yayınla
                        </label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition">
                            İptal
                        </button>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className={`px-8 py-2.5 rounded-lg font-bold text-white shadow-lg transition transform hover:-translate-y-0.5 ${submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {submitting ? 'İşleniyor...' : (editingId ? 'Güncelle' : 'Projeyi Kaydet')}
                        </button>
                    </div>

                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSetting;