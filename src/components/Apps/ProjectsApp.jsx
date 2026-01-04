import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRocket, FaCode, FaStar, FaCompass, FaMobileAlt, FaTools } from 'react-icons/fa';
import '../../styles/Projects.css';

const categories = [
  { id: 'discover', name: 'Discover', icon: <FaCompass /> },
  { id: 'featured', name: 'Featured', icon: <FaStar /> },
  { id: 'web', name: 'Web Apps', icon: <FaCode /> },
  { id: 'mobile', name: 'Mobile', icon: <FaMobileAlt /> },
  { id: 'tools', name: 'Tools', icon: <FaTools /> },
];

const projectsData = [
  {
    id: 1,
    title: "Recipe Web Application",
    subtitle: "Cook with confidence",
    description: "A full-featured recipe platform allowing users to browse, search, and save their favorite recipes.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    color: "#FF6B6B",
    category: "web",
    featured: true,
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Crypto Tracker",
    subtitle: "Market insights real-time",
    description: "Real-time cryptocurrency price tracking with charts and portfolio management features.",
    tech: ["React", "REST API", "Chart.js"],
    color: "#4ECDC4",
    category: "web",
    featured: false,
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    subtitle: "Shop seamless",
    description: "Full-stack e-commerce solution with cart, checkout, and payment integration.",
    tech: ["MERN Stack", "Stripe", "JWT"],
    color: "#95E1D3",
    category: "web",
    featured: false,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "URL Shortener",
    subtitle: "Links made simple",
    description: "Service to create shortened URLs with analytics and custom aliases.",
    tech: ["Node.js", "Express", "MongoDB"],
    color: "#F38181",
    category: "tools",
    featured: false,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Task Manager",
    subtitle: "Organize your life",
    description: "A drag and drop task management app inspired by Trello.",
    tech: ["React", "Redux", "Firebase"],
    color: "#6C5CE7",
    category: "tools",
    featured: true,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
  }
];

const ProjectsApp = () => {
  const [activeCategory, setActiveCategory] = useState('discover');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'discover' 
    ? projectsData 
    : activeCategory === 'featured'
      ? projectsData.filter(p => p.featured)
      : projectsData.filter(p => p.category === activeCategory);

  const FeaturedProject = ({ project }) => (
    <motion.div 
      layoutId={`project-${project.id}`}
      className="featured-hero"
      onClick={() => setSelectedProject(project)}
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%), url(${project.image})`
      }}
    >
      <div className="hero-content">
        <span className="hero-subtitle">FEATURED</span>
        <h2 className="hero-title">{project.title}</h2>
        <p className="hero-desc">{project.subtitle}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="projects-app app-store-theme">
      <div className="app-sidebar">
        <div className="sidebar-search">
          <input type="text" placeholder="Search" />
        </div>
        <nav className="sidebar-nav">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="nav-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="app-content">
        <div className="content-header">
          <h1>{categories.find(c => c.id === activeCategory)?.name}</h1>
        </div>

        {activeCategory === 'discover' && (
          <div className="featured-section">
             {projectsData.filter(p => p.featured).map(p => (
               <FeaturedProject key={p.id} project={p} />
             ))}
          </div>
        )}

        <div className="projects-grid-store">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                className="store-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="card-image" style={{ backgroundImage: `url(${project.image})` }}></div>
                <div className="card-info">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-subtitle">{project.subtitle}</p>
                  <div className="card-actions">
                    <button className="get-btn">VIEW</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
            <motion.div 
              layoutId={`card-${selectedProject.id}`} 
              className="project-modal"
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedProject(null)}>×</button>
              <div className="modal-header" style={{ backgroundImage: `url(${selectedProject.image})` }}>
                <div className="modal-header-content">
                  <h1>{selectedProject.title}</h1>
                  <p>{selectedProject.subtitle}</p>
                </div>
              </div>
              <div className="modal-body">
                <div className="modal-actions-bar">
                  <button className="download-btn">
                     <FaExternalLinkAlt /> Open Project
                  </button>
                  <button className="share-btn">
                     <FaGithub /> Source
                  </button>
                </div>
                <div className="modal-description">
                  <h3>About</h3>
                  <p>{selectedProject.description}</p>
                  
                  <h3>Technologies</h3>
                  <div className="tech-tags">
                    {selectedProject.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsApp;
