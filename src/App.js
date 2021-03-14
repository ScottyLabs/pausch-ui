import "semantic-ui-css/semantic.min.css"
import Canvas from "./components/Canvas"
import React, { useEffect, useState } from "react"
import BrushPanel from "./components/BrushPanel"
import Preview from "./components/Preview"
import PreviewControl from "./components/PreviewControl"
import * as actions from "./actions"
import { useSelector, useDispatch } from "react-redux"
import PreviewProgressIndicator from "./components/PreviewProgressIndicator"

const CANVAS_WIDTH = 52
const CANVAS_HEIGHT = 30

const indicatorWidth = 100 / (CANVAS_WIDTH + 1)
const contentWidth = (100 * CANVAS_WIDTH) / (CANVAS_WIDTH + 1)

const appContainerStyle = {
  display: "grid",
  gridTemplateColumns: "95fr 5fr",
  padding: "3em",
}

const contentContainerStyle = {
  display: "grid",
  width: "100%",
  columnGap: "10px",
  gridTemplateColumns: `${indicatorWidth}fr ${contentWidth}fr`,
}

const controlsContainerStyle = { marginLeft: "2em", width: "15vw" }

function App() {
  const dispatch = useDispatch()
  const [isMouseDown, setIsMouseDown] = useState(false)

  return (
    <div className="App" style={appContainerStyle}>
      <div
        id="content"
        style={contentContainerStyle}
        onMouseDown={(event) => {
          setIsMouseDown(true)
        }}
        onMouseUp={(event) => {
          setIsMouseDown(false)
          dispatch(actions.preview.setPreviewValid(false))
        }}
        onTouchStart={(event) => {
          setIsMouseDown(true)
        }}
        onTouchEnd={(event) => {
          setIsMouseDown(false)
        }}
      >
        <div />
        <Preview width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        <PreviewProgressIndicator height={CANVAS_HEIGHT} />
        <Canvas
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          isMouseDown={isMouseDown}
        />
      </div>
      <div id="controls" style={controlsContainerStyle}>
        <PreviewControl />
        <BrushPanel />
      </div>
    </div>
  )
}

export default App
