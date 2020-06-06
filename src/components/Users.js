import React, { useState, useEffect } from "react";

import axiosWithAuth from "../utils/axiosWithAuth";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosWithAuth
      .get("/users")
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="users">
      <h1>Welcome to Users!</h1>
      {users.map(user => (
        <div className="user-card">
          <h2>
            First Name: <span>{user.firstName}</span>
          </h2>
          <h2>
            Last Name: <span>{user.lastName}</span>
          </h2>
          <h2>
            Username: <span>{user.username}</span>
          </h2>
        </div>
      ))}
    </div>
  );
}
