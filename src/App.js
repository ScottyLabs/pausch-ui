import "semantic-ui-css/semantic.min.css"
import Canvas from "./components/Canvas"
import React, { useEffect, useState } from "react"
import BrushPanel from "./components/BrushPanel"
import Preview from "./components/Preview"
import PreviewControl from "./components/PreviewControl"
import * as actions from "./actions"
import { useSelector, useDispatch } from "react-redux"
import PreviewProgressIndicator from "./components/PreviewProgressIndicator"

const appContainerStyle = {
  display: "grid",
  gridTemplateColumns: "95fr 5fr",
  padding: "3em",
}
const controlsContainerStyle = { marginLeft: "2em", width: "15vw" }

function App() {
  const dispatch = useDispatch()
  const [isMouseDown, setIsMouseDown] = useState(false)
  const width = useSelector((store) => store.width)

  const indicatorWidth = 100 / (width + 1)
  const contentWidth = (100 * width) / (width + 1)

  const contentContainerStyle = {
    display: "grid",
    width: "100%",
    columnGap: "10px",
    rowGap: "10px",
    gridTemplateColumns: `${indicatorWidth}fr ${contentWidth}fr`,
  }

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
        <Preview />
        <PreviewProgressIndicator />
        <Canvas isMouseDown={isMouseDown} />
      </div>
      <div id="controls" style={controlsContainerStyle}>
        <PreviewControl />
        <BrushPanel />
      </div>
    </div>
  )
}

export default App
