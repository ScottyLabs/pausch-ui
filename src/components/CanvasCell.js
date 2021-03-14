import { Table } from "semantic-ui-react"
import React, { useState } from "react"
import * as actions from "../actions"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import bucketFill from "./brushes/bucketFill"
import { toCoordinates } from "./brushes/utility"

const tableCellStyle = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "white white white white",
  width: "10px",
  height: "30px",
  padding: 0,
}

const baseCellStyle = {
  border: "solid white 3px",
  width: "100%",
  height: "100%",
}

const toIndex = (row, col, width) => {
  let index = row * width + col
  return index
}

const isWithinSelection = (startSquare, currSquare, row, col) => {
  const res =
    startSquare != null &&
    currSquare != null &&
    ((row <= startSquare[0] && row >= currSquare[0]) ||
      (row <= currSquare[0] && row >= startSquare[0])) &&
    ((col <= startSquare[1] && col >= currSquare[1]) ||
      (col <= currSquare[1] && col >= startSquare[1]))
  return res
}

const cleanBoard = (height, width) => {
  for (let i = 0; i < height * width; i++) {
    const cell = document.querySelector("#cell" + i)
    cell.style.border = baseCellStyle.border
  }
}

const CanvasCell = (props) => {
  // React props
  const { row, index, width, height, isMouseDown } = props
  const drawMode = useSelector((store) => store.drawMode)
  const color = useSelector((store) => store.color, shallowEqual)
  const colorStr = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`

  const [startSquare, setStartSquare] = useState(null)

  // Mouse event listeners
  const onMouseUp = () => {
    console.log("Start square", startSquare)

    cleanBoard(height, width)
    if (drawMode === "selection") {
      let square = startSquare ? [...startSquare] : null
      let currSquare = toCoordinates(index, width)
      console.log(square, currSquare)
      setStartSquare(null)
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (isWithinSelection(square, currSquare, i, j)) {
            console.log("Within", i, j)
            const cell = document.querySelector("#cell" + toIndex(i, j, width))
            cell.style.borderColor = "blue"
            cell.style.borderWidth = "3px"
          }
        }
      }
    } else if (drawMode === "fill") {
      const cell = document.querySelector("#cell" + index)
      bucketFill(cell, index, width, height, colorStr)
    }
  }

  // When a mouse hovers over a cell
  const onMouseOver = (drawMode, color, enableSelect) => {
    if (isMouseDown) {
      const cell = document.querySelector("#cell" + index)
      // Handle brushes
      if (drawMode === "paintbrush") {
        cell.style.backgroundColor = colorStr
      } else if (drawMode === "selection") {
        if (enableSelect) {
          const coords = toCoordinates(index, width)
          console.log("New square", coords)
          setStartSquare(coords)
          console.log("Square", startSquare)
        }
      } else {
        cell.style.backgroundColor = null
      }
    }
  }

  return (
    <Table.Cell
      style={tableCellStyle}
      onMouseEnter={(event) => onMouseOver(drawMode, color, false)}
      onMouseDown={(event) => onMouseOver(drawMode, color, true)}
      onMouseUp={onMouseUp}
    >
      <div
        style={baseCellStyle}
        className={`canvasCell row${row.toString()}`}
        id={"cell" + index}
      />
    </Table.Cell>
  )
}

export default CanvasCell
