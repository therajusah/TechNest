import { useState } from 'react';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-3xl font-bold">Login</h1>
        <form className="flex flex-col items-center justify-center w-1/2" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-2 mt-4 border-2 border-gray-300 rounded-md"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              className="w-full p-2 mt-4 border-2 border-gray-300 rounded-md"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-6"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <button type="submit" className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
