import React, { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  department: "",
  username: "",
  password: "",
};

export default function Form({ action, isLoading, error, onSubmit }) {
  const [formInfo, setFormInfo] = useState(initialState);
  const { username, password } = formInfo;

  const handleChange = e => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(action === "Login" ? { username, password } : formInfo);
    setFormInfo(initialState);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <h2>{action}</h2>

        {action === "Signup" && (
          <div className="fullName">
            <input
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formInfo.firstName}
              required
            />

            <input
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formInfo.lastName}
              required
            />
          </div>
        )}

        {action === "Signup" && (
          <>
            <label htmlFor="department">Enter department name:</label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Department"
              name="department"
              value={formInfo.department}
              required
            />
          </>
        )}

        <label htmlFor="username">Enter Username:</label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Username"
          name="username"
          value={formInfo.username}
          required
        />

        <label htmlFor="password">Enter Password:</label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Password"
          name="password"
          value={formInfo.password}
          required
        />

        <button disabled={isLoading}>
          {isLoading ? "Loading..." : action}
        </button>
      </form>
    </div>
  );
}
