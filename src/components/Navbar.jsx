import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // localStorage okuma işlemini güvenli hale getiriyoruz
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // State'i güncelle
    setIsOpen(false);
    navigate("/login");
    // window.location.reload(); // SPA performansını düşürdüğü için reload yerine state yönetimi tercih edilir, ancak auth yapına göre gerekirse açabilirsin.
  };

  const checkActive = (route) => {
    if (route === '/') return path === '/';
    return path.startsWith(route);
  };

  const getLinkClass = (route) => {
    const baseClass = "text-sm font-medium transition duration-300 ";
    const activeClass = "text-blue-400 font-bold border-b-2 border-blue-400 pb-1";
    const inactiveClass = "text-gray-300 hover:text-white hover:scale-105 transform";
    return baseClass + (checkActive(route) ? activeClass : inactiveClass);
  };

  const getMobileLinkClass = (route) => {
    const baseClass = "block px-3 py-2 rounded-md text-base font-medium transition ";
    return checkActive(route) 
      ? baseClass + "bg-gray-900 text-white border-l-4 border-blue-500"
      : baseClass + "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* LOGO - LCP ve CLS Optimizasyonu yapıldı */}
        <Link to="/" className="text-2xl font-bold tracking-wider cursor-pointer flex items-center gap-2" aria-label="Merzkan Ana Sayfa">
          <img 
            src="/logo.png" 
            alt="Merzkan Logo" 
            width="40" 
            height="40" 
            fetchpriority="high"
            className='w-10 h-10 md:w-10 md:h-10 transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:drop-shadow-[0_0_10px_rgba(238,129,50,0.8)] object-contain'
          />
          Merzkan
        </Link>

        {/* --- DESKTOP MENÜ --- */}
        <div className="hidden md:flex space-x-8 items-center">
          
          <div className="flex space-x-6 mt-1"> 
            <Link to="/" className={getLinkClass('/')}>Ana Sayfa</Link>
            <Link to="/blog" className={getLinkClass('/blog')}>Yazılar</Link>
            <Link to="/project" className={getLinkClass('/project')}>Projeler</Link>
            <Link to="/about" className={getLinkClass('/about')}>Hakkımda</Link>
          </div>
          
          <div className="h-6 w-px bg-gray-700"></div>
          
          <div className="flex items-center space-x-4">
            {!user ? (
              // Giriş Yapılmamışsa
              <>
                <Link to="/login" className="bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-0.5">
                  Giriş Yap
                </Link>
                <Link to="/register" className="bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-0.5">
                  Kayıt Ol
                </Link>
              </>
            ) : (
              // Kullanıcı Giriş Yapmışsa
              <div className="flex items-center gap-4">
                
                {/* 1. İSİM (En Solda) */}
                <span className="text-gray-300 text-sm font-medium select-none">
                  {user.username || user.name}
                </span>

                {/* 2. BUTONLAR GRUBU (Yan Yana ve Eşit Boyutlu) */}
                <div className="flex items-center gap-2">
                    
                    {/* Admin veya Ayarlar Butonu */}
                    {user.role === "admin" ? (
                      <Link 
                        to="/admin/dashboard" 
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition shadow-sm"
                      >
                        Admin
                      </Link>
                    ) : (
                      <Link 
                        to="/setting"
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition shadow-sm"
                      >
                        Ayarlar
                      </Link>
                    )}

                    {/* Çıkış Butonu */}
                    <button 
                      onClick={handleLogout}
                      type="button"
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition shadow-sm"
                    >
                      Çıkış
                    </button>
                </div>
              </div>                   
            )}
          </div>
        </div>

        {/* --- MOBİL BUTON (Erişilebilirlik Düzeltmesi) --- */}
        <button 
          type="button"
          className="md:hidden focus:outline-none text-gray-300 hover:text-white p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Menüyü Kapat" : "Menüyü Aç"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* --- MOBİL MENÜ --- */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden mt-4 bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-700 animate-fade-in-down">
          <div className="flex flex-col space-y-3">
            <Link to="/" onClick={() => setIsOpen(false)} className={getMobileLinkClass('/')}>
                Ana Sayfa
            </Link>
          </div>
          <div className="border-t border-gray-700 my-4"></div>
          <div className="flex flex-col space-y-2">
            <Link to="/blog" onClick={() => setIsOpen(false)} className={getMobileLinkClass('/blog')}>
              Yazılar
            </Link>
            <Link to="/project" onClick={() => setIsOpen(false)} className={getMobileLinkClass('/project')}>
              Projeler
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={getMobileLinkClass('/about')}>
              Hakkımda
            </Link>
          </div>
          <div className="border-t border-gray-700 my-4"></div>
          <div className="flex flex-col space-y-3">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-center text-gray-300 hover:text-white py-2 font-medium">
                  Giriş Yap
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="text-center bg-white text-gray-900 py-2 rounded-lg font-bold">
                  Kayıt Ol
                </Link>
              </>
            ) : (
              <>
                <div className="text-center text-gray-400 text-sm mb-2">
                  Merhaba, <span className="text-white font-bold">{user.username || user.name}</span>
                </div>
                
                {user.role === "admin" ? (
                  <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="text-center text-red-400 font-bold border border-red-400 py-2 rounded hover:bg-red-400 hover:text-white transition">
                    Admin Paneli
                  </Link>
                ) : (
                  <Link to="/setting" onClick={() => setIsOpen(false)} className="text-center bg-gray-700 text-gray-300 hover:text-white py-2 rounded-lg font-medium transition">
                    Ayarlar
                  </Link>
                )}

                <button type="button" onClick={handleLogout} className="w-full text-center bg-gray-700 text-gray-300 hover:text-white py-2 rounded-lg font-medium transition">
                  Çıkış Yap
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar