import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Confirm, Grid, Icon, Popup, Segment } from "semantic-ui-react"
import * as actions from "../actions"
import { exportToPNG } from "./canvas-actions/exportCanvas"
import { clearCanvas } from "./canvas-actions/utility"
import CanvasImport from "./CanvasImport"
import ColorPicker from "./ColorPicker"

const BrushPanel = (props) => {
  const dispatch = useDispatch()
  const drawMode = useSelector((store) => store.drawMode)
  const width = useSelector((store) => store.width)
  const height = useSelector((store) => store.height)
  const backgroundColor = useSelector(store => store.backgroundColor)

  const [showClearConfirm, setShowClearConfirm] = useState(false)

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
