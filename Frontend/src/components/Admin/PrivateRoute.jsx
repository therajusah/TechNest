import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [token, navigate]);

  return token ? element : null;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
export default PrivateRoute;
