import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Event from "./components/Event";
import EventDetails from "./components/EventDetails";
import AdminPanel from "./components/Admin/Admin"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Event />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/admin" element={<AdminPanel />} /> 
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
