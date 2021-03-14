import { toCoordinates } from "./utility"

// Utility color flood fill
const floodFill = (
  cells,
  startRow,
  startCol,
  width,
  height,
  srcColor,
  dstColor,
) => {
  const dy = [0, 1, 0, -1]
  const dx = [1, 0, -1, 0]
  const visited = []
  for (let i = 0; i < height; i++) {
    const row = new Array(width).fill(false);
    visited.push(row)
  }

  const queue = []
  queue.push([startRow, startCol])
  while (queue.length > 0) {
    const [row, col] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const newRow = row + dy[i]
      const newCol = col + dx[i]
      // Check if new coordinates are valid
      if (0 <= newRow && newRow < height && 0 <= newCol && newCol < width) {
        // Check if previously visited
        if (!visited[newRow][newCol]) {
          visited[newRow][newCol] = true;
          const cell = cells[newRow * width + newCol]
          // Check if matching starting color
          if (cell.style.backgroundColor == srcColor) {
            // Apply fill with new color
            cell.style.backgroundColor = dstColor
            // Recurse
            queue.push([newRow, newCol])
          }
        }
      }
    }
  }
}

// Perform the bucket fill brush
const bucketFill = (cell, index, width, height, dstColor) => {
  console.log("Bucket fill")

  const cells = document.querySelectorAll(".canvasCell")
  const srcColor = cell.style.backgroundColor
  const [startRow, startCol] = toCoordinates(index, width)
  floodFill(
    cells,
    startRow,
    startCol,
    width,
    height,
    srcColor,
    dstColor
  )
}

export default bucketFill
