import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/userApi';

const UserList = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); 
        setUsers(data); 
      } catch (error) {
        console.log("Hata:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="p-6 text-slate-400">Kullanıcılar yükleniyor...</div>;

  return (
    // DEĞİŞİKLİK 1: Kart Arka Planı Slate-800
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-100">Kullanıcı Listesi ({users.length})</h2>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-700/50">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Header: Slate-900/50 */}
            <tr className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
              <th className="p-4 border-b border-slate-700">Kullanıcı Adı</th>
              <th className="p-4 border-b border-slate-700">Ad Soyad</th>
              <th className="p-4 border-b border-slate-700">E-posta</th>
              <th className="p-4 border-b border-slate-700">Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-700/30 transition">
                
                <td className="p-4 font-medium text-slate-200">{user.username}</td>
                
                <td className="p-4 text-slate-300">{user.name} {user.surname}</td>
                
                <td className="p-4 text-slate-400 text-sm">{user.email}</td>
                
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    user.role === 'admin' 
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                      : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                  }`}>
                    {user.role === 'admin' ? 'Yönetici' : 'Üye'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Liste boşsa uyar */}
        {!loading && users.length === 0 && (
          <p className="text-center text-slate-500 py-8">Henüz kayıtlı kullanıcı yok.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;