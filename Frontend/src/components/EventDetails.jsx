import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    member1: '',
    member2: '',
    member3: '',
    member4: '',
  });
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v2/events/${id}`)
      .then(response => {
        setEvent(response.data);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const showForm = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen md:flex-row">
      {!showRegistrationForm && event && (
        <div className="p-4 text-white bg-gray-700 rounded-md shadow-md md:w-1/2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <Link to="/events" className="text-lg text-white hover:text-gray-400">
              &#x2715;
            </Link>
          </div>
          <img
            src={event.imageUrl}
            alt="Event"
            className="object-cover w-full h-40 mb-4 sm:h-48 md:h-56 lg:h-64 xl:h-72"
          />
          <p className="mb-4">{event.description}</p>
          <button
            onClick={showForm}
            className="px-4 py-2 font-semibold text-blue-500 transition duration-300 ease-in-out bg-white rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Register for Event
          </button>
          <Link
            to={`/event/${event._id}/rulebook`}
            className="px-4 py-2 ml-4 font-semibold text-blue-500 transition duration-300 ease-in-out bg-white rounded-lg hover:bg-blue-600 hover:text-white"
          >
            View Rulebook
          </Link>
        </div>
      )}

      {showRegistrationForm && (
        <div className="p-4 text-black bg-gray-700 rounded-md shadow-md md:w-1/2 md:ml-4">
          <h2 className="mb-4 text-2xl font-bold">Register for Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
            {[1, 2, 3, 4].map((index) => (
              <input
                key={index}
                type="text"
                name={`member${index}`}
                value={formData[`member${index}`]}
                onChange={handleChange}
                placeholder={`Member ${index} Name`}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            ))}
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 font-semibold text-blue-500 transition duration-300 ease-in-out bg-white rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Register
              </button>
              <Link
                to="/events"
                onClick={() => setShowRegistrationForm(false)}
                className="px-4 py-2 font-semibold text-blue-500 transition duration-300 ease-in-out bg-white rounded-lg hover:bg-red-600 hover:text-white"
              >
                Close
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventDetails;