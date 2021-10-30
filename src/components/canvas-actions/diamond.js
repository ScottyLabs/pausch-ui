import { toIndex, isPositionGood } from "./utility"

export const drawDiamond = (width, height, row, col, color, radius) => {
  const startCol = col - radius;
  const endCol = col + radius;
  let increment = 1;
  let lineOffset = 0;
  for (let x = startCol; x <= endCol; x++) {
    const startRow = row - lineOffset;
    const endRow = row + lineOffset;
    for (let y = startRow; y <= endRow; y++) {
      if (isPositionGood(y, x, height, width)) {
          const cell = document.querySelector(`#cell${toIndex(y, x, width)}`)
          cell.style.backgroundColor = color;
      }
    }
    if (x === col) {
      increment *= -1;
    }
    lineOffset += increment;
  }
}