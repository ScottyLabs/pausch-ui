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

export const setCurrentSquare = (currentSquare) => {
  return {
    type: "SET_CURRENT_SQUARE",
    category: "brush",
    currentSquare
  }
}

export const setEndSquare = (endSquare) => {
  return {
    type: "SET_END_SQUARE",
    category: "brush",
    endSquare
  }
}

export const setBuffer = (buffer) => {
  return {
    type: "SET_BUFFER",
    category: "brush",
    buffer
  }
}

export const setDashedLineGap = (gap) => {
  return {
    type: "SET_DASHED_LINE_GAP",
    category: "brush",
    gap
  }
}

export const setDashedLineSolid = (solid) => {
  return {
    type: "SET_DASHED_LINE_SOLID",
    category: "brush",
    solid
  }
}

export const setDiamondRadius = (radius) => {
  return {
    type: "SET_DIAMOND_RADIUS",
    category: "brush",
    radius
  }
}