import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
const Footer = () => {
  return (
    <footer className="py-12 text-white bg-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold ">TechNest</h3>
            <p className="text-gray-400">
              Empowering innovation through collaboration and technology.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/events" className="text-gray-400 transition-colors hover:text-white">Events</a></li>
              <li><a href="/gallery" className="text-gray-400 transition-colors hover:text-white">Gallery</a></li>
              <li><a href="/login" className="text-gray-400 transition-colors hover:text-white">Login</a></li>
              <li><a href="/signup" className="text-gray-400 transition-colors hover:text-white">Sign Up</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: info@technest.com</li>
              <li className="text-gray-400">Phone: (123) 456-7890</li>
              <li className="text-gray-400">Address: Tech Valley, Innovation Street</li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/therajusah/TechNest" className="text-gray-400 transition-colors hover:text-white">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="https://x.com/therajusah" className="text-gray-400 transition-colors hover:text-white">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/therajusah" className="text-gray-400 transition-colors hover:text-white">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href="devraju0808@gmail.com" className="text-gray-400 transition-colors hover:text-white">
                <MdEmail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-12 text-center text-gray-400 border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} TechNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;