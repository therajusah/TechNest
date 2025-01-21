import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import EventCard from "./EventCard";
import Footer from "./Footer";
import Loader from "./Loader"; 
import { useConfig } from '../contexts/useConfig';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, Calendar } from "react-feather";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { apiUrl } = useConfig();
  const [ref, inView] = useInView({
    triggerOnce: true
  });

  useEffect(() => {
    fetchEvents();
  }, [apiUrl]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v2/events`);
      const eventsWithImages = response.data.map((event) => ({
        ...event,
        id: event._id,
        imageUrl: event.imageUrl,
      }));
      setEvents(eventsWithImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[40vh] flex items-center justify-center bg-black text-white overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070"
                alt="Events background"
                className="object-cover w-full h-full opacity-50"
              />
            </div>
            <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 text-5xl font-bold md:text-6xl"
              >
                Upcoming Events
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-200"
              >
                Discover and participate in exciting tech events
              </motion.p>
            </div>
          </motion.section>


          <div className="relative z-10 px-4 mx-auto -mt-8 max-w-7xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white shadow-lg rounded-xl"
            >
              <div className="relative">
                <Search className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 transition-all border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </motion.div>
          </div>


          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="px-4 py-16 mx-auto max-w-7xl"
          >
            {filteredEvents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center"
              >
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-semibold text-gray-600">No events found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Event;