import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import AllUsers from "./pages/AllUsers";
import AllConsents from "./pages/AllConsents";
import AllFeedbacks from "./pages/AllFeedbacks";
import AllFiduciaries from "./pages/AllFiduciaries";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/allconsents" element={<AllConsents />} />
          <Route path="/allfeedbacks" element={<AllFeedbacks />} />
          <Route path="/allfiduciaries" element={<AllFiduciaries />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;