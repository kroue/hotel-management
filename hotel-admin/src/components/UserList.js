import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './UserList.css'; // Import the CSS file for styling

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/hotel-management/api/users.php')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="layout">
      <Sidebar /> {/* Add the Sidebar */}
      <div className="content">
        <h2>User List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;