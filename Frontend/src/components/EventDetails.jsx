import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from URL params (Todo...)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    member1: '',
    member2: '',
    member3: '',
    member4: '',
  });
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

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

  // Example event data (Todo...)
  const event = {
    id: 1,
    title: 'Sample Event',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis justo at urna semper lobortis.',
    imageUrl: "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example image URL
  };

  const showForm = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen">
      {!showRegistrationForm && (
        <div className="bg-gray-700 text-white p-4 rounded-md shadow-md md:w-1/2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <Link to="/events" className="text-white text-lg hover:text-gray-400">
              &#x2715;
            </Link>
          </div>
          <img
            src={event.imageUrl}
            alt="Event"
            className="object-cover w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 mb-4"
          />
          <p className="mb-4">{event.description}</p>
          <button
            onClick={showForm}
            className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
          >
            Register for Event
          </button>
          <Link
            to={`/event/${event.id}/rulebook`}
            className="ml-4 bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
          >
            View Rulebook
          </Link>
        </div>
      )}

      {showRegistrationForm && (
        <div className="bg-gray-700 text-black p-4 rounded-md shadow-md md:w-1/2 md:ml-4">
          <h2 className="text-2xl font-bold mb-4">Register for Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="border border-gray-300 rounded px-3 py-2 w-full"
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
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            ))}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
              >
                Register
              </button>
              <Link
                to="/events"
                onClick={() => setShowRegistrationForm(false)}
                className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition duration-300 ease-in-out"
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
