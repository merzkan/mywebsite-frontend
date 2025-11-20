import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} /> 
          <Route path="/blog/:id" element={<BlogDetail />} /> 
          <Route path="/project" element={<Project />} /> 
          <Route path="/project/:id" element={<ProjectDetail />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App