import { Container, Table } from "semantic-ui-react"
import React, { useEffect, useState } from "react"

// Styles
const tableStyle = {
  margin: "10px",
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  borderColor: "black",
}

const baseCellStyle = {
  borderColor: "black",
  width: "10px",
  height: "30px",
  padding: 0,
}

// Color a cell
const onMouseOver = (isMouseDown, index) => {
  if (isMouseDown) {
    const cell = document.querySelector("#cell" + index);
    cell.style.backgroundColor = "red";
  }
}

const Canvas = (props) => {
  const { width, height, isMouseDown } = props 

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
          id={"cell" + index}
          key={index}
          onMouseEnter={(event) => {
            onMouseOver(isMouseDown, index)
          }}
          onMouseLeave={(event) => {
            onMouseOver(isMouseDown, index)
          }}
          onMouseDown={(event) => {
            onMouseOver(true, index)
          }}
        ></Table.Cell>
      )
      row.push(cell)
      cells.push(cell)
    }
    rows.push(<Table.Row>{row}</Table.Row>)
  }
  return (
    <Table celled style={tableStyle}>
      {rows}
    </Table>
  )
}

export default Canvas
