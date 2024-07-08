import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items 
  const navItems = [
    { id: 1, text: "Home", url: "/" },
    { id: 2, text: "Events", url: "/events" },
    { id: 3, text: "Gallery", url: "/gallery" },
    { id: 4, text: "Brochure", url: "/brochure" },
    // { id: 5, text: 'About', url:' /about'},
  ];

  return (
    <div className="flex items-center justify-between h-20 max-w-full px-4 mx-auto text-black bg-white">
      {/* Logo */}
      <Link to="/">
        <h1 className="w-full text-3xl font-bold text-black hover:text-gray-800">TechNest</h1>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 m-2 font-semibold duration-300 rounded-full cursor-pointer hover:bg-gray-300 hover:text-black"
          >
            <Link to={item.url}>{item.text}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500 transform translate-x-0"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <Link to="/">
          <h1 className="w-full m-4 text-3xl font-bold text-black hover:text-gray-800">TechNest</h1>
        </Link>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 duration-300 border-b border-gray-300 cursor-pointer rounded-xl hover:bg-gray-300 hover:text-black"
          >
            <Link to={item.url} className="text-black hover:text-gray-800">{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
