import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="py-8 overflow-auto text-black bg-white">
      <hr className="my-2" />
      <div className="container mx-auto">
        <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-2">
          <div className="pl-3 ml-4 text-center md:ml-16 md:text-left md:pl-0">
            <h4 className="pt-2 mt-3 text-2xl font-bold">Important Links</h4>
            <div className="flex items-center justify-center mt-3 ml-8 md:justify-start md:ml-0">
              <ul className="text-center md:text-left">
                <li className="mb-2">
                  <a
                    href="https://www.scesupaul.org"
                    className="block text-sm font-bold"
                    target="_blank"
                  >
                    Official Website
                  </a>
                </li>
                <li className="mb-2">
                  <Link to="/" className="block text-sm font-semibold">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/events" className="block text-sm font-semibold">
                    Events
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/gallery" className="block text-sm font-semibold">
                    Gallery
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/brochure" className="block text-sm font-semibold">
                    Brochure
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 mr-4 text-center md:mr-10 md:text-right">
            <h4 className="mr-2 text-xl font-bold md:mr-12">Follow Us</h4>
            <div className="flex justify-center md:justify-end">
              <a
                href="#"
                className="mr-2 text-black md:mr-4 hover:text-gray-700"
                target="_blank"
              >
                <AiFillLinkedin size={26} />
              </a>
              <a
                href="#"
                className="mr-2 text-black md:mr-4 hover:text-gray-700"
                target="_blank"
              >
                <AiFillInstagram size={26} />
              </a>
              <a
                href="#"
                className="mr-2 text-black md:mr-4 hover:text-gray-700"
                target="_blank"
              >
                <AiFillFacebook size={26} />
              </a>
              <a
                href="#"
                className="mr-2 text-black md:mr-4 hover:text-gray-700"
                target="_blank"
              >
                <AiFillYoutube size={26} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 ">
        <h3>
          Made with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/therajusah"
            target="_blank"
            className="font-semibold bg-gray-100 rounded-md none"
          >
            Raju Kumar
          </a>
        </h3>
      </div>
    </div>
  );
};

export default Footer;
