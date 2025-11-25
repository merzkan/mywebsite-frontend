import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 1. CONTEXTLERİ IMPORT EDİYORUZ ---
import { useProjectContext } from '../../context/ProjectContext';
import { useBlogContext } from '../../context/BlogContext';

import ProjectSetting from './ProjectSetting';
import BlogSetting from './BlogSetting';
import UserList from './UserList'; 

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects'); 
  const navigate = useNavigate();

  // --- 2. VERİLERİ ÇEKİYORUZ ---
  // Context içinden tüm proje ve blog listesini alıyoruz
  const { allProjects } = useProjectContext();
  const { allBlogs } = useBlogContext();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* SOL MENÜ (SIDEBAR) */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white">Admin Paneli</h1>
          <p className="text-gray-400 text-xs mt-1">Hoş geldin, {user?.name}</p>
        </div>
        <nav className="p-4 space-y-2">
          
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === 'projects' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            📂 Projeler
          </button>
          
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === 'blogs' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            📝 Blog Yazıları
          </button>

          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            👥 Kullanıcılar
          </button>

          <button 
             onClick={() => navigate('/')}
             className="w-full text-left px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition flex items-center gap-3"
          >
            🏠 Siteye Dön
          </button>
        </nav>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* --- 3. KARTLARI GÜNCELLİYORUZ --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Proje Kartı */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Toplam Proje</h3>
            {/* Statik '12' yerine dinamik uzunluğu yazıyoruz */}
            <p className="text-3xl font-bold text-gray-800 mt-2">
                {allProjects ? allProjects.length : 0}
            </p>
          </div>

          {/* Blog Kartı */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Toplam Blog</h3>
            {/* Statik '45' yerine dinamik uzunluğu yazıyoruz */}
            <p className="text-3xl font-bold text-gray-800 mt-2">
                {allBlogs ? allBlogs.length : 0}
            </p>
          </div>

          {/* Ziyaretçi Kartı (Burası şimdilik statik kalabilir veya Google Analytics verisi bağlanabilir) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Ziyaretçi</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">1.2K</p>
          </div>
        </div>

        {/* MODÜLER YAPI */}
        {activeTab === 'projects' && <ProjectSetting />}
        {activeTab === 'blogs' && <BlogSetting />}
        {activeTab === 'users' && <UserList />}

      </main>
    </div>
  )
}

export default Dashboard;