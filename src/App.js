import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Trips from "./pages/Trips/Trips";
import Login from "./pages/LogIn/LogIn";
import CreateTrip from "./pages/CreateTrip/CreateTrips";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
