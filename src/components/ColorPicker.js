import React, { useState } from "react"
import { SketchPicker } from "react-color"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import reactCSS from "reactcss"
import * as actions from "../actions"

const ColorPicker = (props) => {
  const dispatch = useDispatch()
  const color = useSelector((store) => store.color, shallowEqual)
  const [showColorSelect, setShowColorSelect] = useState(false)
  const [stateColor, setStateColor] = useState()

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  })

  return (
    <div>
      <div
        style={styles.swatch}
        onClick={() => setShowColorSelect(!showColorSelect)}
      >
        <div style={styles.color} />
      </div>
      {showColorSelect ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={() => setShowColorSelect(false)} />
          <SketchPicker
            color={stateColor}
            onChange={(newColor) => {
              setStateColor(newColor)
            }}
            onChangeComplete={(newColor) => {
              dispatch(actions.brush.setColor(newColor.rgb))
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default ColorPicker