import React, { useState } from "react";
import { Route, Link, NavLink, useHistory } from "react-router-dom";
import axiosWithAuth from "./utils/axiosWithAuth";

import Form from "./components/Form";
import Users from "./components/Users";
import ProtectedUsers from "./PrivateRoutes/ProtectedUsers";
import ProtectedLogin from "./PrivateRoutes/ProtectedLogin";
import ProtectedSignup from "./PrivateRoutes/ProtectedSignup";
import getFromLocalStorage from "./utils/getFromLocalStorage";

function App() {
  const [authenticated, setAuthenticated] = useState(
    getFromLocalStorage("authenticated")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const handleLogin = userInfo => {
    setIsLoading(true);
    setError("");

    setTimeout(async () => {
      try {
        const res = await axiosWithAuth().post("/auth/login", userInfo);
        const { user } = res.data;

        localStorage.setItem("authenticated", JSON.stringify(true));
        localStorage.setItem("loggedUser", user.firstName);

        setAuthenticated(true);
        history.push("/users");
      } catch (error) {
        setError("Invalid credentials. Try again?");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSignup = userInfo => {
    setIsLoading(true);
    setError("");

    setTimeout(async () => {
      try {
        const res = await axiosWithAuth().post("/auth/register", userInfo);
        const { addedUser } = res.data;

        localStorage.setItem("authenticated", JSON.stringify(true));
        localStorage.setItem("loggedUser", addedUser.firstName);

        setAuthenticated(true);
        history.push("/login");
      } catch (err) {
        setError("Registration failed. Try again?");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setAuthenticated(false);

      localStorage.removeItem("authenticated");
      localStorage.removeItem("loggedUser");

      history.push("/");
    }, 1500);
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
          <section>
            {!isLoading && <NavLink to="/users">Users</NavLink>}

            <NavLink exact to="/" onClick={handleLogout}>
              {isLoading ? "...Logging Out" : "Logout"}
            </NavLink>
          </section>
        )}
      </div>

      <ProtectedLogin
        path="/login"
        authenticated={authenticated}
        action="Login"
        isLoading={isLoading}
        error={error}
        onSubmit={handleLogin}
        component={Form}
      />

      <ProtectedSignup
        path="/signup"
        authenticated={authenticated}
        action="Signup"
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
