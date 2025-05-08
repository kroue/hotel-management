import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css';

function BookingPage() {
  const { state } = useLocation();
  const room = state?.room; // Retrieve room details passed from RoomList
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('username'); // Retrieve logged-in user's name

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adult: 1,
    child: 0,
    lastName: '',
    firstName: '',
    contactNumber: '',
    emailAddress: '',
    estimatedArrivalTime: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookNow = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        room_id: room.id,
        room_name: room.name,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        adult_count: formData.adult,
        child_count: formData.child,
        last_name: formData.lastName,
        first_name: formData.firstName,
        contact_number: formData.contactNumber,
        email_address: formData.emailAddress,
        estimated_arrival_time: formData.estimatedArrivalTime,
        total_price: room.price,
        guest_name: loggedInUser,
      };
  
      console.log('Booking data:', bookingData); // Debugging statement
  
      const response = await axios.post('http://localhost/hotel-management/api/bookings.php', bookingData);
  
      if (response.data.success) {
        alert('Booking successful!');
        navigate('/rooms');
      } else {
        alert(response.data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error booking room:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <img src={room.picture_link} alt={room.name} className="booking-image" />
        <h1 className="booking-title">{room.name}</h1>
      </div>
      <div className="booking-content">
        <div className="booking-details">
          <h2>Booking Details</h2>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>Check In</label>
                <input type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Check Out</label>
                <input type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Adult</label>
                <input type="number" name="adult" value={formData.adult} onChange={handleInputChange} min="1" required />
              </div>
              <div className="form-group">
                <label>Child</label>
                <input type="number" name="child" value={formData.child} onChange={handleInputChange} min="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Estimated Arrival Time</label>
                <input type="time" name="estimatedArrivalTime" value={formData.estimatedArrivalTime} onChange={handleInputChange} required />
              </div>
            </div>
          </form>
        </div>
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <p><strong>Room:</strong> {room.name}</p>
          <p><strong>Guest Name:</strong> {loggedInUser}</p>
          <p><strong>Price:</strong> ₱ {room.price}</p>
          <button onClick={handleBookNow} className="book-now-button">Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;