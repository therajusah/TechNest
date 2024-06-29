import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-14 w-full flex bg-black items-center justify-between px-4">
      <div>
        <Link to="/" className="text-white">
          <h2 className="text-xl font-bold">TechNest</h2>
        </Link>
      </div>

      <div className="hidden md:flex justify-center items-center space-x-8">
        <ul className="flex space-x-16">
          <li><Link to="/" className="text-white font-bold">Home</Link></li>
          <li><Link to="/events" className="text-white font-bold">Event</Link></li>
          <li><Link to="/brochure" className="text-white font-bold">Brochure</Link></li>
          <li><Link to="/gallery" className="text-white font-bold">Gallery</Link></li>
        </ul>
      </div>

      <div className="md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-black text-white">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link to="/" className="font-bold">Home</Link></li>
            <li><Link to="/events" className="font-bold">Event</Link></li>
            <li><Link to="/brochure" className="font-bold">Brochure</Link></li>
            <li><Link to="/gallery" className="font-bold">Gallery</Link></li>
          </ul>
        </div>
      )}

      <div className="md:flex">
        <Link to='/signup' className="border-gray-500 rounded-lg hover:bg-blue-600 border text-white font-semibold py-2 px-3">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
