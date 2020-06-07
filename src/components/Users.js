import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import axiosWithAuth from "../utils/axiosWithAuth";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const firstName = localStorage.getItem("loggedUser");

  useEffect(() => {
    axiosWithAuth()
      .get("/users")
      .then(res => {
        setError("");
        setUsers(res.data.users);
      })
      .catch(() =>
        setError(
          "Users can not be loaded at the moment. Refresh the page in a second."
        )
      );
  }, []);

  return (
    <div className="users-wrapper">
      <h1>
        Welcome home <span id="logged-user">{firstName}</span>
      </h1>

      {error && <p className="error-message">{error}</p>}

      <div className="users">
        {users.map(user => (
          <div className="user-card" key={user.id}>
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
    </div>
  );
}
export default withRouter(Users);
