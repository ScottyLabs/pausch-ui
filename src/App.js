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
  const [playMode, setPlayMode] = useState("play")
  const [playRate, setPlayRate] = useState(0.5) // duration per frame in seconds
  const [row, setRow] = useState(0)
  const [color, setColor] = useState({ r: 255, g: 0, b: 0, a: 100 })

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
          setPlayMode={setPlayMode}
          playRate={playRate}
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
                border: "none",
                height: "3px",
              }}
            />
          </div>
          <Canvas
            width={width}
            height={height}
            isMouseDown={isMouseDown}
            drawMode={drawMode}
            color={color}
          />
        </div>
      </div>
      <div id="controls" style={{ marginLeft: "2em" }}>
        <PreviewControl
          playMode={playMode}
          setPlayMode={setPlayMode}
          playRate={playRate}
          setPlayRate={setPlayRate}
          setRow={setRow}
        />
        <BrushPanel
          drawMode={drawMode}
          setDrawMode={setDrawMode}
          color={color}
          setColor={setColor}
        ></BrushPanel>
      </div>
    </div>
  )
}

export default App
