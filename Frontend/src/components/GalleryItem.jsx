import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Calendar, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const GalleryItem = ({ image, index, onImageClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex flex-col md:flex-row ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      } items-center gap-8 bg-white rounded-2xl shadow-lg overflow-hidden`}
    >
      <div 
        className="relative w-full overflow-hidden cursor-pointer md:w-1/2 group"
        onClick={() => onImageClick(image)}
      >
        <motion.img
          src={image.imageUrl}
          alt={image.title}
          className="object-cover w-full transition-transform duration-500 transform aspect-video group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-30">
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="text-white"
          >
            <Camera className="w-8 h-8" />
          </motion.div>
        </div>
      </div>
      <div className="w-full p-8 md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-4 text-2xl font-bold">{image.title}</h3>
          {image.description && (
            <p className="mb-4 text-gray-600">{image.description}</p>
          )}
          {image.date && (
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(image.date).toLocaleDateString()}</span>
            </div>
          )}
          {image.link && (
            <motion.a
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 font-medium text-black hover:underline"
              whileHover={{ x: 5 }}
            >
              View Event Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};


GalleryItem.propTypes = {
  image: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default GalleryItem;
