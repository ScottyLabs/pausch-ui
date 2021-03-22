import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Confirm, Grid, Icon, Popup, Segment } from "semantic-ui-react"
import * as actions from "../actions"
import { exportToPNG } from "./canvas-actions/exportCanvas"
import { clearCanvas } from "./canvas-actions/utility"
import CanvasImport from "./CanvasImport"
import ColorPicker from "./ColorPicker"
import { copyCells, pasteCells } from "./canvas-actions/copyAndPaste"

const ColorPicker = (props) => {
  const dispatch = useDispatch()
  const color = useSelector((store) => store.color, shallowEqual)
  const [showColorSelect, setShowColorSelect] = useState(false)
  const [tmpColor, setTmpColor] = useState(color);

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  })

  return (
    <div>
      <div
        style={styles.swatch}
        onClick={() => setShowColorSelect(!showColorSelect)}
      >
        <div style={styles.color} />
      </div>
      {showColorSelect ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={() => setShowColorSelect(false)} />
          <SketchPicker
            color={tmpColor}
            onChange={(newTmpColor) => {
              setTmpColor(newTmpColor);
            }}
            onChangeComplete={() =>
              dispatch(actions.brush.setColor(tmpColor.rgb))
            }
          />
        </div>
      ) : null}
    </div>
  )
}

const BrushPanel = (props) => {
  const dispatch = useDispatch()
  const drawMode = useSelector((store) => store.drawMode)
  const width = useSelector((store) => store.width)
  const height = useSelector((store) => store.height)
  const backgroundColor = useSelector(store => store.backgroundColor)

  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const startSquare = useSelector((store) => store.startSquare)
  const endSquare = useSelector((store) => store.endSquare)
  const buffer = useSelector((store) => store.buffer)

  return (
    <Segment>
      <Grid style={{ padding: "5px" }}>
        <Grid.Row centered>
          <ColorPicker />
          <Popup
            content="Eyedropper"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                icon
                color={drawMode == "eyedropper" ? "green" : null}
                style={{ marginLeft: "5px" }}
                onClick={() =>
                  dispatch(actions.brush.setDrawMode("eyedropper"))
                }
              >
                <Icon name="eye dropper" />
              </Button>
            }
          />
        </Grid.Row>
        <Grid.Row centered>
          <Popup
            content="Paintbrush"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                icon
                color={drawMode == "paintbrush" ? "green" : null}
                onClick={() =>
                  dispatch(actions.brush.setDrawMode("paintbrush"))
                }
              >
                <Icon name="paint brush" />
              </Button>
            }
          />
          <Popup
            content="Fill cells"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                icon
                color={drawMode == "fill" ? "green" : null}
                onClick={() => dispatch(actions.brush.setDrawMode("fill"))}
              >
                {/* Custom icon defined in App.css */}
                <Icon className="paintbucket" />
              </Button>
            }
          />
        </Grid.Row>
        <Grid.Row centered>
          <Popup
            content="Eraser"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                icon
                color={drawMode == "eraser" ? "green" : null}
                onClick={() => dispatch(actions.brush.setDrawMode("eraser"))}
              >
                <Icon name="eraser" />
              </Button>
            }
          />
          <Popup
            content="Select cells"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                icon
                color={drawMode === "selection" ? "green" : null}
                onClick={() => dispatch(actions.brush.setDrawMode("selection"))}
              >
                <Icon name="expand" />
              </Button>
            }
          />
          <Popup
            content="Copy cells"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                icon
                onClick={() => copyCells(width, startSquare, endSquare, dispatch)}
              >
                <Icon name="copy" />
              </Button>
            }
          />
          <Popup
            content="Paste cells"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                icon
                onClick={() => pasteCells(width, height, startSquare, buffer)}
              >
                <Icon name="paste" />
              </Button>
            }
          />
        </Grid.Row>
        <Grid.Row centered>
          <Popup
            content="Save design to image"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                icon
                onClick={() => {
                  exportToPNG(width, height)
                }}
              >
                <Icon name="save outline" />
              </Button>
            }
          />
          <Popup
            content="Clear canvas"
            mouseEnterDelay={250}
            on="hover"
            trigger={
              <Button
                icon
                onClick={() => {
                  setShowClearConfirm(true)
                }}
              >
                <Icon name="trash alternate outline" />
              </Button>
            }
          />
          <Confirm
            content="This will clear all content on the canvas. Are you sure?"
            open={showClearConfirm}
            onCancel={() => setShowClearConfirm(false)}
            onConfirm={() => {
              setShowClearConfirm(false)
              clearCanvas(backgroundColor)
              dispatch(actions.preview.setPreviewValid(false))
            }}
          />
        </Grid.Row>
        <Grid.Row centered>
          <CanvasImport />
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default BrushPanel
