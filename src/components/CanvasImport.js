import { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Icon, Input, Popup } from "semantic-ui-react"
import { importFromPNG, importFromRemote } from "./canvas-actions/importCanvas"

const upperRowStyle = { 
  minWidth: "100%",
  display: "grid",
  gridTemplateColumns: "80fr 20fr"
 }
const lowerRowStyle = { 
  minWidth: "100%", 
  marginTop: "1em",
 }

const CanvasImport = (props) => {
  const width = useSelector((store) => store.width)
  const height = useSelector((store) => store.height)
  const [inputURL, setInputURL] = useState("")

  const importFile = (file) => {
    if (file != null) {
      console.log("Imported", file)
      importFromPNG(file, width, height)
    }
  }

  const importRemote = () => {
    importFromRemote(inputURL, width, height);
  }

  return (
    <>
    <div style={upperRowStyle}>
        <Popup
          content="Import an existing design from a remote image file (PNG/JPEG)"
          mouseEnterDelay={250}
          on="hover"
          trigger={
            <Input
              value={inputURL}
              onChange={(e) => setInputURL(e.target.value)}
              placeholder="https://i.imgur.com/D1YZkML.png"
            />
          }
        />
        <Button icon style={{zIndex: 1}} onClick={importRemote}>
          <Icon name="download" />
        </Button>
      </div>
      <div style={lowerRowStyle}>
        <Popup
          content="Import an existing design from an image file (PNG/JPEG)"
          mouseEnterDelay={250}
          on="hover"
          trigger={
            <Input
              style={{ width: "100%" }}
              type="file"
              name="canvas"
              onChange={(event) => {
                importFile(event.target.files[0])
                event.target.value = null
              }}
            />
          }
        />
      </div>
    </>
  )
}

export default CanvasImport
