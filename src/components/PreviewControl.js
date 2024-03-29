import {
  Button,
  Grid,
  Icon,
  Input,
  Popup,
  Segment,
  Label,
} from "semantic-ui-react"
import React, { useState } from "react"
import * as actions from "../actions"
import { useSelector, useDispatch } from "react-redux"

const handlePlayMode = (
  playMode,
  playRate,
  renderTask,
  setRenderTask,
  dispatch
) => {
  if (playMode === "reset") {
    if (renderTask != null) {
      clearTimeout(renderTask)
      setRenderTask(null)
    }
    dispatch(actions.preview.resetPreview())
  } else if (playMode === "play") {
    const delay = playRate * 1000
    if (renderTask == null) {
      const timer = setInterval(() => {
        dispatch(actions.preview.incrementPreviewRow())
      }, delay);
      setRenderTask(timer)
    }
  } else if (playMode === "pause") {
    if (renderTask != null) {
      clearTimeout(renderTask)
      setRenderTask(null);
    }
  }
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
  const [renderTask, setRenderTask] = useState(null)

  handlePlayMode(playMode, playRate, renderTask, setRenderTask, dispatch)

  return (
    <Segment>
      <Grid relaxed columns={2} style={{ paddingLeft: "1em" }}>
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
        <Grid.Row>
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
        <Grid.Row>
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
                    dispatch(actions.canvas.setDimensions(width, parseInt(inputHeight)))
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
