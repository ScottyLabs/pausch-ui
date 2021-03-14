export const toCoordinates = (index, width) => {
  let row = Math.floor(index / width)
  let col = index % width
  return [row, col]
}

export const toIndex = (row, col, width) => {
  let index = row * width + col
  return index
}