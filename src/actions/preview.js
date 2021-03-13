export const setPlayMode = (playMode) => {
  return {
    type: "SET_PLAYMODE",
    category: "preview",
    playMode
  };
}

export const setPlayRate = (playRate) => {
  return {
    type: "SET_PLAYRATE",
    category: "preview",
    playRate
  }
}

export const setPreviewValid = (valid) => {
  return {
    type: "SET_PREVIEW_VALID",
    category: "preview",
    valid
  }
}

export const setPreviewRow = (previewRow) => {
  return {
    type: "SET_PREVIEW_ROW",
    category: "preview",
    previewRow
  }
}


export const resetPreview = () => {
  return {
    type: "RESET_PREVIEW",
    category: "preview",
  }
}