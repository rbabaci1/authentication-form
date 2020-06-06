import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedUsers({
  authenticated,
  component: Component,
  ...rest
}) {
  console.log(authenticated);
  return (
    <Route
      {...rest}
      render={() =>
        !authenticated ? <Component {...rest} /> : <Redirect to="/users" />
      }
    />
  );
}
