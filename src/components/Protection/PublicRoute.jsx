import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  let user = null;

  // 1. GÜVENLİ VERİ OKUMA (Hata olursa uygulama çökmesin diye)
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    // Veri bozuksa temizle ki sorun düzelmiş olsun
    localStorage.removeItem("user");
  }

  // 2. KULLANICI ZATEN VARSA (Giriş Yapmışsa)
  if (user) {
    if (user.role === "admin") {
      // replace={true} ekledik: Geri butonuna basınca tekrar Login'e dönmesin
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // 3. Kullanıcı Yoksa -> Sayfayı (Login/Register) Göster
  return children;
};

export default PublicRoute;