import { Table } from "semantic-ui-react"
import React from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { bucketFill } from "./canvas-actions/bucketFill"
import { startSelection, finishSelection } from "./canvas-actions/selection"
import { selectCellColor } from "./canvas-actions/eyeDropper"
import { drawLine, drawDashedLine } from "./canvas-actions/line"
import { toCoordinates } from "./canvas-actions/utility"
import { drawDiamond } from "./canvas-actions/diamond"

const DEFAULT_BORDER_COLOR = "rgba(0, 0, 0, 255"
const DEFAULT_COLOR = "rgba(0, 0, 0, 0)"
// default selection border color
const START_SELECTED_COLOR = "rgb(105, 240, 175)"
const END_SELECTED_COLOR = "rgb(105, 240, 174)"
// Draw Modes where we want to show an indicator of the current cell selection
const INDICATOR_MODES = ["selection", "line", "dashed-line"]

const tableCellStyle = {
    backgroundColor: DEFAULT_COLOR,
    border: `solid ${DEFAULT_BORDER_COLOR} 3px`,
    borderColor: DEFAULT_BORDER_COLOR,
    width: "10px",
    height: "30px",
    padding: 0,
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
  const diamondRadius = useSelector(store => store.diamondRadius)
  const dashedLineGap = useSelector(store => store.dashedLineGap)
  const dashedLineSolid = useSelector(store => store.dashedLineSolid)
  const colorStr = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`

  const onMouseLeave = () => {
    const cell = document.querySelector("#cell" + index)
    if (INDICATOR_MODES.includes(drawMode)) {
      if (cell.style.borderColor === END_SELECTED_COLOR) {
        cell.style.borderColor = DEFAULT_BORDER_COLOR
      }
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
    } else if (drawMode === "dashed-line") {
      const endSquare = toCoordinates(index, width)
      drawDashedLine(width, startSquare, endSquare, colorStr, 
        dashedLineGap, dashedLineSolid)
    }

  }

  // When a mouse hovers over a cell
  const onMouseOver = (startNewSelection, forceMouseDown) => {
    if (isMouseDown || forceMouseDown) {
      const cell = document.querySelector("#cell" + index)
      
      if (INDICATOR_MODES.includes(drawMode)) {
        startSelection(index, width, startNewSelection, dispatch)
        cell.style.borderColor = startNewSelection ? START_SELECTED_COLOR : END_SELECTED_COLOR;
      }
      // Handle brushes
      if (drawMode === "paintbrush") {
        cell.style.backgroundColor = colorStr
      } else if (drawMode === "selection") {
        startSelection(index, width, startNewSelection, dispatch)
      } else if (drawMode === "eraser") {
        cell.style.backgroundColor = DEFAULT_COLOR
      } else if (drawMode === "eyedropper") {
        selectCellColor(cell, dispatch)
        // Switch back to paintbrush automatically
        dispatch(actions.brush.setDrawMode("paintbrush"))
      } else if (drawMode === "line") {
      } else if (drawMode === "dashed-line") {
      } else if (drawMode === "diamond") {
        const [ , col] = toCoordinates(index, width);
        drawDiamond(width, height, row, col, colorStr, diamondRadius);
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
