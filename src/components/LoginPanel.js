import React from "react";
import LoginButton from "./LoginButton";
import { Button, Segment } from "semantic-ui-react";
import { whoAmI } from "../utils/authUtils";
import { useLocation } from "react-router-dom";

const LoginPanel = ({ state, setState }) => {
  const location = useLocation();
  const user = whoAmI(location);

  const startCollaboration = function(e) {
    window.TogetherJS(this);
  }

  return (
    <Segment>
      <LoginButton state={state} setState={setState} />
      {user ? (
        <p
          style={{ color: "white", marginTop: "1em" }}
        >{`${user.name} <${user.email}>`}</p>
      ) : null}
      <br />
      <Button onClick={startCollaboration}>Collaborate!</Button>
    </Segment>
  );
};

export default LoginPanel;
