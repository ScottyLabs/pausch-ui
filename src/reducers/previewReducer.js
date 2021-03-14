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
      playMode: "play"
    }
  } else if (action.type === "INCREMENT_PREVIEW_ROW") {
    if (state.playMode === "pause") {
      // Fixes race condition: row updates while paused
      return state;
    }
    const { lastRenderTime } = state;
    const now = Date.now();
    const delay = state.playRate * 1000;

    if (now - lastRenderTime >= delay) {
      // Fixes race condition: double increments
      return {
        ...state,
        previewRow: (state.previewRow + 1) % state.height,
        lastRenderTime: now
      }
    } else {
      return state;
    }
  }
}

export default previewReducer;