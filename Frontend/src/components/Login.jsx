import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useConfig } from '../contexts/useConfig';
import Footer from "./Footer";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { apiUrl } = useConfig();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        toast.error(text);
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success("Sign in successful!");
      navigate("/admin");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-gray-50 lg:px-8">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
            Hello Admin, Sign in to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="block w-full py-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full py-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-semibold text-white bg-black rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Not an Admin?{" "}
            <Link
              to="/signup"
              className="font-semibold text-gray-700 hover:text-black"
            >
              Signup here
            </Link>
          </p>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Signin;
