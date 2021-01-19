import { Table } from "semantic-ui-react"
import React, { useEffect, useState } from "react"

// Styles
const tableStyle = {
  borderColor: "black",
}

const baseCellStyle = {
  borderColor: "black",
  width: "10px",
  height: "30px",
  padding: 0,
}

const startPlaying = (
  playMode,
  height,
  previewCells,
  row,
  setRow,
  playRate,
  playState
) => {
  if (!playMode && row != 0) {
    return
  }
  
  const cells = document.querySelectorAll(`.row${row}`)
  if (cells) {
    cells.forEach((cell, idx) => {
      const previewCell = previewCells[idx]
      previewCell.style.backgroundColor = cell.style.backgroundColor
    })
  }

  setTimeout(() => {
    setRow((row + 1) % height)
  }, playRate * 1000)
}

const Preview = (props) => {
  const { width, height, playMode, playRate, row, setRow, playState } = props
  const [previewCells, setPreviewCells] = useState([])

  useEffect(() => {
    setPreviewCells(document.querySelectorAll(".previewCell"))
  }, [])

  startPlaying(playMode, height, previewCells, row, setRow, playRate, playState)

  const rowContent = []
  for (let i = 0; i < width; i++) {
    const cell = (
      <Table.Cell
        style={baseCellStyle}
        className="previewCell"
        id={"previewCell" + i}
      ></Table.Cell>
    )
    rowContent.push(cell)
  }

  return (
    <Table celled style={tableStyle}>
      <Table.Row key="0">{rowContent}</Table.Row>
    </Table>
  )
}

export default Preview
