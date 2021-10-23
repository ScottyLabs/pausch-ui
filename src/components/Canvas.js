import React from "react"
import { useSelector } from "react-redux"
import { Table, TableBody } from "semantic-ui-react"
import CanvasCell from "./CanvasCell"

const Canvas = (props) => {
  const { isMouseDown } = props
  const height = useSelector((store) => store.height);
  const width = useSelector((store) => store.width);
  const backgroundColor = useSelector((store) => store.backgroundColor);

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
    rows.push(
      <Table.Row key={i} style={style}>
        {rowCells}
      </Table.Row>
    )
  }
  return (
    <Table celled style={{ marginTop: 0, backgroundColor }}>
      <TableBody>{rows}</TableBody>
    </Table>
  )
}

export default Canvas
