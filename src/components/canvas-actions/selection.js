import { toCoordinates, toIndex } from "./utility"
import * as actions from "../../actions";

const BORDER_COLOR = "#21ba45";

// Start new selection bounds
export const startSelection = (index, width, startNewSelection, dispatch) => {
  const coords = toCoordinates(index, width)
  if (startNewSelection) {
    dispatch(actions.brush.setStartSquare(coords))
  }
}

// Finish selecting the current bounds
export const finishSelection = (
  index,
  height,
  width,
  startSquare,
  dispatch
) => {
  // Use setState hook to get most updated state
  let square = startSquare ? [...startSquare] : null
  let currSquare = toCoordinates(index, width)

  const minRow = Math.min(square[0], currSquare[0])
  const maxRow = Math.max(square[0], currSquare[0])
  const minCol = Math.min(square[1], currSquare[1])
  const maxCol = Math.max(square[1], currSquare[1])

  for (let i = minRow; i <= maxRow; i++) {
    for (let j = minCol; j <= maxCol; j++) {
      const cell = document.querySelector("#cell" + toIndex(i, j, width))
        cell.style.borderColor = BORDER_COLOR;
        cell.style.borderWidth = "3px"
    }
  }

  dispatch(actions.brush.setEndSquare(currSquare))
}
