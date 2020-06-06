import React, { useState } from "react";
import { Route, Link, NavLink, useHistory } from "react-router-dom";
import axiosWithAuth from "./utils/axiosWithAuth";

import Form from "./components/Form";
import Users from "./components/Users";
import ProtectedUsers from "./PrivateRoutes/ProtectedUsers";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const handleLogin = userInfo => {
    setIsLoading(true);
    setError("");

    setTimeout(async () => {
      try {
        const res = await axiosWithAuth().post("/auth/login", userInfo);

        console.log(res);

        setAuthenticated(true);
        // history.push("/users");
      } catch (error) {
        setError("Can't Login, try again?");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSignup = userInfo => {
    axiosWithAuth()
      .post("/auth/register", userInfo)
      .then(r => console.log(r))
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <Route exact path="/" render={() => <h1>Welcome home</h1>} />

      <div className="nav-bar">
        <section className="left-arrow">
          <Link to="/">
            <span role="img" aria-label="arrow">
              ⬅️
            </span>
          </Link>
        </section>

        <section className="login-signup">
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </section>
      </div>

      <Route
        exact
        path="/login"
        render={() => (
          <Form
            type="Login"
            isLoading={isLoading}
            error={error}
            onSubmit={handleLogin}
          />
        )}
      />
      <Route
        exact
        path="/signup"
        render={() => <Form type="Signup" onSubmit={handleSignup} />}
      />

      <ProtectedUsers
        path="/users"
        authenticated={authenticated}
        component={Users}
      />
    </div>
  );
}

export default App;
