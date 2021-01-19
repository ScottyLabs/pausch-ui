import { Button, Container, Grid, Icon, Segment } from "semantic-ui-react"
import reactCSS from "reactcss"
import { SketchPicker } from "react-color"
import React, { useEffect, useState } from "react"

const clearCanvas = () => {
  const cells = document.querySelectorAll(".canvasCell")
  if (cells) {
    cells.forEach((cell) => {
      cell.style.backgroundColor = null
    })
  }
}

const ColorPicker = (props) => {
  const { color, setColor } = props
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
    <div
      style={{
        marginRight: "1em",
      }}
    >
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
            onChange={(newColor) => setColor(newColor.rgb)}
          />
        </div>
      ) : null}
    </div>
  )
}

const BrushPanel = (props) => {
  const { drawMode, setDrawMode, color, setColor } = props

  return (
    <Segment>
      <Grid>
        <Grid.Row centered>
          <ColorPicker color={color} setColor={setColor} />
          <Button
            icon
            floated="right"
            color={drawMode == "paintbrush" ? "green" : null}
            onClick={() => setDrawMode("paintbrush")}
          >
            <Icon name="paint brush" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Button
            icon
            color={drawMode == "eraser" ? "green" : null}
            onClick={() => setDrawMode("eraser")}
          >
            <Icon name="eraser" />
          </Button>
        </Grid.Row>
        <Grid.Row centered>
          <Button icon onClick={clearCanvas}>
            <Icon name="trash alternate outline" />
          </Button>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default BrushPanel
