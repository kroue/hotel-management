import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingList.css'; // Import the CSS file for styling

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.0.196:8000/api/bookings/')
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div className="booking-list-container">
      <h2 className="booking-list-title">Your Bookings</h2>
      <div className="booking-list">
        {bookings.map(booking => (
          <div key={booking.id} className="booking-card">
            <div className="booking-info">
              <h3 className="booking-room">{booking.room}</h3>
              <p className="booking-user">Booked by: {booking.user}</p>
              <p className="booking-dates">
                {booking.start_date} - {booking.end_date}
              </p>
              <p className={`booking-status ${booking.status.toLowerCase()}`}>
                Status: {booking.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingList;