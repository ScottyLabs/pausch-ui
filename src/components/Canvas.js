import React from "react"
import { useDispatch } from "react-redux"
import { Table, TableBody } from "semantic-ui-react"
import * as actions from "../actions"
import CanvasCell from "./CanvasCell"

const Canvas = (props) => {
  const { width, height, row, isMouseDown } = props
  const dispatch = useDispatch()
  dispatch(actions.canvas.setDimensions(width, height))

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
    if (row === i) {
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
