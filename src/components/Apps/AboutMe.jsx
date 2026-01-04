import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaLaptopCode } from 'react-icons/fa';
import '../../styles/AboutMe.css';

const AboutMe = () => {
  return (
    <div className="about-me-app">
      <div className="about-header">
        <motion.div 
          className="profile-section"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="avatar-circle">
            <span className="initials">AI</span>
          </div>
          <h1 className="name">Aniket Ikhar</h1>
          <div className="role-badges">
            <span className="badge">Full Stack Developer</span>
            <span className="badge">MERN Stack</span>
          </div>
        </motion.div>
      </div>

      <div className="about-content">
        <motion.section 
          className="info-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-header">
            <FaGraduationCap className="icon" />
            <h2>Education</h2>
          </div>
          <div className="card-body">
            <p><strong>Master of Computer Applications (MCA)</strong></p>
            <p>G H Raisoni Institute of Engineering and Technology, Nagpur</p>
            <p className="subtext">Recently Completed</p>
          </div>
        </motion.section>

        <motion.section 
          className="info-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-header">
            <FaLaptopCode className="icon" />
            <h2>About Me</h2>
          </div>
          <div className="card-body">
            <p>
              During my fourth semester, I undertook a full stack developer internship, 
              which significantly enhanced my skills in ReactJS, Node.js, MongoDB, and Express.js.
            </p>
            <p>
              I have successfully created several projects including a recipe web application, 
              a crypto tracker, an ecommerce web application, and a URL shortener.
            </p>
            <p>
              I am known for being consistent and focused on my work, ensuring high-quality 
              results. Additionally, I am a good team player, consistently contributing to 
              collaborative projects.
            </p>
          </div>
        </motion.section>

        <motion.section 
          className="info-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <FaCertificate className="icon" />
            <h2>Certifications</h2>
          </div>
          <div className="card-body">
            <ul className="cert-list">
              <li>
                <div className="cert-badge">🐍</div>
                <div>
                  <strong>Python Certification</strong>
                  <p className="subtext">Google</p>
                </div>
              </li>
              <li>
                <div className="cert-badge">⭐</div>
                <div>
                  <strong>5-Star Gold Badge in C++</strong>
                  <p className="subtext">HackerRank</p>
                </div>
              </li>
              <li>
                <div className="cert-badge">🧩</div>
                <div>
                  <strong>Problem Solving</strong>
                  <p className="subtext">HackerRank</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutMe;
