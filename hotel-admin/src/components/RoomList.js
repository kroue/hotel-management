import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomList.css'; // Import the CSS file for styling

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.0.196:8000/api/rooms/')
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div className="room-list-container">
      <h2 className="room-list-title">Available Rooms</h2>
      <div className="room-list">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            <img src={room.image} alt={room.name} className="room-image" />
            <div className="room-info">
              <h3 className="room-name">{room.name}</h3>
              <p className="room-capacity">Capacity: {room.capacity} guests</p>
              <p className="room-price">${room.price_per_night} per night</p>
              <p className="room-description">{room.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;