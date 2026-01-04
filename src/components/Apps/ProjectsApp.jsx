import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../../styles/Projects.css';

const projectsData = [
  {
    id: 1,
    title: "Recipe Web Application",
    description: "A full-featured recipe platform allowing users to browse, search, and save their favorite recipes.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    color: "#FF6B6B",
    status: "Completed"
  },
  {
    id: 2,
    title: "Crypto Tracker",
    description: "Real-time cryptocurrency price tracking with charts and portfolio management features.",
    tech: ["React", "REST API", "Chart.js"],
    color: "#4ECDC4",
    status: "Completed"
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with cart, checkout, and payment integration.",
    tech: ["MERN Stack", "Stripe", "JWT"],
    color: "#95E1D3",
    status: "Completed"
  },
  {
    id: 4,
    title: "URL Shortener",
    description: "Service to create shortened URLs with analytics and custom aliases.",
    tech: ["Node.js", "Express", "MongoDB"],
    color: "#F38181",
    status: "Completed"
  }
];

const ProjectsApp = () => {
  return (
    <div className="projects-app">
      <div className="projects-header">
        <h1 className="projects-title">My Projects</h1>
        <p className="projects-subtitle">A collection of my development work</p>
      </div>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="project-card-header" style={{ 
              background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
              borderBottom: `2px solid ${project.color}60`
            }}>
              <div className="project-status" style={{ background: project.color }}>
                {project.status}
              </div>
            </div>

            <div className="project-card-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="tech-stack-list">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag" style={{ borderColor: project.color + '60' }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-actions">
                <button className="action-btn">
                  <FaGithub /> Code
                </button>
                <button className="action-btn primary" style={{ background: project.color }}>
                  <FaExternalLinkAlt /> Demo
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">{projectsData.length}</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">4</div>
          <div className="stat-label">Technologies</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Success Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsApp;
