import brushReducer from "./brushReducer";
import previewReducer from "./previewReducer";
import canvasReducer from "./canvasReducer";

// Base redux store state
const initState = {
  // Canvas-related
  width: 52,
  height: 30,
  // Execution/preview-related
  playRate: 0.5,
  playMode: "play",
  previewValid: true,
  previewRow: 0,
  lastRenderTime: 0,
  // Brush-related 
  isMouseDown: false,
  drawMode: "paintbrush",
  color: { r: 255, g: 0, b: 0, a: 100 },
  startSquare: null
};

// Main reducer
const rootReducer = (state = initState, action) => {
  const reducerMap = {
    "brush": brushReducer,
    "preview": previewReducer,
    "canvas": canvasReducer
  }
  // Call the appropriate reducer based on the specified action category
  const reducer = reducerMap[action.category];
  if (reducer != null) {
    state = reducer(state, action);
    if (state == null) {
      state = initState;
    }
  }
  return state;
}

export default rootReducer;