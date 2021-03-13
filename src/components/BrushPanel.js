import { Button, Container, Grid, Icon, Segment } from "semantic-ui-react"
import reactCSS from "reactcss"
import { SketchPicker } from "react-color"
import React, { useEffect, useState } from "react"
import * as actions from "../actions"
import { useSelector, useDispatch, shallowEqual } from "react-redux"

const clearCanvas = () => {
  const cells = document.querySelectorAll(".canvasCell")
  if (cells) {
    cells.forEach((cell) => {
      cell.style.backgroundColor = null
    })
  }
}

const ColorPicker = (props) => {
  const dispatch = useDispatch();
  const color = useSelector(store => store.color, shallowEqual);
  const [showColorSelect, setShowColorSelect] = useState(false)

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
            color={color}
            onChange={(newColor) => dispatch(actions.brush.setColor(newColor.rgb)) }
          />
        </div>
      ) : null}
    </div>
  )
}

const BrushPanel = (props) => {
  const dispatch = useDispatch();
  const drawMode = useSelector(store => store.drawMode);

  return (
    <Segment>
      <Grid>
        <Grid.Row centered>
          <ColorPicker />
        </Grid.Row>
        <Grid.Row centered>
          <Button
            icon
            color={drawMode == "paintbrush" ? "green" : null}
            onClick={() => dispatch(actions.brush.setDrawMode("paintbrush"))}
          >
            <Icon name="paint brush" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Button
            icon
            color={drawMode == "fill" ? "green" : null}
            onClick={() => dispatch(actions.brush.setDrawMode("fill"))}
          >
            {/* Custom icon defined in App.css */}
            <Icon className="paintbucket" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Button
            icon
            color={drawMode == "eraser" ? "green" : null}
            onClick={() => dispatch(actions.brush.setDrawMode("eraser"))}
          >
            <Icon name="eraser" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Button
            icon
            color={drawMode === "selection" ? "green" : null}
            onClick={() => dispatch(actions.brush.setDrawMode("selection"))}
          >
            <Icon name="expand" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Button
            icon
            onClick={() => {
              clearCanvas()
              dispatch(actions.preview.setPreviewValid(false))
            }}
          >
            <Icon name="trash alternate outline" />
          </Button>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default BrushPanel
