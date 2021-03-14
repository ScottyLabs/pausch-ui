import { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Input, Popup } from "semantic-ui-react"
import { importFromPNG } from "./canvas-actions/importCanvas"

const canvasImportStyle = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "80fr",
  rowGap: "10px",
}

const inputStyle = {
  width: "100%",
}

const CanvasImport = (props) => {
  const width = useSelector((store) => store.width)
  const height = useSelector((store) => store.height)

  const [file, setFile] = useState(null)
  const fileUploaded = () => {
    if (file != null) {
      importFromPNG(file, width, height)
    }
  }

  return (
    <div style={canvasImportStyle}>
      <Input
        style={inputStyle}
        type="file"
        name="canvas"
        onChange={(event) => setFile(event.target.files[0])}
      />
      <Popup
        content="Import an existing design"
        mouseEnterDelay={250}
        on="hover"
        trigger={<Button onClick={fileUploaded}>Import</Button>}
      />
    </div>
  )
}

export default CanvasImport
