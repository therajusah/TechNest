import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConfig } from '../../contexts/useConfig';
import ManageGallery from './ManageGallery';
import ManageParticipants from './ManageParticipants';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    id: '',
    imageUrl: '',
    rulebookUrl: '',
    title: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('events');

  const formRef = useRef(null);
  const sidebarRef = useRef(null);
  const { apiUrl } = useConfig();

  useEffect(() => {
    axios.get(`${apiUrl}/api/v2/events`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };

  const handleAddEvent = () => {
    axios.post(`${apiUrl}/api/v2/admin/events`, currentEvent)
      .then(response => {
        setEvents([...events, response.data]);
        setShowForm(false);
        setCurrentEvent({ id: '', imageUrl: '', rulebookUrl: '', title: '', description: '' });
        toast.success('Event added successfully!');
        setSidebarOpen(false);
      })
      .catch(() => {
        toast.error('Failed to add event.');
      });
  };

  const handleUpdateEvent = (id) => {
    axios.put(`${apiUrl}/api/v2/admin/events/${id}`, currentEvent)
      .then(response => {
        setEvents(events.map(event => (event._id === id ? response.data : event)));
        setIsEditing(false);
        setShowForm(false);
        setCurrentEvent({ id: '', imageUrl: '', rulebookUrl: '', title: '', description: '' });
        toast.success('Event updated successfully!');
        setSidebarOpen(false);
      })
      .catch(() => {
        toast.error('Failed to update event.');
      });
  };

  const handleDeleteEvent = (id) => {
    axios.delete(`${apiUrl}/api/v2/admin/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event._id !== id));
        toast.success('Event deleted successfully!');
      })
      .catch(() => {
        toast.error('Failed to delete event.');
      });
  };

  const scrollFormIntoView = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderPageContent = () => {
    switch (activePage) {
      case 'gallery':
        return <ManageGallery />;
      case 'participants':
        return <ManageParticipants />;
      default:
        return (
          <>
            <h1 className="mb-4 text-2xl font-bold">Manage Events</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (!showForm) scrollFormIntoView();
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
                  name="rulebookUrl"
                  placeholder="Rulebook URL"
                  value={currentEvent.rulebookUrl}
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
                        scrollFormIntoView();
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
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div ref={sidebarRef} className={`fixed left-0 top-0 h-full bg-gray-800 text-white p-4 w-1/5 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <h2 className="mb-4 text-xl font-bold">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <button onClick={() => setActivePage('events')} className="block w-full py-2 text-left">Manage Events</button>
          </li>
          <li>
            <button onClick={() => setActivePage('gallery')} className="block w-full py-2 text-left">Manage Gallery</button>
          </li>
          <li>
            <button onClick={() => setActivePage('participants')} className="block w-full py-2 text-left">Manage Participants</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container p-4 mx-auto ml-1/5">
        <nav className="flex items-center justify-between p-4 bg-orange-600">
          <div className="text-lg font-bold text-white">Admin Panel</div>
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </nav>

        {renderPageContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
