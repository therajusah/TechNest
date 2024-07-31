import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SmoothScrollWrapper from "./components/utils/SmoothScrollWrapper";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Event from "./components/Event";
import EventDetails from "./components/EventDetails";
import AdminPanel from "./components/Admin/Admin";
import Gallery from "./components/Gallery";
import PrivateRoute from "./components/Admin/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfigProvider } from "./contexts/ConfigContext";

const App = () => {
  return (
    <ConfigProvider>
      <Router>
        <SmoothScrollWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/events" element={<Event />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route
              path="/admin"
              element={<PrivateRoute element={<AdminPanel />} />}
            />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
          <ToastContainer />
        </SmoothScrollWrapper>
      </Router>
    </ConfigProvider>
  );
};

export default App;
