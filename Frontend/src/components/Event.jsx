import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import EventCard from "./EventCard";
import Footer from "./Footer";

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v2/events')
      .then(response => {
        const eventsWithImages = response.data.map(event => ({
          ...event,
          id: event._id, 
          imageUrl: event.imageUrl
        }));
        setEvents(eventsWithImages);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full h-full">
        <div className="flex flex-col items-center justify-center p-5">
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          <div className="flex flex-wrap justify-center gap-10 mt-5">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Event;
