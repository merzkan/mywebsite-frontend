import { createContext, useState, useEffect, useContext } from 'react';
// 👈 Mevcut API fonksiyonunu buradan çağırıyoruz
import { getProjects } from '../api/projectApi'; 

// 1. Context nesnesini oluştur
const ProjectContext = createContext();

// 2. Provider bileşenini oluştur (Veri Çekme İşlemi burada yapılır)
export const ProjectProvider = ({ children }) => {
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Component ilk yüklendiğinde bir kez çalışır
    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                // API servis dosyasından tüm projeleri çek
                const data = await getProjects(); 
                setAllProjects(data);
                setLoading(false);
            } catch (err) {
                setError("Tüm projeler yüklenirken bir sorun oluştu.");
                setLoading(false);
                console.error("Context Fetch Hatası:", err);
            }
        };
        fetchAllProjects();
    }, []); // Bağımlılık dizisi boş olduğu için sadece mount anında çalışır

    // Tüm component'lere dağıtılacak değerler
    const value = { allProjects, loading, error };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
};

// 3. Kullanım Hook'u (Component'lerde veriye kolay erişim sağlar)
export const useProjectContext = () => {
    return useContext(ProjectContext);
};