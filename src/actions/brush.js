export const setDrawMode = (drawMode) => {
  return {
    type: "SET_DRAWMODE",
    category: "brush",
    drawMode
  }
}

export const setColor = (color) => {
  return {
    type: "SET_COLOR",
    category: "brush",
    color
  }
}

export const setIsMouseDown = (isMouseDown) => {
  return {
    type: "SET_ISMOUSEDOWN",
    category: "brush",
    isMouseDown
  }
}

export const setStartSquare = (startSquare) => {
  return {
    type: "SET_START_SQUARE",
    category: "brush",
    startSquare
  }
}