import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Giriş Yap</h2>
          <p className="text-gray-500 mt-2">Hesabınıza erişmek için bilgilerinizi girin.</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* E-posta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
            <input 
              type="email" 
              placeholder="ornek@mail.com" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Şifremi Unuttum?</Link>
            </div>
          </div>

          {/* Buton */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
            Giriş Yap
          </button>
        </form>

        {/* Alt Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Hesabın yok mu? {' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Hemen Kayıt Ol
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login