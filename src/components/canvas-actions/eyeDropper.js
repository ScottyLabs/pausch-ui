import Jimp from "jimp"
import * as actions from "../../actions"

export const selectCellColor = (cell, dispatch) => {
  const backgroundColor = cell.style.backgroundColor
  const normalizedColor =
    backgroundColor == "" ? "rgba(0, 0, 0, 0)" : backgroundColor
  const hex = Jimp.cssColorToHex(normalizedColor)
  const rgba = Jimp.intToRGBA(hex)
  dispatch(actions.brush.setColor(rgba))
}
