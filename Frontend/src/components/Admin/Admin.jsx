import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    id: '',
    imageUrl: '',
    title: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v2/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };

  const handleAddEvent = () => {
    axios.post('http://localhost:5000/api/v2/admin/events', currentEvent)
      .then(response => {
        setEvents([...events, response.data]);
        setShowForm(false);
        setCurrentEvent({ id: '', imageUrl: '', title: '', description: '' });
        toast.success('Event added successfully!');
      })
      .catch(error => {
        console.error('Error adding event:', error);
        toast.error('Failed to add event.');
      });
  };

  const handleUpdateEvent = (id) => {
    axios.put(`http://localhost:5000/api/v2/admin/events/${id}`, currentEvent)
      .then(response => {
        setEvents(events.map(event => (event._id === id ? response.data : event)));
        setIsEditing(false);
        setShowForm(false);
        setCurrentEvent({ id: '', imageUrl: '', title: '', description: '' });
        toast.success('Event updated successfully!');
      })
      .catch(error => {
        console.error('Error updating event:', error);
        toast.error('Failed to update event.');
      });
  };

  const handleDeleteEvent = (id) => {
    axios.delete(`http://localhost:5000/api/v2/admin/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event._id !== id));
        toast.success('Event deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event.');
      });
  };

  const scrollFormIntoView = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between p-4 bg-blue-600">
        <div className="text-lg font-bold text-white">Admin Panel</div>
        <div className="flex space-x-4">
          <a href="/" className="text-white">Home</a>
          <a href="/events" className="text-white">Events</a>
          <a href="/profile" className="text-white">Profile</a>
        </div>
      </nav>

      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Manage Events</h1>

        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) scrollFormIntoView(); // Scroll to form when opening
          }}
          className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
        >
          {showForm ? 'Close Form' : 'Add Event'}
        </button>

        {showForm && (
          <div ref={formRef} className="p-4 mb-6 bg-white rounded shadow">
            <h2 className="mb-4 text-xl">{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={currentEvent.imageUrl}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border"
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={currentEvent.title}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={currentEvent.description}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border"
            />
            {isEditing ? (
              <button
                onClick={() => handleUpdateEvent(currentEvent._id)}
                className="px-4 py-2 text-white bg-green-500 rounded"
              >
                Update Event
              </button>
            ) : (
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Add Event
              </button>
            )}
          </div>
        )}

        <ul className="space-y-4">
          {events.map(event => (
            <li key={event._id} className="flex items-center justify-between p-4 bg-white rounded shadow">
              <div>
                <h2 className="mb-2 text-lg font-bold">{event.title}</h2>
                <h4 className="mb-2 text-gray-600">{event.description}</h4>
                <img src={event.imageUrl} alt={event.title} className="w-24 h-24" />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setCurrentEvent(event);
                    setIsEditing(true);
                    setShowForm(true);
                    scrollFormIntoView(); // Scroll to form when editing
                  }}
                  className="px-4 py-2 text-white bg-yellow-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminPanel;
