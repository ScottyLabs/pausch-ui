import React from "react";
import { Button } from "semantic-ui-react";

const LoginButton = (props) => {
  const logout = () => {
    window.localStorage.removeItem("accessToken");
    props.setState.setLoading(true);
    props.setState.setLoggedIn(false);
  };

  return (
    <div>
      {props.state.loggedIn ? (
        <Button onClick={logout} color="grey">Sign out</Button>
      ) : (
        <Button
          as="a"
          color="green"
          href={
            process.env.REACT_APP_LOGIN_API +
            encodeURIComponent(window.location.href)
          }
        >Sign in with Andrew ID</Button>
      )}
    </div>
  );
};

export default LoginButton;
