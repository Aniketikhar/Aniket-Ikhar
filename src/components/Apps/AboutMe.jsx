import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaDownload,
  FaReact,
  FaNodeJs,
  FaPython,
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaTrophy,
  FaRocket,
  FaStar
} from 'react-icons/fa';
import { 
  SiMongodb, 
  SiExpress, 
  SiJavascript, 
  SiTypescript, 
  SiTailwindcss,
  SiNextdotjs,
  SiCplusplus
} from 'react-icons/si';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/AboutMe.css';

// Import gallery images
import img1 from '../../assets/gallary/GlanceAi_-123611092.webp';
import img2 from '../../assets/gallary/GlanceAi_-39941883.webp';
import img3 from '../../assets/gallary/GlanceAi_-615309033.webp';
import img4 from '../../assets/gallary/GlanceAi_190436750.webp';
import img5 from '../../assets/gallary/GlanceAi_535933890.webp';
import img6 from '../../assets/gallary/GlanceAi_689058354.webp';

const AboutMe = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  return (
    <div className={`about-me-app-v2 ${theme}`}>
      <motion.div 
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Hero Card - Large with 3D Image */}
        <motion.div className="card hero-card" variants={itemVariants}>
          <div className="hero-content">
            <div className="hero-image">
              <img src={img1} alt="3D Character" />
            </div>
            <div className="hero-text">
              <h1>Creative Developer</h1>
              <p>Building beautiful digital experiences</p>
              <div className="hero-badge">
                <FaRocket /> Available for projects
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Greeting */}
        <motion.div className="card profile-card" variants={itemVariants}>
          <div className="profile-avatar">
            <div className="avatar-ring">
              <span className="avatar-initials">AI</span>
            </div>
          </div>
          <h2 className="greeting">Hello, I'm Aniket</h2>
          <p className="tagline">Full Stack Developer & UI/UX Enthusiast</p>
          <div className="quick-info">
            <div className="info-item">
              <FaMapMarkerAlt />
              <span>Nagpur, India</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards Row */}
        <motion.div className="card stat-card yellow" variants={itemVariants}>
          <div className="stat-icon"><FaTrophy /></div>
          <div className="stat-content">
            <h3>20+</h3>
            <p>Projects</p>
          </div>
        </motion.div>

        <motion.div className="card stat-card blue" variants={itemVariants}>
          <div className="stat-icon"><FaBriefcase /></div>
          <div className="stat-content">
            <h3>3+</h3>
            <p>Years Exp</p>
          </div>
        </motion.div>

        {/* My Skills - Collection Style */}
        <motion.div className="skills-section" variants={itemVariants}>
          <h2 className="section-title">
            <FaStar className="title-icon" />
            My Skills
          </h2>
          <div className="skills-grid">
            <SkillCard icon={<FaReact />} name="React" color="#61DAFB" image={img2} />
            <SkillCard icon={<SiNextdotjs />} name="Next.js" color="#000000" image={img3} />
            <SkillCard icon={<FaNodeJs />} name="Node.js" color="#339933" image={img4} />
            <SkillCard icon={<SiMongodb />} name="MongoDB" color="#47A248" image={img5} />
            <SkillCard icon={<SiTypescript />} name="TypeScript" color="#3178C6" image={img6} />
            <SkillCard icon={<SiCplusplus />} name="C++" color="#00599C" image={img2} />
          </div>
        </motion.div>

        {/* Education Card */}
        <motion.div className="card education-card purple" variants={itemVariants}>
          <div className="card-icon">
            <FaGraduationCap />
          </div>
          <div className="card-content">
            <h3>MCA Graduate</h3>
            <p>G H Raisoni Institute</p>
            <span className="year">2024</span>
          </div>
        </motion.div>

        {/* Download Resume */}
        <motion.div className="card resume-card pink" variants={itemVariants}>
          <div className="card-icon">
            <FaDownload />
          </div>
          <div className="card-content">
            <h3>Resume</h3>
            <p>Download PDF</p>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div className="card social-card" variants={itemVariants}>
          <h3 className="card-title">Connect With Me</h3>
          <div className="social-grid">
            <a href="https://github.com" className="social-btn github" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" className="social-btn linkedin" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" className="social-btn twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="mailto:contact@aniket.dev" className="social-btn email">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

const SkillCard = ({ icon, name, color, image }) => (
  <motion.div 
    className="skill-card"
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="skill-image">
      <img src={image} alt={name} />
    </div>
    <div className="skill-overlay">
      <div className="skill-icon" style={{ color }}>
        {icon}
      </div>
      <span className="skill-name">{name}</span>
    </div>
  </motion.div>
);

export default AboutMe;
