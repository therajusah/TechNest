import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import EventCard from "./EventCard";
import Footer from "./Footer";
import Loader from "./Loader"; 
import { useConfig } from '../contexts/useConfig';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useConfig();
  useEffect(() => {
    fetchEvents();
  },);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v2/events`
      );
      const eventsWithImages = response.data.map((event) => ({
        ...event,
        id: event._id,
        imageUrl: event.imageUrl,
      }));
      setEvents(eventsWithImages);
      setLoading(false); 
    } catch (error) {
      setLoading(false); 
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader /> 
      ) : (
        <div className="w-full h-full pt-20">
          <div className="flex flex-col items-center justify-center p-5">
            <h1 className="text-4xl font-bold">Upcoming Events</h1>
            <div className="flex flex-wrap justify-center gap-10 mt-5">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Event;
