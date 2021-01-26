import { Table } from "semantic-ui-react"

const baseCellStyle = {
  border: "solid white 3px",
  width: "10px",
  height: "30px",
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
const fillCells = (cell, index, width, height, colorStr) => {
  const cells = document.querySelectorAll(".canvasCell")
  const baseColor = cell.style.backgroundColor
  const startCol = index % width
  const startRow = (index - startCol) / width
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

// Color a cell
const onMouseOver = (isMouseDown, index, width, height, drawMode, color) => {
  if (isMouseDown) {
    const cell = document.querySelector("#cell" + index)
    const colorStr = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    if (drawMode == "paintbrush") {
      cell.style.backgroundColor = colorStr
    } else if (drawMode == "fill") {
      fillCells(cell, index, width, height, colorStr)
    } else {
      cell.style.backgroundColor = null
    }
  }
}

const CanvasCell = (props) => {
  const { row, index, isMouseDown, width, height, drawMode, color } = props

  const cellStyle = {
    ...baseCellStyle,
  }

  return (
    <Table.Cell
      style={cellStyle}
      className={`canvasCell row${row.toString()}`}
      id={"cell" + index}
      onMouseEnter={(event) => {
        onMouseOver(isMouseDown, index, width, height, drawMode, color)
      }}
      onMouseLeave={(event) => {
        onMouseOver(isMouseDown, index, width, height, drawMode, color)
      }}
      onMouseDown={(event) => {
        onMouseOver(true, index, width, height, drawMode, color)
      }}
    ></Table.Cell>
  )
}

export default CanvasCell
