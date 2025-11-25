import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let user = null;

  // 1. GÜVENLİ VERİ OKUMA (Hata olursa uygulama çökmesin)
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    // Veri bozuksa temizle
    localStorage.removeItem("user");
  }

  // 2. KONTROL: Kullanıcı yoksa VEYA Kullanıcı var ama Admin değilse
  if (!user || user.role !== "admin") {
    // replace={true} ekledik: Kullanıcı "Geri" tuşuna basınca tekrar buraya düşüp döngüye girmesin
    return <Navigate to="/login" replace />;
  }

  // 3. Sorun yoksa (Admin ise) sayfayı göster
  return children;
};

export default PrivateRoute;