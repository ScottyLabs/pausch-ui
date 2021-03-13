import "semantic-ui-css/semantic.min.css"
import Canvas from "./components/Canvas"
import React, { useEffect, useState } from "react"
import BrushPanel from "./components/BrushPanel"
import Preview from "./components/Preview"
import PreviewControl from "./components/PreviewControl"
import * as actions from "./actions"
import { useSelector, useDispatch } from "react-redux"

const CANVAS_WIDTH = 52
const CANVAS_HEIGHT = 30
// const CANVAS_WIDTH = 2
// const CANVAS_HEIGHT = 2

function App() {
  const dispatch = useDispatch()

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
          dispatch(actions.brush.setIsMouseDown(true))
        }}
        onMouseUp={(event) => {
          dispatch(actions.brush.setIsMouseDown(false))
          dispatch(actions.preview.setPreviewValid(false))
        }}
      >
        <Preview width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></Preview>
        <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      </div>
      <div id="controls" style={{ marginLeft: "2em" }}>
        <PreviewControl />
        <BrushPanel />
      </div>
    </div>
  )
}

export default App
