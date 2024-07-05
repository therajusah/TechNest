import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full px-4 bg-black h-14">
      <div>
        <Link to="/" className="text-white">
          <h2 className="text-xl font-bold">TechNest</h2>
        </Link>
      </div>

      <div className="items-center justify-center hidden space-x-8 md:flex">
  <ul className="flex px-16 space-x-16 text-1xl md:px-14">
    <li><Link to="/" className="font-bold text-white hover:text-gray-300">Home</Link></li>
    <li><Link to="/events" className="font-bold text-white hover:text-gray-300">Event</Link></li>
    <li><Link to="/brochure" className="font-bold text-white hover:text-gray-300">Brochure</Link></li>
    <li><Link to="/gallery" className="font-bold text-white hover:text-gray-300">Gallery</Link></li>
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
        <div className="absolute left-0 w-full text-white bg-black md:hidden top-14">
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li><Link to="/" className="font-bold">Home</Link></li>
            <li><Link to="/events" className="font-bold">Event</Link></li>
            <li><Link to="/brochure" className="font-bold">Brochure</Link></li>
            <li><Link to="/gallery" className="font-bold">Gallery</Link></li>
          </ul>
        </div>
      )}

      {/* <div className="md:flex">
        <Link to='/signup' className="px-3 py-2 font-semibold text-white border border-gray-500 rounded-lg hover:bg-blue-600">
          Sign up
        </Link>
      </div> */}
    </nav>
  );
};

export default Navbar;
