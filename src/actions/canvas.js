export const setDimensions = (width, height) => {
  return {
    type: "SET_DIMENSIONS",
    category: "canvas",
    width,
    height,
  }
}
