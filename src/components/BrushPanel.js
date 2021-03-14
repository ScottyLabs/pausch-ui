import React, { useState } from "react"
import { SketchPicker } from "react-color"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import reactCSS from "reactcss"
import { Button, Grid, Icon, Popup, Segment } from "semantic-ui-react"
import * as actions from "../actions"
import { exportToPNG } from "./canvas-actions/exportCanvas"
import CanvasImport from "./CanvasImport"
import { clearCanvas } from "./canvas-actions/utility"

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
                  clearCanvas()
                  dispatch(actions.preview.setPreviewValid(false))
                }}
              >
                <Icon name="trash alternate outline" />
              </Button>
            }
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
