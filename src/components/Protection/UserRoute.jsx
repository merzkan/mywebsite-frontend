import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  let user = null;

  // 1. GÜVENLİ VERİ OKUMA (Hata olursa uygulama çökmesin diye)
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    // Veri bozuksa (elle değiştirildiyse) temizleyelim
    localStorage.removeItem("user");
  }

  // 2. KULLANICI YOKSA -> Login'e git
  if (!user) {
    // replace={true} sayesinde kullanıcı "Geri" tuşuna basınca tekrar bu sayfaya düşmez
    return <Navigate to="/login" replace />;
  }

  // 3. KULLANICI VARSA -> Sayfayı göster
  return children;
};

export default UserRoute;