import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Navigation</h3>
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/rooms')}>Room List</li>
        <li onClick={() => navigate('/bookings')}>Booking List</li>
        <li onClick={() => navigate('/users')}>User List</li>
      </ul>
    </div>
  );
}

export default Sidebar;