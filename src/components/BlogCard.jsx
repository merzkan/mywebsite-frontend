import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const {_id, title, category, summary, author, readingTime, coverImageUrl, createdAt } = blog;
  
  const formattedDate = new Date(createdAt).toLocaleDateString('tr-TR');

  return (
    <Link to={`/blog/${_id}`} className="block h-full group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        
        {/* Resim Alanı */}
        <div className="h-48 overflow-hidden">
          <img 
            src={"https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
              {category}
            </span>
            <span className="flex items-center gap-1">
               🗓 {formattedDate}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
            {summary}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold uppercase">
                {author?.initials || "Y"}
              </div>
              <span className="text-sm font-medium text-gray-700">{author?.name}</span>
            </div>
            <span className="text-xs text-gray-400">⏱ {readingTime}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard;