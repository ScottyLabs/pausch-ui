import { Table } from "semantic-ui-react"
import React from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { bucketFill } from "./canvas-actions/bucketFill"
import { startSelection, finishSelection } from "./canvas-actions/selection"
import * as actions from "../actions"
import { selectCellColor } from "./canvas-actions/eyeDropper"
import { drawLine } from "./canvas-actions/line"
import { toCoordinates } from "./canvas-actions/utility"

const DEFAULT_COLOR = "rgba(0, 0, 0, 255)"
// default selection border color
const SELECTED_COLOR = "#21ba45"
// Draw Modes where we want to show an indicator of the current cell selection
const INDICATOR_MODES = ["selection", "line", "dashed-line"]

const getTableCellStyle = (backgroundColor) => {
  return {
    backgroundColor,
    border: `solid ${backgroundColor} 3px`,
    borderColor: backgroundColor,
    width: "10px",
    height: "30px",
    padding: 0,
  }
}

const cleanBoard = (tableCellStyle, height, width) => {
  for (let i = 0; i < height * width; i++) {
    const cell = document.querySelector("#cell" + i)
    cell.style.border = tableCellStyle.border
  }
}

const CanvasCell = (props) => {
  const dispatch = useDispatch()
  // React props
  const { row, index, width, height, isMouseDown } = props
  const drawMode = useSelector((store) => store.drawMode)
  const color = useSelector((store) => store.color, shallowEqual)
  const startSquare = useSelector((store) => store.startSquare)

  const backgroundColor =
    useSelector((store) => store.backgroundColor) || DEFAULT_COLOR
  const tableCellStyle = getTableCellStyle(backgroundColor)

  const colorStr = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`

  const onMouseLeave = () => {
    const cell = document.querySelector("#cell" + index)
    if (drawMode === "selection") {
      cell.style.borderColor = backgroundColor
    }
  }

  // Mouse event listeners
  const onMouseUp = () => {
    const cell = document.querySelector("#cell" + index)

    cleanBoard(tableCellStyle, height, width)
    if (drawMode === "selection") {
      finishSelection(index, height, width, startSquare, dispatch)
    } else if (drawMode === "fill") {
      bucketFill(cell, index, width, height, colorStr)
    } else if (drawMode === "line") {
      const endSquare = toCoordinates(index, width)
      drawLine(width, startSquare, endSquare, colorStr)
    }

    if (INDICATOR_MODES.includes(drawMode)) {
      cell.style.borderColor = backgroundColor
    }
  }

  // When a mouse hovers over a cell
  const onMouseOver = (startNewSelection, forceMouseDown) => {
    if (isMouseDown || forceMouseDown) {
      const cell = document.querySelector("#cell" + index)
      // Handle brushes
      if (drawMode === "paintbrush") {
        cell.style.backgroundColor = colorStr
      } else if (drawMode === "selection") {
        startSelection(index, width, startNewSelection, dispatch)
      } else if (drawMode === "eraser") {
        cell.style.backgroundColor = backgroundColor
      } else if (drawMode === "eyedropper") {
        selectCellColor(cell, dispatch)
      } else if (drawMode === "line") {
        startSelection(index, width, startNewSelection, dispatch)
      } else if (drawMode === "dashed-line") {
      } else if (drawMode === "diamond") {
      }

      if (INDICATOR_MODES.includes(drawMode)) {
        cell.style.borderColor = SELECTED_COLOR
      }
    }
  }

  return (
    <Table.Cell
      onMouseEnter={(event) => {
        event.preventDefault()
        onMouseOver(false, false)
      }}
      onMouseDown={(event) => {
        event.preventDefault()
        onMouseOver(true, true)
      }}
      onMouseUp={(event) => {
        event.preventDefault()
        onMouseUp()
      }}
      onMouseLeave={(event) => {
        event.preventDefault()
        onMouseLeave()
      }}
      style={tableCellStyle}
      className={`canvasCell row${row.toString()}`}
      id={"cell" + index}
    ></Table.Cell>
  )
}

export default CanvasCell
