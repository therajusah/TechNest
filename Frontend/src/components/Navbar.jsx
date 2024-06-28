import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-14 w-full flex bg-black items-center justify-between px-4">
      <div>
        <img src="/path/to/your/logo.png" alt="logo" className="h-8" />
      </div>

    
      <div className="hidden md:flex justify-center items-center space-x-8">
        <ul className="flex space-x-16">
          <li><a href="#" className="text-white font-bold">Home</a></li>
          <li><a href="#" className="text-white font-bold">Event</a></li>
          <li><a href="#" className="text-white font-bold">Brochure</a></li>
          <li><a href="#" className="text-white font-bold">Gallery</a></li>
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
            <li><a href="#" className="font-bold">Home</a></li>
            <li><a href="#" className="font-bold">Event</a></li>
            <li><a href="#" className="font-bold">Brochure</a></li>
            <li><a href="#" className="font-bold">Gallery</a></li>
          </ul>
        </div>
      )}

      <div className="md:flex">
        <button className="bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
