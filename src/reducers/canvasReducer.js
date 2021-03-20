// Handler for canvas-related actions
const brushReducer = (state, action) => {
  if (action.type === "SET_DIMENSIONS") {
    return {
      ...state,
      height: action.height,
      width: action.width
    }
  } else if (action.type === "SET_DARK_MODE") {
    return {
      ...state,
      isDarkMode: action.isDarkMode
    }
  }
}

export default brushReducer;