import { Table, TableBody } from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import * as actions from "../actions"
import { useSelector, useDispatch, shallowEqual } from "react-redux"

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

const startPlaying = async (
  height,
  previewCells,
  playMode,
  previewRow,
  playRate,
  renderTask,
  setRenderTask,
  dispatch
) => {
  if (playMode === "pause") {
    return
  }
  if (playMode === "reset") {
    dispatch(actions.preview.resetPreview())
    if (renderTask.timer != null) {
      clearTimeout(renderTask.timer);
      setRenderTask({ });
    }
    return
  }

  colorPreviewCells(previewRow, previewCells)

  const now = Date.now();
  const delay = playRate * 1000;
  if (now - renderTask.time >= delay) {
    // Check time to prevent race conditions
    const timer = setTimeout(() => {
      dispatch(actions.preview.incrementPreviewRow())
    }, delay);
    setRenderTask({ timer, time: now });
  }

}

const Preview = (props) => {
  const { width, height } = props
  const dispatch = useDispatch()
  const playMode = useSelector((store) => store.playMode)
  const playRate = useSelector((store) => store.playRate)
  const previewRow = useSelector((store) => store.previewRow)
  const previewValid = useSelector((store) => store.previewValid)

  const [previewCells, setPreviewCells] = useState([])
  const [renderTask, setRenderTask] = useState({ time: Date.now(), timer: null })

  useEffect(() => {
    setPreviewCells(document.querySelectorAll(".previewCell"))
  }, [])

  startPlaying(
    height,
    previewCells,
    playMode,
    previewRow,
    playRate,
    renderTask,
    setRenderTask,
    dispatch
  )

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
    <Table celled style={tableStyle}>
      <TableBody>
        <Table.Row key="0">{rowContent}</Table.Row>
      </TableBody>
    </Table>
  )
}

export default Preview
