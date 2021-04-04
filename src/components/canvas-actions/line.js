import { toIndex } from "./utility"

const SOLID = "solid";
const DASHED = "dashed";

const DASH_LENGTH = 2;

const plot = (x, y, width, color) => {
  const cell = document.querySelector(`#cell${toIndex(y, x, width)}`)
  cell.style.backgroundColor = color;
}

/** 
 * Compute Bresenham's Line algorithm for small gradients
 * @see https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
 */
const plotLineLow = (x0, y0, x1, y1, width, color, mode) => {
  const dx = x1 - x0;
  let dy = y1 - y0;

  let signX = Math.sign(dx);
  let signY = Math.sign(dy);

  dy *= signY;
  let D = (2 * dy) - dx;
  let y = y0;

  let dashIdx = 0;
  let solid = true;

  for (let x = x0; x * signX <= x1 * signX; x += signX) {
    if (mode == DASHED) {
      if (solid) {
        plot(x, y, width, color);
      }
      if (++dashIdx == DASH_LENGTH) {
        dashIdx = 0;
        solid = !solid;
      }
    } else {
      plot(x, y, width, color);
    }
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
const plotLineHigh = (x0, y0, x1, y1, width, color, mode) => {
  let dx = x1 - x0;
  const dy = y1 - y0;
  const signX = Math.sign(dx);
  const signY = Math.sign(dy);

  dx *= signX;
  let D = (2 * dx) - dy;
  let x = x0;

  let dashIdx = 0;
  let solid = true;
  for (let y = y0; y * signY <= y1 * signY; y += signY) {
    if (mode == DASHED) {
      if (solid) {
        plot(x, y, width, color);
      }
      if (++dashIdx == DASH_LENGTH) {
        dashIdx = 0;
        solid = !solid;
      }
    } else {
      plot(x, y, width, color);
    }
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
const plotLine = (x0, y0, x1, y1, width, color, mode) => {
  if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
    if (x0 > x1) {
      plotLineLow(x1, y1, x0, y0, width, color, mode);
    } else {
      plotLineLow(x0, y0, x1, y1, width, color, mode);
    }
  } else {
    if (y0 > y1) {
      plotLineHigh(x1, y1, x0, y0, width, color, mode);
    } else {
      plotLineHigh(x0, y0, x1, y1, width, color, mode);
    }
  }
}

export const drawLine = (width, startSquare, endSquare, color) => {
  let [startRow, startCol] = startSquare
  let [endRow, endCol] = endSquare

  plotLine(startCol, startRow, endCol, endRow, width, color, SOLID);
}

export const drawDashedLine = (width, startSquare, endSquare, color) => {
  let [startRow, startCol] = startSquare
  let [endRow, endCol] = endSquare

  plotLine(startCol, startRow, endCol, endRow, width, color, DASHED);
}