import { Table } from "semantic-ui-react"
import React, { useState } from "react"
import * as actions from "../actions"
import { useSelector, useDispatch } from "react-redux"

const tableCellStyle = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "white white white white",
  width: "10px",
  height: "30px",
  padding: 0,
}

const selectedCellStyle = {
  ...tableCellStyle,
  borderColor: "black white black white",
}

const baseCellStyle = {
  border: "solid white 3px",
  width: "100%",
  height: "100%",
}

const toCoordinates = (index, width) => {
  let row = Math.floor(index / width)
  let col = index % width
  return [row, col]
}

const toIndex = (row, col, width) => {
  let index = row * width + col
  return index
}

// Utility color flood fill
const floodFill = (
  cells,
  startRow,
  startCol,
  width,
  height,
  visited,
  baseColor,
  colorStr
) => {
  const dy = [0, 1, 0, -1]
  const dx = [1, 0, -1, 0]
  for (let i = 0; i < 4; i++) {
    const newRow = startRow + dy[i]
    const newCol = startCol + dx[i]
    // Check if new coordinates are valid
    if (0 <= newRow && newRow < height && 0 <= newCol && newCol < width) {
      // Check if previously visited
      if (!visited[newRow][newCol]) {
        visited[newRow][newCol] = true
        const cell = cells[newRow * width + newCol]
        // Check if matching color
        if (cell.style.backgroundColor == baseColor) {
          cell.style.backgroundColor = colorStr
          // Recurse
          floodFill(
            cells,
            newRow,
            newCol,
            width,
            height,
            visited,
            baseColor,
            colorStr
          )
        }
      }
    }
  }
}

// Perform the bucket fill brush
const fillCells = (cell, pos, colorStr) => {
  const { index, width, height } = pos

  const cells = document.querySelectorAll(".canvasCell")
  const baseColor = cell.style.backgroundColor
  const [startRow, startCol] = toCoordinates(index, width)
  const visited = []
  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      row.push(false)
    }
    visited.push(row)
  }
  floodFill(
    cells,
    startRow,
    startCol,
    width,
    height,
    visited,
    baseColor,
    colorStr
  )
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

const onMouseUp = (pos, drawMode, startSquare, setStartSquare) => {
  const { index, width, height } = pos

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
  }
}

const CanvasCell = (props) => {
  // React props
  const { row, index, width, height } = props
  const isMouseDown = useSelector(store => store.isMouseDown);
  const drawMode = useSelector(store => store.drawMode);
  const color= useSelector(store => store.color);
  const previewRow = useSelector(store => store.previewRow);

  const [startSquare, setStartSquare] = useState(null)

  // When a mouse hovers over a cell
  const onMouseOver = (drawMode, color, enableSelect) => {
    if (isMouseDown) {
      const cell = document.querySelector("#cell" + index)
      const colorStr = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      if (drawMode === "paintbrush") {
        cell.style.backgroundColor = colorStr
      } else if (drawMode === "fill") {
        fillCells(cell, { index, width, height }, colorStr)
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
      style={previewRow == row ? selectedCellStyle : tableCellStyle}
      onMouseEnter={(event) => onMouseOver(drawMode, color, false)}
      onMouseDown={(event) => onMouseOver(drawMode, color, true)}
      onMouseUp={(event) =>
        onMouseUp(
          { index, width, height },
          drawMode,
          startSquare,
          setStartSquare
        )
      }
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
