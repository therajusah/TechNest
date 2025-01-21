import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar, MapPin, Users, X, ChevronLeft, Download } from 'lucide-react';
import { useConfig } from '../contexts/useConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeadName: '',
    email: '',
    member1: '',
    member2: '',
    member3: '',
    member4: '',
  });
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const { apiUrl } = useConfig();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v2/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching event details');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [apiUrl, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { teamName, teamLeadName, email } = formData;
    
    if (!teamName || !teamLeadName || !email) {
      toast.error('Team Name, Team Lead Name, and Email are required.');
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/v2/events/${id}/register`, formData);
      toast.success('Registration successful!');
      setShowRegistrationForm(false);
      setFormData({
        teamName: '',
        teamLeadName: '',
        email: '',
        member1: '',
        member2: '',
        member3: '',
        member4: '',
      });
    } catch (error) {
      toast.error('Failed to register. Please try again.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[50vh] overflow-hidden"
        >
          <img
            src={event?.imageUrl}
            alt={event?.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute flex items-center space-x-2 text-white top-4 left-4 hover:text-gray-200"
            onClick={() => navigate('/events')}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Events</span>
          </motion.button>
        </motion.div>

        <div className="px-4 py-12 mx-auto max-w-7xl">
          <div className="relative z-10 p-8 -mt-32 bg-white shadow-lg rounded-xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="mb-6 text-4xl font-bold">{event?.title}</h1>
              
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{event?.date || 'Date TBA'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{event?.location || 'Location TBA'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Max {event?.maxParticipants || 'unlimited'} participants</span>
                </div>
              </div>

              <div className="mb-8 prose max-w-none">
                <p className="text-lg text-gray-600">{event?.description}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 font-medium text-white bg-black rounded-full"
                  onClick={() => setShowRegistrationForm(true)}
                >
                  Register Now
                </motion.button>
                {event?.rulebookUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={event.rulebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-8 py-3 space-x-2 font-medium text-black bg-white border-2 border-black rounded-full"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Rulebook</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>


      <AnimatePresence>
        {showRegistrationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Register for {event?.title}</h2>
                <button
                  onClick={() => setShowRegistrationForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Team Lead Name *
                  </label>
                  <input
                    type="text"
                    name="teamLeadName"
                    value={formData.teamLeadName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>

                {[1, 2, 3, 4].map((index) => (
                  <div key={index}>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Team Member {index} Name
                    </label>
                    <input
                      type="text"
                      name={`member${index}`}
                      value={formData[`member${index}`]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                ))}

                <div className="flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowRegistrationForm(false)}
                    className="px-6 py-2 font-medium text-black transition-colors border-2 border-black rounded-lg hover:bg-black hover:text-white"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-2 font-medium text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
                  >
                    Register
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default EventDetails;