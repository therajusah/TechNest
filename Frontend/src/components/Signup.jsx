import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }


    setError('');

    // Have to add signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

  
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <form className="flex flex-col items-center justify-center w-1/2" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            className="border-2 border-gray-300 rounded-md p-2 mt-4 w-full"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="relative w-full mt-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              value={password}
              onChange={handlePasswordChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute top-3 right-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="relative w-full mt-4">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="absolute top-3 right-3 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4 w-full">
            Sign Up
          </button>
        </form>
        <Link to="/login" className="mt-4">
          <button className="bg-green-500 text-white rounded-md p-2 w-full">
            Click to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
