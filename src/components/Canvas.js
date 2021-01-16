import { Container, Table } from "semantic-ui-react"
import React, { useEffect, useState } from "react"

// Color a cell
const onMouseOver = (isMouseDown, styles, setStyles, index) => {
  if (isMouseDown) {
    const tmpStyles = [...styles]
    const cellStyle = tmpStyles[index]
    tmpStyles[index] = {
      ...tmpStyles[index],
      backgroundColor: "red"
    }
    setStyles(tmpStyles)
  }
}

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

const Canvas = (props) => {
  const { width, height, isMouseDown } = props
  const [styles, setStyles] = useState([])

  const rows = []
  const cells = []

  useEffect(() => {
    // Populate styles
    const tmpStyles = []
    for (let i = 0; i < height * width; i++) {
      tmpStyles.push(baseCellStyle)
    }
    setStyles(tmpStyles)
  }, [])

  // Populate cells
  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      const index = i * width + j
      const cell = (
        <Table.Cell
          style={styles[index]}
          id={"cell" + index}
          key={index}
          onMouseOver={(event) => {
            onMouseOver(isMouseDown, styles, setStyles, index)
          }}
          onMouseDown={(event) => {
            onMouseOver(true, styles, setStyles, index)
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
