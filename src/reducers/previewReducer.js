// Handler for preview-related actions e.g. playback
const previewReducer = (state, action) => {
  if (action.type === "SET_PLAYMODE") {
    return {
      ...state,
      playMode: action.playMode
    }
  } else if (action.type === "SET_PLAYRATE") {
    return {
      ...state,
      playRate: action.playRate
    }
  } else if (action.type === "SET_PREVIEW_VALID") {
    return {
      ...state,
      previewValid: action.valid
    }
  } else if (action.type === "SET_PREVIEW_ROW") {
    return {
      ...state,
      previewRow: action.previewRow
    }
  } else if (action.type === "RESET_PREVIEW") {
    return {
      ...state,
      previewRow: 0,
      playMode: "pause"
    }
  }
}

export default previewReducer;