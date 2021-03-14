import { Table } from "semantic-ui-react"
import React, { useState } from "react"
import * as actions from "../actions"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import bucketFill from "./brushes/bucketFill"
import { finishSelection } from "./brushes/selection"
import { startSelection } from "./brushes/selection"

const tableCellStyle = {
  border: "solid white 3px",
  borderColor: "white",
  width: "10px",
  height: "30px",
  padding: 0,
}

const cleanBoard = (height, width) => {
  for (let i = 0; i < height * width; i++) {
    const cell = document.querySelector("#cell" + i)
    cell.style.border = tableCellStyle.border
  }
}

const CanvasCell = (props) => {
  // React props
  const { row, index, width, height, isMouseDown } = props
  const drawMode = useSelector((store) => store.drawMode)
  const color = useSelector((store) => store.color, shallowEqual)
  const startSquare = useSelector((store) => store.startSquare)
  const colorStr = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  const dispatch = useDispatch()

  // Mouse event listeners
  const onMouseUp = () => {
    console.log("Start square", startSquare)
    const cell = document.querySelector("#cell" + index)

    cleanBoard(height, width)
    if (drawMode === "selection") {
      finishSelection(index, height, width, startSquare, dispatch)
    } else if (drawMode === "fill") {
      bucketFill(cell, index, width, height, colorStr)
    }
  }

  // When a mouse hovers over a cell
  const onMouseOver = (enableSelect, forceMouseDown) => {
    if (isMouseDown || forceMouseDown) {
      const cell = document.querySelector("#cell" + index)
      // Handle brushes
      if (drawMode === "paintbrush") {
        cell.style.backgroundColor = colorStr
      } else if (drawMode === "selection") {
        startSelection(index, width, enableSelect, dispatch)
      } else {
        cell.style.backgroundColor = null
      }
    }
  }

  return (
    <Table.Cell
      onMouseEnter={(event) => {
        event.preventDefault()
        onMouseOver(false)
      }}
      onMouseDown={(event) => {
        event.preventDefault()
        onMouseOver(true, true)
      }}
      onMouseUp={(event) => {
        event.preventDefault()
        onMouseUp();
      }}
      style={tableCellStyle}
      className={`canvasCell row${row.toString()}`}
      id={"cell" + index}
    ></Table.Cell>
  )
}

export default CanvasCell
