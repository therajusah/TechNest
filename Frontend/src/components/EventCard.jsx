import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';

const EventCard = ({ event, index }) => {
  if (!event || !event.imageUrl || !event.title || !event.description) {
    return null;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
    >
      <div className="relative overflow-hidden group">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="object-cover w-full h-48 transition-transform duration-300 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black opacity-0 bg-opacity-40 group-hover:opacity-100">
          <Link
            to={`/event/${event._id}`}
            className="flex items-center px-6 py-2 space-x-2 font-medium text-black transition-transform duration-300 transform -translate-y-4 bg-white rounded-full group-hover:translate-y-0"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold line-clamp-1">{event.title}</h3>
        <p className="mb-4 text-gray-600 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2">
          {event.date && (
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.date}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
          )}
          {event.maxParticipants && (
            <div className="flex items-center text-gray-500">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">Max {event.maxParticipants} participants</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string,
    location: PropTypes.string,
    maxParticipants: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default EventCard;
