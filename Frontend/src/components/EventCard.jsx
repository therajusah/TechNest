import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EventCard = ({ event }) => {
  if (!event || !event.imageUrl || !event.title || !event.description) {
    return null;
  }

  return (
    <motion.div
      className="overflow-hidden transition duration-300 ease-in-out bg-white rounded-md shadow-md hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <motion.img
        src={event.imageUrl}
        alt="Event"
        className="object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        whileHover={{ backgroundColor: "#007BFF" }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={`/event/${event._id}`}
          className="block px-4 py-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-b-md hover:bg-blue-600"
        >
          <motion.span
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            View Details & Register
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
