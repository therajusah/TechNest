import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Camera } from 'lucide-react';

import GalleryItem from './GalleryItem';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import { useConfig } from '../contexts/useConfig';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { apiUrl } = useConfig();

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v2/admin/gallery`);
      setImages(response.data); 
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching images');
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (loading) {
    return <Loader />;
  }

  if (images.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[40vh] flex items-center justify-center bg-black text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070"
            alt="Gallery background"
            className="object-cover w-full h-full opacity-50"
          />
        </div>
        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <Camera className="w-16 h-16 mb-4" />
            <h1 className="mb-4 text-5xl font-bold md:text-6xl">Event Gallery</h1>
            <p className="text-xl text-gray-200">Capturing moments that inspire innovation</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-16 mx-auto max-w-7xl"
      >
        <div className="grid grid-cols-1 gap-16">
          {images.map((image, index) => (
            <GalleryItem
              key={image._id}
              image={image}
              index={index}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
              <motion.button
                className="absolute text-white top-4 right-4 hover:text-gray-300"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
