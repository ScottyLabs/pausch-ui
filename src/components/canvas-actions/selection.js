import { toCoordinates, toIndex } from "./utility"
import * as actions from "../../actions";

// Start new selection bounds
export const startSelection = (index, width, enableSelect, dispatch) => {
  if (enableSelect) {
    const coords = toCoordinates(index, width)
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
        cell.style.borderColor = "blue"
        cell.style.borderWidth = "3px"
    }
  }

  dispatch(actions.brush.setStartSquare(null));
}
