import { createContext } from 'react';
import PropTypes from 'prop-types';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const config = {
    apiUrl: 'https://technest-backend-2wv3.onrender.com',
  };

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ConfigContext };
