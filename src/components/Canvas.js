import { Table, TableBody } from "semantic-ui-react"
import React from "react"
import CanvasCell from "./CanvasCell"
import { useDispatch } from "react-redux"
import * as actions from "../actions"
import IndicatorCell from "./IndicatorCell"

// Styles
const makeCanvasStyle = (width) => {
  const indicatorWidth = 100 / (width + 1)
  const contentWidth = (100 * width) / (width + 1)

  return {
    display: "grid",
    width: "100%",
    "column-gap": "10px",
    "grid-template-columns": `${indicatorWidth}fr ${contentWidth}fr`,
  }
}

const Canvas = (props) => {
  const { width, height, row, isMouseDown } = props
  const dispatch = useDispatch()
  dispatch(actions.canvas.setDimensions(width, height))

  const canvasStyle = makeCanvasStyle(width)

  const rows = []
  const cells = []

  // Populate cells
  for (let i = 0; i < height; i++) {
    const rowCells = []

    for (let j = 0; j < width; j++) {
      const index = i * width + j
      const cell = (
        <CanvasCell
          row={i}
          key={index}
          index={index}
          width={width}
          height={height}
          isMouseDown={isMouseDown}
        />
      )
      rowCells.push(cell)
      cells.push(cell)
    }
    let style = null
    if (row == i) {
      style = {
        border: "solid black 1px",
      }
    }
    rows.push(
      <Table.Row key={i} style={style}>
        {rowCells}
      </Table.Row>
    )
  }
  return (
    <Table celled style={{ marginTop: 0 }}>
      <TableBody>{rows}</TableBody>
    </Table>
  )
}

export default Canvas
