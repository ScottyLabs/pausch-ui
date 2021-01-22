import { Table } from "semantic-ui-react"
import React, { useEffect, useState } from "react"

// Styles
const tableStyle = {
  borderColor: "black",
}

const baseCellStyle = {
  borderColor: "black",
  width: "10px",
  height: "80px",
  padding: 0,
}

const colorPreviewCells = (row, previewCells) => {
  const cells = document.querySelectorAll(`.row${row}`)
  if (cells) {
    cells.forEach((cell, idx) => {
      const previewCell = previewCells[idx]
      previewCell.style.backgroundColor = cell.style.backgroundColor
    })
  }
}

const startPlaying = (
  playMode,
  setPlayMode,
  height,
  previewCells,
  row,
  setRow,
  playRate
) => {
  if (playMode === "pause") {
    return
  }
  if (playMode === "reset") {
    setRow(0)
    setPlayMode("play")
    return
  }

  colorPreviewCells(row, previewCells)

  setTimeout(() => {
    setRow((row + 1) % height)
  }, playRate * 1000)
}

const Preview = (props) => {
  const {
    width,
    height,
    playMode,
    setPlayMode,
    playRate,
    row,
    setRow,
    previewValid,
    setPreviewValid,
  } = props
  const [previewCells, setPreviewCells] = useState([])

  useEffect(() => {
    setPreviewCells(document.querySelectorAll(".previewCell"))
  }, [])

  startPlaying(
    playMode,
    setPlayMode,
    height,
    previewCells,
    row,
    setRow,
    playRate
  )

  if (playMode == "pause" && !previewValid) {
    colorPreviewCells(row, previewCells)
    setPreviewValid(true)
  }

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
