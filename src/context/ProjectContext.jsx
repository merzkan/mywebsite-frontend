import { createContext, useState, useEffect, useContext } from 'react';
import { getProjects } from '../api/projectApi'; 

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
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
    }, []); 

    const value = { allProjects, loading, error };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => {
    return useContext(ProjectContext);
};