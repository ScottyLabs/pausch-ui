import "semantic-ui-css/semantic.min.css"
import Canvas from "./components/Canvas"
import React, { useEffect, useState } from "react"
import { Button } from "semantic-ui-react"

function App() {
  const [isMouseDown, setMouseDown] = useState(false)

  return (
    <div
      className="App"
      onMouseDown={(event) => {
        console.log("Mouse down");
        setMouseDown(true)
      }}
      onMouseUp={(event) => {
        console.log("Mouse up");
        setMouseDown(false);
      }}
    >
      <Canvas width={52} height={30} isMouseDown={isMouseDown}/>
    </div>
  )
}

export default App
