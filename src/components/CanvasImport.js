import { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Input, Popup } from "semantic-ui-react"
import { importFromPNG } from "./canvas-actions/importCanvas"

const CanvasImport = (props) => {
  const width = useSelector((store) => store.width)
  const height = useSelector((store) => store.height)

  const importFile = (file) => {
    if (file != null) {
      importFromPNG(file, width, height)
    }
  }

  return (
    <Popup
      content="Import an existing design"
      mouseEnterDelay={250}
      on="hover"
      trigger={
        <Input
          style={{ width: "100%" }}
          type="file"
          name="canvas"
          onChange={(event) => {
            importFile(event.target.files[0])
            event.target.value = null;
          }}
        />
      }
    />
  )
}

export default CanvasImport
