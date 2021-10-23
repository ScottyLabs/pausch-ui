import React from "react";
import LoginButton from "./LoginButton";
import { Segment } from "semantic-ui-react";
import { whoAmI } from "../utils/authUtils";
import { useLocation } from "react-router-dom";

const LoginPanel = ({ state, setState }) => {
  const location = useLocation();
  const user = whoAmI(location);

  return (
    <Segment>
      <LoginButton state={state} setState={setState} />
      {user ? (
        <p
          style={{ color: "white", marginTop: "1em" }}
        >{`${user.name} <${user.email}>`}</p>
      ) : null}
      <br />
    </Segment>
  );
};

export default LoginPanel;
