import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RoomList.css';
import Sidebar from './Sidebar'; // Import the Sidebar component

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const username = localStorage.getItem('username'); // Retrieve username from local storage
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost/hotel-management/api/rooms.php')
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  const handleBookNow = (room) => {
    navigate('/booking', { state: { room } }); // Pass room details to the booking page
  };

  return (
    <div className="layout">
      <Sidebar /> {/* Add the Sidebar */}
      <div className="content">
        <h2 className="room-list-title">Welcome, {username}</h2>
        <div className="room-list">
          {rooms.map(room => (
            <div key={room.id} className="room-card">
              <img
                src={room.picture_link}
                alt={room.name}
                className="room-image"
              />
              <div className="room-info">
                <h3 className="room-name">{room.name}</h3>
                <p className="room-description">{room.description}</p>
                <p className="room-price">₱ {room.price}</p>
                <button
                  className="room-book-button"
                  onClick={() => handleBookNow(room)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomList;