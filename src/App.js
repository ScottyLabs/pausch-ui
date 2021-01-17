import "semantic-ui-css/semantic.min.css"
import Canvas from "./components/Canvas"
import React, { useEffect, useState } from "react"
import { Button, Grid } from "semantic-ui-react"
import BrushPanel from "./components/BrushPanel"

function App() {
  const [isMouseDown, setMouseDown] = useState(false)
  const [drawMode, setDrawMode] = useState("paintbrush")

  const gridStyle = {
    padding: "10px",
  }

  return (
    <div
      className="App"
      onMouseDown={(event) => {
        setMouseDown(true)
      }}
      onMouseUp={(event) => {
        setMouseDown(false)
      }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
      }}
    >
      <Canvas width={52} height={30} isMouseDown={isMouseDown} drawMode={drawMode} />
      <BrushPanel drawMode={drawMode} setDrawMode={setDrawMode}></BrushPanel>
    </div>
  )
}

export default App
