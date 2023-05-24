import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Trips from './pages/Trips/Trips';
import Login from './pages/LogIn/LogIn';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
