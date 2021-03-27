import Canvas from "./Canvas";
import React, { useState } from "react";
import BrushPanel from "./BrushPanel";
import Preview from "./Preview";
import PreviewControl from "./PreviewControl";
import * as actions from "../actions";
import { useSelector, useDispatch } from "react-redux";
import PreviewProgressIndicator from "./PreviewProgressIndicator";
import SubmitPanel from "./SubmitPanel";
import LoginPanel from "./LoginPanel";
import { checkAccessToken } from "../utils/authUtils";
import { useLocation, useHistory } from "react-router-dom";

const appContainerStyle = {
  display: "grid",
  gridTemplateColumns: "95fr 5fr",
  padding: "3em",
};

const controlsContainerStyle = {
  marginLeft: "2em",
  minWidth: "280px",
  width: "15vw",
};

const Editor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(checkAccessToken(location));
  const width = useSelector((store) => store.width);

  if (location.search) {
    history.push("/");
  }

  const indicatorWidth = 100 / (width + 1);
  const contentWidth = (100 * width) / (width + 1);

  const contentContainerStyle = {
    display: "grid",
    width: "100%",
    columnGap: "10px",
    rowGap: "10px",
    gridTemplateColumns: `${indicatorWidth}fr ${contentWidth}fr`,
  };

  return (
    <div className="App" style={appContainerStyle}>
      <div
        id="content"
        style={contentContainerStyle}
        onMouseDown={(event) => {
          setIsMouseDown(true);
        }}
        onMouseUp={(event) => {
          setIsMouseDown(false);
          dispatch(actions.preview.setPreviewValid(false));
        }}
        onTouchStart={(event) => {
          setIsMouseDown(true);
        }}
        onTouchEnd={(event) => {
          setIsMouseDown(false);
        }}
      >
        <div />
        <Preview />
        <PreviewProgressIndicator />
        <Canvas isMouseDown={isMouseDown} />
      </div>
      <div id="controls" style={controlsContainerStyle}>
        <LoginPanel
          state={{ loggedIn: loggedIn, loading: loading }}
          setState={{ setLoggedIn: setLoggedIn, setLoading: setLoading }}
        />
        <PreviewControl />
        <SubmitPanel />
        <BrushPanel />
      </div>
    </div>
  );
};

export default Editor;
