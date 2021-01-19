import "semantic-ui-css/semantic.min.css"
import Canvas from "./components/Canvas"
import React, { useEffect, useState } from "react"
import { Button, Grid } from "semantic-ui-react"
import BrushPanel from "./components/BrushPanel"
import Preview from "./components/Preview"
import PreviewControl from "./components/PreviewControl"

function App() {
  const [isMouseDown, setMouseDown] = useState(false)
  const [drawMode, setDrawMode] = useState("paintbrush")
  const [playMode, setPlayMode] = useState(false)
  const [playRate, setPlayRate] = useState(0.5) // duration per frame in seconds
  const [playState, setPlayState] = useState(0) // to prevent reset race condition
  const [row, setRow] = useState(0)

  const width = 52
  const height = 30

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        padding: "3em",
      }}
    >
      <div
        id="content"
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 30,
          alignItems: "flex-start",
        }}
        onMouseDown={(event) => {
          setMouseDown(true)
        }}
        onMouseUp={(event) => {
          setMouseDown(false)
        }}
      >
        <Preview
          width={52}
          height={30}
          playMode={playMode}
          playRate={playRate}
          playState={playState}
          row={row}
          setRow={setRow}
        ></Preview>
        <div
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <div
            id="progressBarContainer"
            style={{
              position: "absolute",
              width: "103%",
              marginLeft: "-1em",
            }}
          >
            <hr
              style={{
                marginTop: 0,
              }}
            />
          </div>
          <Canvas
            width={width}
            height={height}
            isMouseDown={isMouseDown}
            drawMode={drawMode}
          />
        </div>
      </div>
      <div id="controls" style={{ marginLeft: "2em" }}>
        <PreviewControl
          playMode={playMode}
          setPlayMode={setPlayMode}
          playRate={playRate}
          setPlayRate={setPlayRate}
          playState={playState}
          setPlayState={setPlayState}
          setRow={setRow}
        />
        <BrushPanel drawMode={drawMode} setDrawMode={setDrawMode}></BrushPanel>
      </div>
    </div>
  )
}

export default App
