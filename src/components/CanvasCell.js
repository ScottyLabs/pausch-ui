import { Table } from "semantic-ui-react"
import React from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { bucketFill } from "./canvas-actions/bucketFill"
import { startSelection, finishSelection } from "./canvas-actions/selection"
import * as actions from "../actions"
import { selectCellColor } from "./canvas-actions/eyeDropper"

const DEFAULT_COLOR = "rgba(0, 0, 0, 255)"

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

  // Mouse event listeners
  const onMouseUp = () => {
    const cell = document.querySelector("#cell" + index)

    cleanBoard(tableCellStyle, height, width)
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
      } else if (drawMode === "eraser") {
        cell.style.backgroundColor = backgroundColor
      } else if (drawMode === "eyedropper") {
        selectCellColor(cell, dispatch)
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
        onMouseUp()
      }}
      style={tableCellStyle}
      className={`canvasCell row${row.toString()}`}
      id={"cell" + index}
    ></Table.Cell>
  )
}

export default CanvasCell
