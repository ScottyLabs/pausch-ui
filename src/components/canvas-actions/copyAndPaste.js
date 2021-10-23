import { toCoordinates, toIndex } from "./utility"
import * as actions from "../../actions";

export const copyCells = (width, startSquare, endSquare, dispatch) => {
    // Use setState hook to get most updated state
    let square = startSquare ? [...startSquare] : null
    let currSquare = endSquare ? [...endSquare] : null

    if (square == null || currSquare == null) return;

    const minRow = Math.min(square[0], currSquare[0])
    const maxRow = Math.max(square[0], currSquare[0])
    const minCol = Math.min(square[1], currSquare[1])
    const maxCol = Math.max(square[1], currSquare[1])

    // initialize buffer for saving copied cells
    const bufferWidth = maxCol - minCol + 1
    const bufferHeight = maxRow - minRow + 1
    let buffer = new Array(bufferHeight);
    for (let i = 0; i < bufferHeight; i++) {
        buffer[i] = new Array(bufferWidth);
    }

    for (let i = minRow; i <= maxRow; i++) {
        for (let j = minCol; j <= maxCol; j++) {
            const cell = document.querySelector("#cell" + toIndex(i, j, width))
            buffer[i-minRow][j-minCol] = cell.style.backgroundColor;
        }
    }
    dispatch(actions.brush.setBuffer(buffer))
}

export const pasteCells = (width, height, startSquare, buffer) => {
    let square = startSquare ? [...startSquare] : null
    if (startSquare == null || buffer == null || buffer.length === 0) {
        return;
    }
    let bufferHeight = buffer.length;
    let bufferWidth = buffer[0].length;
    const startRow = square[0];
    const startCol = square[1];
    for (let i = startRow; i < Math.min(startRow + bufferHeight, height); i++) {
        for (let j = startCol; j < Math.min(startCol + bufferWidth, width); j++) {
            const cell = document.querySelector("#cell" + toIndex(i, j, width))
            const color = buffer[i-startRow][j-startCol] 
            cell.style.backgroundColor = color;
        }
    }
}