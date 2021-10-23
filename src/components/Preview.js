import { Table, TableBody } from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import * as actions from "../actions"
import { useSelector, useDispatch } from "react-redux"

// Styles
const stickyStyle = {
  position: "sticky",
  top: 0
}

const tableStyle = {
  borderColor: "white",
  borderWidth: "2px",
}

const previewRowStyle = {
  backgroundColor: "rgba(0, 0, 0, 255)"
}

const baseCellStyle = {
  borderColor: "black",
  backgroundColor: "black",
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

const startPlaying = async (previewCells, playMode, previewRow) => {
  if (playMode === "pause") {
    return
  }

  colorPreviewCells(previewRow, previewCells)
}

const Preview = (props) => {
  const dispatch = useDispatch()
  const width = useSelector((store) => store.width)
  const playMode = useSelector((store) => store.playMode)
  const playRate = useSelector((store) => store.playRate)
  const previewRow = useSelector((store) => store.previewRow)
  const previewValid = useSelector((store) => store.previewValid)

  const [previewCells, setPreviewCells] = useState([])

  useEffect(() => {
    setPreviewCells(document.querySelectorAll(".previewCell"))
  }, [])

  startPlaying(previewCells, playMode, previewRow)

  if (playMode === "pause" && !previewValid) {
    colorPreviewCells(previewRow, previewCells)
    dispatch(actions.preview.setPreviewValid(true))
  }

  const rowContent = []
  for (let i = 0; i < width; i++) {
    const cell = (
      <Table.Cell
        style={{
          ...baseCellStyle,
          transition: `background-color ${playRate / 2}s linear`,
        }}
        className="previewCell"
        id={"previewCell" + i}
        key={i}
      ></Table.Cell>
    )
    rowContent.push(cell)
  }

  return (
    <div style={stickyStyle}>
      <Table celled style={tableStyle}>
        <TableBody>
          <Table.Row key="0" style={previewRowStyle}>{rowContent}</Table.Row>
        </TableBody>
      </Table>
    </div>
  )
}

export default Preview
