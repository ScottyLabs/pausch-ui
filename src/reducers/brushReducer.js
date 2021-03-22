// Handler for brush-related actions
const brushReducer = (state, action) => {
  if (action.type === "SET_DRAWMODE") {
    return {
      ...state,
      drawMode: action.drawMode
    }
  } else if (action.type === "SET_COLOR") {
    return {
      ...state,
      color: action.color
    }
  } else if (action.type === "SET_ISMOUSEDOWN") {
    return {
      ...state,
      isMouseDown: action.isMouseDown
    }
  } else if (action.type === "SET_START_SQUARE") {
    return {
      ...state,
      startSquare: action.startSquare
    }
  } else if (action.type === "SET_END_SQUARE") {
    return {
      ...state,
      endSquare: action.endSquare
    }
  } else if (action.type === "SET_BUFFER") {
    return {
      ...state,
      buffer: action.buffer
    }
  }
}

export default brushReducer;