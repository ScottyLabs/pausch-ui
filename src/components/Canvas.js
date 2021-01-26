import { Table } from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import CanvasCell from "./CanvasCell"

// Styles
const tableStyle = {
  marginTop: 0,
}

const Canvas = (props) => {
  const { width, height, isMouseDown, drawMode, color, row } = props

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
          index={index}
          isMouseDown={isMouseDown}
          width={width}
          height={height}
          drawMode={drawMode}
          color={color}
          selectedRow={row}
        />
      )
      rowCells.push(cell)
      cells.push(cell)
    }
    let style = null
    if (row == i) {
      style = {
        border: "solid black 1px"
      }
    }
    rows.push(<Table.Row key={i} style={style}>{rowCells}</Table.Row>)
  }
  return (
    <Table celled style={tableStyle}>
      {rows}
    </Table>
  )
}

export default Canvas
