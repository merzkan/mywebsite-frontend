import React, { useState, useEffect } from 'react';
// 1. Az önce yazdığımız servisi çağırıyoruz
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

  if (loading) return <div className="p-6 text-gray-500">Kullanıcılar yükleniyor...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Kullanıcı Listesi ({users.length})</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              {/* Sütun Başlıkları */}
              <th className="p-4 border-b">Kullanıcı Adı</th>
              <th className="p-4 border-b">Ad Soyad</th>
              <th className="p-4 border-b">E-posta</th>
              <th className="p-4 border-b">Rol</th>
            </tr>
          </thead>
          <tbody>
            {/* 3. Gelen veriyi döngüye sokup ekrana basıyoruz */}
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition border-b last:border-0">
                
                <td className="p-4 font-medium text-gray-800">{user.username}</td>
                
                <td className="p-4 text-gray-600">{user.name} {user.surname}</td>
                
                <td className="p-4 text-gray-500 text-sm">{user.email}</td>
                
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-50 text-blue-600'
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
          <p className="text-center text-gray-500 py-8">Henüz kayıtlı kullanıcı yok.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;