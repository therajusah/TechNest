import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/"; 

  useEffect(() => {
    if (!isHome) return; 

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isHome
          ? scrolled
            ? "bg-white shadow-lg"
            : "bg-transparent"
          : "bg-white shadow-lg"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2">
            <Terminal className={`w-8 h-8 transition-colors duration-300 ${isHome && !scrolled ? "text-white" : "text-black"}`} />
            <span className={`text-xl font-bold transition-colors duration-300 ${isHome && !scrolled ? "text-white" : "text-black"}`}>
              TechNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wide transition-colors duration-300 ${
                  isHome
                    ? scrolled
                      ? "text-black hover:text-gray-600"
                      : "text-white hover:text-gray-300"
                    : "text-black hover:text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-300 bg-black rounded-full hover:bg-gray-800"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`${isHome && !scrolled ? "text-white" : "text-black"} hover:text-gray-400`}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-3 py-2 text-base font-bold tracking-wide text-gray-600 uppercase rounded-md hover:text-black hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/signup"
                className="block px-3 py-2 text-base font-bold tracking-wide text-white uppercase bg-black rounded-md hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
