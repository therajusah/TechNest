import Navbar from "./Navbar";
import EventCard from "./EventCard";

const Event = () => {
  const event1 = {
    id: 1,
    title: "Frontend Freebird",
    description: "Description of Event 1",
    imageUrl:
      "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const event2 = {
    id: 2,
    title: "Frontend Freebird 2",
    description: "Description of Event 2",
    imageUrl:
      "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <>
      <Navbar />
      <div className="h-full w-full">
        <div className="flex items-center justify-center flex-col p-5">
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          <div className="flex flex-wrap justify-center gap-10 mt-5">
            <EventCard event={event1} />
            <EventCard event={event2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
