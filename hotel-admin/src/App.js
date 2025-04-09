// src/App.js
import React from 'react';
import './App.css';
import RoomList from './components/RoomList';
import BookingList from './components/BookingList';

function App() {
  return (
    <div className="App">
      <h1>Hotel Management</h1>
      <RoomList />
      <BookingList />
    </div>
  );
}

export default App;
