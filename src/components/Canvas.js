import { Table } from "semantic-ui-react"
import React, { useEffect, useState } from "react"

// Styles
const tableStyle = {
  borderColor: "black",
  marginTop: 0,
}

const baseCellStyle = {
  borderColor: "black",
  width: "10px",
  height: "30px",
  padding: 0,
}

// TODO: optimize DOM tree traversal by making cell a separate React component
// Color a cell
const onMouseOver = (isMouseDown, index, drawMode, color) => {
  if (isMouseDown) {
    const cell = document.querySelector("#cell" + index)
    if (drawMode == "paintbrush") {
      cell.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    } else {
      cell.style.backgroundColor = null
    }
  }
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
        <Table.Cell
          style={baseCellStyle}
          className={`canvasCell row${i.toString()}`}
          id={"cell" + index}
          onMouseEnter={(event) => {
            onMouseOver(isMouseDown, index, drawMode, color)
          }}
          onMouseLeave={(event) => {
            onMouseOver(isMouseDown, index, drawMode, color)
          }}
          onMouseDown={(event) => {
            onMouseOver(true, index, drawMode, color)
          }}
        ></Table.Cell>
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
