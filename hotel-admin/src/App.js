import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import RoomList from './components/RoomList';
import BookingList from './components/BookingList';
import UserList from './components/UserList'; // Import UserList component
import BookingPage from './components/BookingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/users" element={<UserList />} /> {/* Add UserList route */}
          <Route path="/booking" element={<BookingPage />} /> {/* Add BookingPage route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;