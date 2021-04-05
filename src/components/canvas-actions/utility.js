export const toCoordinates = (index, width) => {
  let row = Math.floor(index / width)
  let col = index % width
  return [row, col]
}

export const toIndex = (row, col, width) => {
  let index = row * width + col
  return index
}

export const isPositionGood = (row, col, height, width) => {
  return 0 <= row && row < height && 0 <= col && col < width;
}

export const clearCanvas = (backgroundColor, borderColor) => {
  const cells = document.querySelectorAll(".canvasCell")
  if (cells) {
    cells.forEach((cell) => {
      cell.style.backgroundColor = backgroundColor
      cell.style.borderColor = borderColor
    })
  }
}