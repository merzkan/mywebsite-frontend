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
    // DEĞİŞİKLİK 1: Ana Zemin Slate-900 (Koyu Arduvaz)
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900 text-slate-300 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* SOL MENÜ (SIDEBAR) - Slate-950 (Bir tık daha koyu) */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Admin Paneli</h1>
          <p className="text-sky-400 text-xs mt-1 font-medium">Hoş geldin, {user?.name}</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {/* Projeler Tab */}
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 font-medium ${
                activeTab === 'projects' 
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>📂</span> Projeler
          </button>
          
          {/* Blog Tab */}
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 font-medium ${
                activeTab === 'blogs' 
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>📝</span> Blog Yazıları
          </button>

          {/* Kullanıcılar Tab */}
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 font-medium ${
                activeTab === 'users' 
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>👥</span> Kullanıcılar
          </button>

          <div className="pt-4 mt-4 border-t border-slate-800">
            <button 
                onClick={() => navigate('/')}
                className="w-full text-left px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition flex items-center gap-3 group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Siteye Dön
            </button>
          </div>
        </nav>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-900">
        
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Proje Kartı: Slate-800 Zemin */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 hover:border-sky-500/30 transition-colors group">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Toplam Proje</h3>
            <div className="flex items-end justify-between mt-2">
                <p className="text-3xl font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                    {allProjects ? allProjects.length : 0}
                </p>
                <span className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity">📂</span>
            </div>
          </div>

          {/* Blog Kartı */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 hover:border-sky-500/30 transition-colors group">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Toplam Blog</h3>
            <div className="flex items-end justify-between mt-2">
                <p className="text-3xl font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                    {allBlogs ? allBlogs.length : 0}
                </p>
                <span className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity">📝</span>
            </div>
          </div>

          {/* Ziyaretçi Kartı */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 hover:border-sky-500/30 transition-colors group">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Kullanıcı Sayısı</h3>
            <div className="flex items-end justify-between mt-2">
                <p className="text-3xl font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                    {userCount}
                </p>
                <span className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity">👥</span>
            </div>
          </div>
        </div>

        {/* MODÜLER YAPI - İçerik alanı */}
        <div className="bg-slate-800/30 rounded-2xl border border-slate-800/50 p-1 min-h-[500px]">
            {activeTab === 'projects' && <ProjectSetting />}
            {activeTab === 'blogs' && <BlogSetting />}
            {activeTab === 'users' && <UserList />}
        </div>

      </main>
    </div>
  )
}

export default Dashboard;