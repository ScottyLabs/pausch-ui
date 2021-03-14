export const toCoordinates = (index, width) => {
  let row = Math.floor(index / width)
  let col = index % width
  return [row, col]
}