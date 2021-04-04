import { toIndex } from "./utility"

const plot = (x, y, width, color) => {
  const cell = document.querySelector(`#cell${toIndex(y, x, width)}`)
  cell.style.backgroundColor = color;
}


/** 
 * Compute Bresenham's Line algorithm for small gradients
 * @see https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
 */
const plotLineLow = (x0, y0, x1, y1, width, color) => {
  const dx = x1 - x0;
  let dy = y1 - y0;

  let signX = Math.sign(dx);
  let signY = Math.sign(dy);

  dy *= signY;
  let D = (2 * dy) - dx;
  let y = y0;

  for (let x = x0; x * signX <= x1 * signX; x += signX) {
    plot(x, y, width, color);
    if (D > 0) {
      y += signY;
      D += 2 * (dy - dx);
    } else {
      D += 2 * dy;
    }
  }
}

/** 
 * Compute Bresenham's Line algorithm for steep gradients
 * @see https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
 */
const plotLineHigh = (x0, y0, x1, y1, width, color) => {
  let dx = x1 - x0;
  const dy = y1 - y0;
  const signX = Math.sign(dx);
  const signY = Math.sign(dy);

  dx *= signX;
  let D = (2 * dx) - dy;
  let x = x0;
  for (let y = y0; y * signY <= y1 * signY; y += signY) {
    plot(x, y, width, color);
    if (D > 0) {
      x += signX;
      D += 2 * (dx - dy);
    } else {
      D += 2 * dx;
    }
  }
}

/**
 * General purpose plot line plot algorithm
 */
const plotLine = (x0, y0, x1, y1, width, color) => {
  if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
    if (x0 > x1) {
      plotLineLow(x1, y1, x0, y0, width, color);
    } else {
      plotLineLow(x0, y0, x1, y1, width, color);
    }
  } else {
    if (y0 > y1) {
      plotLineHigh(x1, y1, x0, y0, width, color);
    } else {
      plotLineHigh(x0, y0, x1, y1, width, color);
    }
  }
}

export const drawLine = (width, startSquare, endSquare, color) => {
  let [startRow, startCol] = startSquare
  let [endRow, endCol] = endSquare

  plotLine(startCol, startRow, endCol, endRow, width, color);
}