import React, { useState } from "react";
import { Route, Link, NavLink, useHistory } from "react-router-dom";
import axiosWithAuth from "./utils/axiosWithAuth";

import Form from "./components/Form";
import Users from "./components/Users";
import ProtectedUsers from "./PrivateRoutes/ProtectedUsers";
import ProtectedLogin from "./PrivateRoutes/ProtectedLogin";
import ProtectedSignup from "./PrivateRoutes/ProtectedSignup";

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
        const token = res.data.token;

        localStorage.setItem("token", token);
        setAuthenticated(true);
        history.push("/users");
      } catch (error) {
        setError("Invalid credentials, try again?");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSignup = userInfo => {
    axiosWithAuth()
      .post("/auth/register", userInfo)
      .then(res => {
        const token = res.data.token;

        localStorage.setItem("token", token);
        history.push("/login");
      })
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    history.push("/");
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

        {!authenticated ? (
          <section className="login-signup">
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </section>
        ) : (
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>

      <ProtectedLogin
        path="/login"
        authenticated={authenticated}
        type="Login"
        isLoading={isLoading}
        error={error}
        onSubmit={handleLogin}
        component={Form}
      />

      <ProtectedSignup
        path="/signup"
        authenticated={authenticated}
        type="Signup"
        isLoading={isLoading}
        error={error}
        onSubmit={handleSignup}
        component={Form}
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
