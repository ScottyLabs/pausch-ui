export const toCoordinates = (index, width) => {
  let row = Math.floor(index / width)
  let col = index % width
  return [row, col]
}

export const toIndex = (row, col, width) => {
  let index = row * width + col
  return index
}

export const clearCanvas = (DEFAULT_COLOR) => {
  const cells = document.querySelectorAll(".canvasCell")
  if (cells) {
    cells.forEach((cell) => {
      cell.style.backgroundColor = DEFAULT_COLOR
    })
  }
}