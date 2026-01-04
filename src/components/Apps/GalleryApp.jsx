import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/Gallery.css';

const GalleryApp = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Dynamic import of images from assets/gallary
    const imageModules = import.meta.glob('../../assets/gallary/*.{png,jpg,jpeg,webp}', { eager: true });
    
    const loadedImages = Object.entries(imageModules).map(([path, module]) => {
      const fileName = path.split('/').pop();
      return {
        id: fileName,
        src: module.default,
        name: fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ") // Clean name
      };
    });

    setImages(loadedImages);
  }, []);

  return (
    <div className="gallery-app">
      <div className="gallery-header">
        <h2>My Photos</h2>
        <span className="image-count">{images.length} Items</span>
      </div>

      <div className="gallery-grid">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            className="gallery-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedImage(img)}
            layoutId={img.id}
          >
            <img src={img.src} alt={img.name} loading="lazy" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="gallery-modal-content"
              layoutId={selectedImage.id}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.src} alt={selectedImage.name} />
              <div className="image-info">
                <h3>{selectedImage.name}</h3>
              </div>
              <button className="close-button" onClick={() => setSelectedImage(null)}>×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryApp;
