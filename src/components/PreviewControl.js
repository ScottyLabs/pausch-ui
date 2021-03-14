import { Button, Grid, Icon, Input, Popup, Segment } from "semantic-ui-react"
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

// Controls for preview dynamics
const PreviewControl = (props) => {
  const dispatch = useDispatch()
  const playMode = useSelector((store) => store.playMode)
  const playRate = useSelector((store) => store.playRate)
  // Keep this to subscribe to changes to previewRow for re-rendering
  const previewRow = useSelector((store) => store.previewRow)
  const [inputRate, setInputRate] = useState(playRate)
  const [renderTask, setRenderTask] = useState({
    time: 0,
    timer: null,
  })

  handlePlayMode(playMode, playRate, renderTask, setRenderTask, dispatch)

  return (
    <Segment>
      <Grid>
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
        <Grid.Row centered>
          <Popup
            content="Play rate in seconds per frame"
            delay={250}
            on="hover"
            trigger={
              <Input
                placeholder="Rate"
                style={{
                  width: "5em",
                }}
                value={inputRate}
                onChange={(event) => setInputRate(event.target.value)}
              />
            }
          />
          <Popup
            content="Save play rate"
            delay={250}
            on="hover"
            trigger={
              <Button
                icon
                style={{ marginLeft: "1em" }}
                onClick={() => {
                  dispatch(actions.preview.setPlayRate(inputRate))
                  dispatch(actions.preview.setPlayMode("reset"))
                }}
              >
                <Icon name="angle double right" />
              </Button>
            }
          />
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default PreviewControl
