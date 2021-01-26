import { Table } from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import CanvasCell from "./CanvasCell"

// Styles
const tableStyle = {
  marginTop: 0,
}

const Canvas = (props) => {
  const { width, height, isMouseDown, drawMode, color } = props

  const rows = []
  const cells = []

  // Populate cells
  for (let i = 0; i < height; i++) {
    const row = []
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
        />
      )
      row.push(cell)
      cells.push(cell)
    }
    rows.push(<Table.Row key={i}>{row}</Table.Row>)
  }
  return (
    <Table celled style={tableStyle}>
      {rows}
    </Table>
  )
}

export default Canvas
