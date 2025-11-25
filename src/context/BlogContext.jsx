import { createContext, useState, useEffect, useContext } from 'react';
import { getBlogs } from '../api/blogApi'; 

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const data = await getBlogs(); 
                setAllBlogs(data);
                setLoading(false);
            } catch (err) {
                setError("Tüm bloglar yüklenirken bir sorun oluştu.");
                setLoading(false);
            }
        };
        fetchAllBlogs();
    }, []);

    const value = { allBlogs, loading, error };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlogContext = () => {
    return useContext(BlogContext);
};