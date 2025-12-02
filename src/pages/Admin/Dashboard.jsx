import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProjectContext } from '../../context/ProjectContext';
import { useBlogContext } from '../../context/BlogContext';
import { getUsers } from '../../api/userApi';

import ProjectSetting from './ProjectSetting';
import BlogSetting from './BlogSetting';
import UserList from './UserList'; 

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects'); 
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();

  const { allProjects } = useProjectContext();
  const { allBlogs } = useBlogContext();
  

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const usersData = await getUsers();
        if (Array.isArray(usersData)) {
            setUserCount(usersData.length);
        }
      } catch (error) {
        console.error("Kullanıcı sayısı alınamadı:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white">
      
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Proje Kartı */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Toplam Proje</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
                {allProjects ? allProjects.length : 0}
            </p>
          </div>

          {/* Blog Kartı */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Toplam Blog</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
                {allBlogs ? allBlogs.length : 0}
            </p>
          </div>

          {/* Ziyaretçi Kartı  */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Kullanıcı sayısı</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{userCount}</p>
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