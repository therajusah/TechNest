import { BiRightArrowAlt } from "react-icons/bi";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="w-full h-screen bg-white">
      <Navbar />
      <div className="container px-4 py-16 mx-auto text-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-black mt-9">
            Hey, Welcome to TechNest Technical Club
          </h1>
          <div className="flex items-center justify-center mt-10">
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center px-5 py-2 space-x-2 text-white bg-black rounded-full text-md md:text-2xl hover:bg-white hover:text-black hover:border hover:border-black"
              >
                <span>Upcoming Events</span>
                <BiRightArrowAlt
                  size={24}
                  className="ml-2 transition duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
