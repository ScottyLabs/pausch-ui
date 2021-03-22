export const setDimensions = (width, height) => {
  return {
    type: "SET_DIMENSIONS",
    category: "canvas",
    width,
    height,
  }
}

export const setDarkMode = (isDarkMode) => {
  return {
    type: "SET_DARK_MODE",
    category: "canvas",
    isDarkMode
  }
}