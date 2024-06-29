import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  if (!event || !event.imageUrl || !event.title || !event.description) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-red-500 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      <img
        src={event.imageUrl}
        alt="Event"
        className="object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
      </div>

      <Link
        to={`/event/${event.id}`}
        className="block bg-white text-black-500 font-semibold px-4 py-2 rounded-b-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
      >
        View Details & Register
      </Link>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
