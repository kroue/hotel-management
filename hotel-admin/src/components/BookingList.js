import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './BookingList.css'; // Import the CSS file for styling

function BookingList() {
  const [bookings, setBookings] = useState([]); // Ensure initial state is an array

  useEffect(() => {
    axios.get('http://localhost/hotel-management/api/bookings.php')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : []; // Ensure it's an array
        console.log('Processed Bookings:', data); // Log the processed data
        setBookings(data);
      })
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div className="layout">
      <Sidebar /> {/* Add the Sidebar */}
      <div className="content">
        <h2 className="booking-list-title">Your Bookings</h2>
        <div className="booking-list">
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-info">
                  <h3 className="booking-room">{booking.room_name}</h3>
                  <p className="booking-user"><strong>Guest:</strong> {booking.guest_name}</p>
                  <p className="booking-dates">
                    <strong>Check In:</strong> {booking.check_in} <br />
                    <strong>Check Out:</strong> {booking.check_out}
                  </p>
                  <p className="booking-price"><strong>Total Price:</strong> ₱ {booking.total_price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No bookings found.</p> // Fallback message
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingList;