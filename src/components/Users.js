import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import axiosWithAuth from "../utils/axiosWithAuth";

function Users() {
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosWithAuth()
      .get("/jokes")
      .then(res => {
        setError("");
        setJokes(res.data);
      })
      .catch(() =>
        setError(
          "Users can not be loaded at the moment. Refresh the page in a second."
        )
      );
  }, []);

  return (
    <div className="users-wrapper">
      {error && <p className="error-message">{error}</p>}

      <div className="users">
        {jokes.map(joke => (
          <div className="user-card" key={joke.id}>
            <h2>
              Joke: <span>{joke.joke}</span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
export default withRouter(Users);
