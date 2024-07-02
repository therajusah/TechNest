import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  if (!event || !event.imageUrl || !event.title || !event.description) {
    return null;
  }

  return (
    <div className="overflow-hidden transition duration-300 ease-in-out bg-white rounded-md shadow-md hover:shadow-lg">
      <img
        src={event.imageUrl}
        alt="Event"
        className="object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72"
      />

      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold">{event.title}</h2>
        <p className="text-gray-700">{event.description}</p>
      </div>

      <Link
        to={`/event/${event._id}`}
        className="block px-4 py-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-b-md hover:bg-blue-600"
      >
        View Details & Register
      </Link>
    </div>
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
