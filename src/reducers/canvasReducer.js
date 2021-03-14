// Handler for canvas-related actions
const brushReducer = (state, action) => {
  if (action.type === "SET_DIMENSIONS") {
    return {
      ...state,
      height: action.height,
      width: action.width
    }
  }
}

export default brushReducer;