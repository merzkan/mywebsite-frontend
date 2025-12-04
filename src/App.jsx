import { Routes, Route, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog/Blog" 
import BlogDetail from "./pages/Blog/BlogDetail"
import Login from "./pages/Account/Login" 
import Register from "./pages/Account/Register" 
import Project from "./pages/Project/Project" 
import ProjectDetail from "./pages/Project/ProjectDetail"
import ForgotPassword from "./pages/Account/ForgotPassword"
import ScrollToTop from "./utilities/ScrollToTop"
import { ProjectProvider } from './context/ProjectContext';
import { BlogProvider } from './context/BlogContext'
import { AuthProvider } from './context/AuthContext' // Yeni ekledik
import Dashboard from "./pages/Admin/Dashboard"
import PrivateRoute from './components/Protection/PrivateRoute'
import PublicRoute from './components/Protection/PublicRoute'
import UserSetting from './pages/Setting/UserSetting'
import UserRoute from './components/Protection/UserRoute'

function App() {
  return (
    <AuthProvider> {/* En dışa veya diğer providerların yanına ekledik */}
      <ProjectProvider>
        <BlogProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* --- HERKESE AÇIK SAYFALAR --- */}
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} /> 
                <Route path="/blog/:id" element={<BlogDetail />} /> 
                <Route path="/project" element={<Project />} /> 
                <Route path="/project/:id" element={<ProjectDetail />} /> 
                <Route path="/about" element={<About />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                <Route 
                  path="/setting" 
                  element={
                    <UserRoute>
                      <UserSetting />
                    </UserRoute>
                  } 
                />

                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BlogProvider>
      </ProjectProvider>
    </AuthProvider>
  )
}

export default App