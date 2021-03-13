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
  }
}

export default brushReducer;