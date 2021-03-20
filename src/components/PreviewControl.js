import {
  Button,
  Grid,
  Icon,
  Input,
  Popup,
  Segment,
  Label,
} from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import * as actions from "../actions"
import { useSelector, useDispatch, connect } from "react-redux"

const handlePlayMode = (
  playMode,
  playRate,
  renderTask,
  setRenderTask,
  dispatch
) => {
  if (playMode === "reset") {
    dispatch(actions.preview.resetPreview())
    if (renderTask.timer != null) {
      clearTimeout(renderTask.timer)
      setRenderTask({ time: 0 })
    }
  } else if (playMode === "play") {
    const now = Date.now()
    const delay = playRate * 1000
    if (now - renderTask.time >= delay) {
      // Check time to prevent race conditions
      const timer = setTimeout(() => {
        dispatch(actions.preview.incrementPreviewRow())
      }, delay)
      setRenderTask({ timer, time: now })
    }
  }
}

const rowStyle = {
  display: "flex",
  paddingLeft: "1em"
}

// Controls for preview dynamics
const PreviewControl = (props) => {
  const dispatch = useDispatch()
  const playMode = useSelector((store) => store.playMode)
  const playRate = useSelector((store) => store.playRate)
  const height = useSelector((store) => store.height)
  const width = useSelector((store) => store.width)
  // Subscribe this component to changes to previewRow for re-rendering
  useSelector((store) => store.previewRow)
  const [inputRate, setInputRate] = useState(playRate)
  const [inputHeight, setInputHeight] = useState(height)
  const [renderTask, setRenderTask] = useState({
    time: 0,
    timer: null,
  })

  handlePlayMode(playMode, playRate, renderTask, setRenderTask, dispatch)

  return (
    <Segment>
      <Grid relaxed columns={2}>
        <Grid.Row centered>
          <Popup
            content="Pause"
            delay={250}
            on="hover"
            trigger={
              <Button
                icon
                color={playMode === "pause" ? "green" : null}
                onClick={() => dispatch(actions.preview.setPlayMode("pause"))}
              >
                <Icon name="pause" />
              </Button>
            }
          />
          <Popup
            content="Play"
            delay={250}
            on="hover"
            trigger={
              <Button
                icon
                color={playMode === "play" ? "green" : null}
                onClick={() => dispatch(actions.preview.setPlayMode("play"))}
              >
                <Icon name="play" />
              </Button>
            }
          />
          <Popup
            content="Reset"
            delay={250}
            on="hover"
            trigger={
              <Button
                icon
                onClick={() => dispatch(actions.preview.setPlayMode("reset"))}
              >
                <Icon name="redo" />
              </Button>
            }
          />
        </Grid.Row>
        <Grid.Row style={rowStyle}>
          <Popup
            content="Play rate in seconds per frame"
            delay={250}
            on="hover"
            trigger={
              <Input
                placeholder="Rate"
                label={<Label content="Play rate" />}
                style={{
                  width: "5em",
                }}
                value={inputRate}
                onChange={(event) => setInputRate(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(actions.preview.setPlayRate(inputRate))
                  }
                }}
              />
            }
          />
        </Grid.Row>
        <Grid.Row style={rowStyle}>
          <Popup
            content="Number of frames (height of canvas)"
            delay={250}
            on="hover"
            trigger={
              <Input
                placeholder="Number of frames"
                label={<Label content="Canvas height" />}
                style={{
                  width: "5em",
                }}
                value={inputHeight}
                onChange={(event) => setInputHeight(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(actions.canvas.setDimensions(width, inputHeight))
                    dispatch(actions.preview.resetPreview())
                  }
                }}
              />
            }
          />
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default PreviewControl
