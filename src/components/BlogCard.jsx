import { Link } from 'react-router-dom'

const BlogCard = ({ id }) => {
  return (
    <Link to={`/blog/${id}`} className="block h-full group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        <div className="h-48 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1499750310159-5b9887e74682?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Blog Kapak" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">Teknoloji</span>
            <span>19 Kasım 2025</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            React ve Tailwind ile Modern Web Tasarımı
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
            Bu yazıda React'in gücünü ve Tailwind CSS'in hızını kullanarak nasıl harika arayüzler tasarlayabileceğimizi öğreneceğiz.
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold">ÖK</div>
              <span className="text-sm font-medium text-gray-700">Ömer K.</span>
            </div>
            <span className="text-xs text-gray-400">5 dk okuma</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default BlogCard