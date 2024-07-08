import { BiRightArrowAlt } from "react-icons/bi";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen bg-white">
      <Navbar />
      <div className="container px-4 py-16 mx-auto text-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-black mt-9">
            Hey, Welcome to TechNest Technical CLub
          </h1>
          {/* <p className="text-lg text-white">
        🚀 Join us for an electrifying TechFest at Supaul College of Engineering! <br />🌟 Calling all tech enthusiasts! Prepare to ignite your passion for innovation and collaboration at our upcoming TechFest. 
        <br />
        📅 Save the Date: 
        <br />
        📍 Location: Supaul College of Engineering, Supaul 
        <br />
        Whether you&#39;re a seasoned coder or just diving into the world of technology, this event is your platform to shine. Let&#39;s hack, create, and shape the future together! Stay tuned for event specifics, registration details, and exciting updates. Don&#39;t miss this chance to explore cutting-edge tech, network with like-minded individuals, and make lasting memories.
      </p> */}
          <div className="flex items-center justify-center mt-10">
            <Link to="/events">
              <button className="flex items-center py-3 space-x-2 text-white bg-black rounded-full px-7 text-md md:text-3xl hover:bg-white hover:text-black hover:border hover:border-black">
                <span>Upcoming Events</span>
                <BiRightArrowAlt size={24} className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
